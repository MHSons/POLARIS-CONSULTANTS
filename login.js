/* =========================================================
   POLARIS CONSULTANTS
   LOGIN & ROLE MANAGEMENT
   FRONTEND DEMO VERSION
========================================================= */


/* =========================================================
   ROLE CONFIGURATION
========================================================= */

const ROLE_PERMISSIONS = {

    "SUPER ADMIN": {

        dashboard: true,

        leads: true,

        customers: true,

        applications: true,

        documents: true,

        finance: true,

        receipts: true,

        reports: true,

        team: true,

        settings: true

    },


    "MANAGER": {

        dashboard: true,

        leads: true,

        customers: true,

        applications: true,

        documents: true,

        finance: true,

        receipts: true,

        reports: true,

        team: true,

        settings: false

    },


    "COUNSELLOR": {

        dashboard: true,

        leads: true,

        customers: true,

        applications: true,

        documents: true,

        finance: false,

        receipts: false,

        reports: false,

        team: false,

        settings: false

    },


    "PROCESSING OFFICER": {

        dashboard: true,

        leads: false,

        customers: true,

        applications: true,

        documents: true,

        finance: false,

        receipts: false,

        reports: false,

        team: false,

        settings: false

    },


    "FINANCE": {

        dashboard: true,

        leads: false,

        customers: true,

        applications: false,

        documents: false,

        finance: true,

        receipts: true,

        reports: true,

        team: false,

        settings: false

    },


    "RECEPTION": {

        dashboard: true,

        leads: true,

        customers: true,

        applications: false,

        documents: false,

        finance: false,

        receipts: false,

        reports: false,

        team: false,

        settings: false

    }

};


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const year =
            new Date().getFullYear();


        const yearElement =
            document.getElementById(
                "brandYear"
            );


        if (yearElement) {

            yearElement.textContent =
                year;

        }


        restoreDemoSession();

    }
);


/* =========================================================
   NORMAL LOGIN
========================================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const password =
        document.getElementById(
            "password"
        ).value;


    const remember =
        document.getElementById(
            "remember"
        ).checked;


    const message =
        document.getElementById(
            "loginMessage"
        );


    const button =
        document.getElementById(
            "loginButton"
        );


    clearMessage();


    if (!email) {

        showMessage(
            "Please enter your email address.",
            "error"
        );

        return;

    }


    if (!isValidEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!password) {

        showMessage(
            "Please enter your password.",
            "error"
        );

        return;

    }


    if (password.length < 6) {

        showMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;

    }


    /*
       IMPORTANT:

       This is intentionally NOT validating
       a real password here.

       Real authentication will use:

       Supabase Auth
       +
       secure session
       +
       role table
       +
       Row Level Security
    */


    button.classList.add("loading");

    button.textContent =
        "Signing In...";


    setTimeout(function () {

        button.classList.remove(
            "loading"
        );

        button.textContent =
            "Sign In";


        showMessage(
            "Frontend demo login completed. Use a role button below to preview role access.",
            "success"
        );


    }, 900);

}


/* =========================================================
   DEMO LOGIN
========================================================= */

function demoLogin(role) {

    if (!ROLE_PERMISSIONS[role]) {

        showMessage(
            "Invalid role selected.",
            "error"
        );

        return;

    }


    const session = {

        userId:
            "DEMO-" +
            Date.now(),

        name:
            getDemoName(role),

        email:
            getDemoEmail(role),

        role:
            role,

        permissions:
            ROLE_PERMISSIONS[role],

        demo:
            true,

        loginTime:
            new Date().toISOString()

    };


    sessionStorage.setItem(
        "polarisSession",
        JSON.stringify(session)
    );


    /*
       Remember session only if requested.

       This is frontend demo storage.

       Real authentication will use
       Supabase Auth session handling.
    */


    const remember =
        document.getElementById(
            "remember"
        );


    if (
        remember &&
        remember.checked
    ) {

        localStorage.setItem(
            "polarisRememberedRole",
            role
        );

    }


    showMessage(
        "Demo login successful. Opening dashboard as " +
        role +
        "...",
        "success"
    );


    setTimeout(function () {

        window.location.href =
            "admin.html";

    }, 700);

}


