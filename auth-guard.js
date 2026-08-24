/* =========================================================
   POLARIS CONSULTANTS
   AUTHENTICATION GUARD
   STEP 13
========================================================= */


/* =========================================================
   PAGE CONFIGURATION
========================================================= */

const POLARIS_PAGE_PERMISSIONS = {

    "admin.html":
        null,

    "leads.html":
        "leads",

    "customers.html":
        "customers",

    "applications.html":
        "applications",

    "documents.html":
        "documents",

    "finance.html":
        "finance",

    "receipts.html":
        "receipts",

    "reports.html":
        "reports",

    "team.html":
        "team",

    "settings.html":
        "settings"

};


/* =========================================================
   ROLE PERMISSIONS
========================================================= */

const POLARIS_ROLE_PERMISSIONS = {

    "SUPER ADMIN": [

        "dashboard",

        "leads",

        "customers",

        "applications",

        "documents",

        "finance",

        "receipts",

        "reports",

        "team",

        "settings"

    ],


    "MANAGER": [

        "dashboard",

        "leads",

        "customers",

        "applications",

        "documents",

        "finance",

        "receipts",

        "reports",

        "team"

    ],


    "COUNSELLOR": [

        "dashboard",

        "leads",

        "customers",

        "applications",

        "documents"

    ],


    "PROCESSING OFFICER": [

        "dashboard",

        "customers",

        "applications",

        "documents"

    ],


    "FINANCE": [

        "dashboard",

        "customers",

        "finance",

        "receipts",

        "reports"

    ],


    "RECEPTION": [

        "dashboard",

        "leads",

        "customers"

    ]

};


/* =========================================================
   GET CURRENT PAGE
========================================================= */

function getCurrentPageName() {

    let path =
        window.location.pathname;


    let page =
        path.substring(
            path.lastIndexOf("/") + 1
        );


    if (!page) {

        page =
            "index.html";

    }


    return page;

}


/* =========================================================
   GET REQUIRED PERMISSION
========================================================= */

function getRequiredPermission() {

    const page =
        getCurrentPageName();


    return (
        POLARIS_PAGE_PERMISSIONS[
            page
        ] || null
    );

}


/* =========================================================
   CHECK ROLE PERMISSION
========================================================= */

function roleHasPermission(
    role,
    permission
) {

    if (!role || !permission) {

        return false;

    }


    const permissions =
        POLARIS_ROLE_PERMISSIONS[
            role
        ];


    if (!permissions) {

        return false;

    }


    return permissions.includes(
        permission
    );

}


/* =========================================================
   PROTECT PAGE
========================================================= */

async function protectPolarisPage(
    requiredPermission = null
) {

    /*
       Make sure Supabase is initialized.
    */

    if (
        typeof initializeSupabase ===
        "function"
    ) {

        initializeSupabase();

    }


    /*
       Wait briefly for Supabase library
       if required.
    */

    let attempts = 0;


    while (
        typeof polarisSupabase ===
            "undefined" ||
        !polarisSupabase
    ) {

        if (attempts >= 30) {

            showAccessError(
                "Unable to initialize secure authentication."
            );

            return false;

        }


        await sleep(100);


        attempts++;

    }


    /*
       Check actual Supabase session.
    */

    const session =
        await getAuthenticatedSession();


    if (!session) {

        redirectToLogin();

        return false;

    }


    /*
       Get current authenticated user.
    */

    const user =
        await getAuthenticatedUser();


    if (!user) {

        redirectToLogin();

        return false;

    }


    /*
       Get staff profile.
    */

    const profile =
        await getStaffProfile(
            user.id
        );


    if (!profile) {

        showAccessError(
            "Your account does not have a Polaris staff profile."
        );

        await logoutFromSupabase();

        return false;

    }


    /*
       Check active status.
    */

    if (!profile.is_active) {

        showAccessError(
            "Your Polaris staff account is inactive."
        );

        await logoutFromSupabase();

        return false;

    }


    /*
       Save UI session.
    */

    if (
        typeof savePolarisSession ===
        "function"
    ) {

        savePolarisSession(
            user,
            profile
        );

    }


    /*
       Determine permission.
    */

    const permission =
        requiredPermission ||
        getRequiredPermission();


    /*
       Dashboard is accessible to
       every authenticated active staff member.
    */

    if (
        permission &&
        !roleHasPermission(
            profile.role,
            permission
        )
    ) {

        showAccessError(
            "Access denied. Your role does not have permission to open this module."
        );


        setTimeout(
            function () {

                window.location.href =
                    "admin.html";

            },
            1500
        );


        return false;

    }


    /*
       Update UI with staff information.
    */

    updateAuthenticatedUI(
        profile
    );


    return true;

}


/* =========================================================
   UPDATE UI
========================================================= */

function updateAuthenticatedUI(
    profile
) {

    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                profile.full_name;

        }
    );


    const roleElements =
        document.querySelectorAll(
            "[data-user-role]"
        );


    roleElements.forEach(
        element => {

            element.textContent =
                profile.role;

        }
    );


    const teamElements =
        document.querySelectorAll(
            "[data-user-team]"
        );


    teamElements.forEach(
        element => {

            element.textContent =
                profile.team_name ||
                "No Team";

        }
    );


    /*
       Hide menu items the user cannot access.
    */

    document
        .querySelectorAll(
            "[data-permission]"
        )
        .forEach(
            element => {

                const permission =
                    element.getAttribute(
                        "data-permission"
                    );


                if (
                    !roleHasPermission(
                        profile.role,
                        permission
                    )
                ) {

                    element.style.display =
                        "none";

                }

            }
        );

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function setupLogoutButtons() {

    document
        .querySelectorAll(
            "[data-logout]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async function () {

                        await logoutFromSupabase();

                    }
                );

            }
        );

}


/* =========================================================
   REDIRECT LOGIN
========================================================= */

function redirectToLogin() {

    if (
        !window.location.pathname
            .endsWith(
                "login.html"
            )
    ) {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   ACCESS ERROR
========================================================= */

function showAccessError(
    message
) {

    let box =
        document.getElementById(
            "authError"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "authError";

        box.style.position =
            "fixed";

        box.style.top =
            "20px";

        box.style.left =
            "50%";

        box.style.transform =
            "translateX(-50%)";

        box.style.zIndex =
            "99999";

        box.style.maxWidth =
            "90%";

        box.style.padding =
            "14px 18px";

        box.style.borderRadius =
            "8px";

        box.style.background =
            "#fff1ef";

        box.style.color =
            "#a93226";

        box.style.border =
            "1px solid #f1c7c1";

        box.style.fontFamily =
            "Arial, sans-serif";

        box.style.fontSize =
            "13px";

        box.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.12)";


        document.body.appendChild(
            box
        );

    }


    box.textContent =
        message;

}


/* =========================================================
   SLEEP
========================================================= */

function sleep(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


/* =========================================================
   AUTOMATIC PROTECTION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        /*
           Do not protect login page.
        */

        const page =
            getCurrentPageName();


        if (
            page ===
            "login.html"
        ) {

            return;

        }


        /*
           Do not automatically protect
           public homepage.
        */

        if (
            page ===
                "index.html" ||
            page === ""
        ) {

            return;

        }


        /*
           Protect all known admin pages.
        */

        if (
            POLARIS_PAGE_PERMISSIONS[
                page
            ] !== undefined
        ) {

            await protectPolarisPage();

        }


        setupLogoutButtons();

    }
);