/* =========================================================
   DEMO USER NAMES
========================================================= */

function getDemoName(role) {

    const names = {

        "SUPER ADMIN":
            "Polaris Administrator",

        "MANAGER":
            "Polaris Manager",

        "COUNSELLOR":
            "Visa Counsellor",

        "PROCESSING OFFICER":
            "Processing Officer",

        "FINANCE":
            "Finance Officer",

        "RECEPTION":
            "Reception Officer"

    };


    return (
        names[role] ||
        "Polaris Staff"
    );

}


/* =========================================================
   DEMO EMAIL
========================================================= */

function getDemoEmail(role) {

    const emailRole =
        role
            .toLowerCase()
            .replace(/\s+/g, ".");


    return (
        emailRole +
        "@polarisconsultants.com"
    );

}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function togglePassword() {

    const password =
        document.getElementById(
            "password"
        );


    const button =
        document.querySelector(
            ".password-toggle"
        );


    if (
        password.type ===
        "password"
    ) {

        password.type =
            "text";

        button.textContent =
            "Hide";

    } else {

        password.type =
            "password";

        button.textContent =
            "Show";

    }

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function forgotPassword() {

    const email =
        document.getElementById(
            "email"
        ).value.trim();


    if (!email) {

        showMessage(
            "Enter your email address first. Password recovery will be connected to Supabase Auth.",
            "error"
        );

        return;

    }


    if (!isValidEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    showMessage(
        "Password recovery will be connected to Supabase Auth. No password is stored in this frontend application.",
        "success"
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    text,
    type
) {

    const message =
        document.getElementById(
            "loginMessage"
        );


    message.textContent =
        text;


    message.className =
        "login-message " +
        type;

}


function clearMessage() {

    const message =
        document.getElementById(
            "loginMessage"
        );


    message.textContent =
        "";


    message.className =
        "login-message";

}


/* =========================================================
   RESTORE DEMO SESSION
========================================================= */

function restoreDemoSession() {

    const session =
        sessionStorage.getItem(
            "polarisSession"
        );


    if (!session) {
        return;
    }


    try {

        const parsed =
            JSON.parse(session);


        if (
            parsed &&
            parsed.demo &&
            parsed.role
        ) {

            console.log(
                "Existing Polaris demo session:",
                parsed.role
            );

        }

    } catch (error) {

        sessionStorage.removeItem(
            "polarisSession"
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    sessionStorage.removeItem(
        "polarisSession"
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   GET CURRENT SESSION
========================================================= */

function getCurrentSession() {

    const session =
        sessionStorage.getItem(
            "polarisSession"
        );


    if (!session) {
        return null;
    }


    try {

        return JSON.parse(
            session
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   CHECK PERMISSION
========================================================= */

function hasPermission(
    permission
) {

    const session =
        getCurrentSession();


    if (!session) {
        return false;
    }


    if (!session.permissions) {
        return false;
    }


    return Boolean(
        session.permissions[permission]
    );

}


/* =========================================================
   PROTECT PAGE
========================================================= */

function protectPage(
    permission
) {

    const session =
        getCurrentSession();


    if (!session) {

        window.location.href =
            "login.html";

        return false;

    }


    if (
        permission &&
        !hasPermission(permission)
    ) {

        alert(
            "Access denied. Your account does not have permission to access this module."
        );


        window.location.href =
            "admin.html";

        return false;

    }


    return true;

}


/* =========================================================
   CURRENT ROLE
========================================================= */

function getCurrentRole() {

    const session =
        getCurrentSession();


    return session
        ? session.role
        : null;

}
