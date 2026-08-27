/* =========================================================
   POLARIS CONSULTANTS - AUTHENTICATION GUARD
========================================================= */

/* =========================================================
   PAGE CONFIGURATION
========================================================= */
const POLARIS_PAGE_PERMISSIONS = {
    "admin.html": null,
    "leads.html": "leads",
    "customers.html": "customers",
    "applications.html": "applications",
    "documents.html": "documents",
    "finance.html": "finance",
    "receipts.html": "receipts",
    "reports.html": "reports",
    "team.html": "team",
    "settings.html": "settings"
};

/* =========================================================
   ROLE PERMISSIONS
========================================================= */
const POLARIS_ROLE_PERMISSIONS = {
    "SUPER ADMIN": [
        "dashboard", "leads", "customers", "applications",
        "documents", "finance", "receipts", "reports", "team", "settings"
    ],
    "MANAGER": [
        "dashboard", "leads", "customers", "applications",
        "documents", "finance", "receipts", "reports", "team"
    ],
    "COUNSELLOR": [
        "dashboard", "leads", "customers", "applications", "documents"
    ],
    "PROCESSING OFFICER": [
        "dashboard", "customers", "applications", "documents"
    ],
    "FINANCE": [
        "dashboard", "customers", "finance", "receipts", "reports"
    ],
    "RECEPTION": [
        "dashboard", "leads", "customers"
    ]
};

/* =========================================================
   GET CURRENT PAGE & PERMISSIONS
========================================================= */
function getCurrentPageName() {
    let path = window.location.pathname;
    let page = path.substring(path.lastIndexOf("/") + 1);
    return page || "index.html";
}

function getRequiredPermission() {
    const page = getCurrentPageName();
    return POLARIS_PAGE_PERMISSIONS[page] || null;
}

function roleHasPermission(role, permission) {
    if (!role || !permission) return false;
    const permissions = POLARIS_ROLE_PERMISSIONS[role];
    if (!permissions) return false;
    return permissions.includes(permission);
}

/* =========================================================
   SUPABASE AUTH HELPER FALLBACKS
========================================================= */
async function getAuthenticatedSession() {
    if (typeof polarisSupabase !== "undefined" && polarisSupabase.auth) {
        const { data: { session } } = await polarisSupabase.auth.getSession();
        return session;
    }
    return null;
}

async function getAuthenticatedUser() {
    if (typeof polarisSupabase !== "undefined" && polarisSupabase.auth) {
        const { data: { user } } = await polarisSupabase.auth.getUser();
        return user;
    }
    return null;
}

async function getStaffProfile(userId) {
    if (typeof polarisSupabase !== "undefined") {
        const { data, error } = await polarisSupabase
            .from("staff_profiles")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Staff Profile Error:", error);
            return null;
        }
        return data;
    }
    return null;
}

async function logoutFromSupabase() {
    if (typeof polarisSupabase !== "undefined" && polarisSupabase.auth) {
        await polarisSupabase.auth.signOut();
    }
    localStorage.removeItem("polaris_user");
    localStorage.removeItem("polaris_profile");
    redirectToLogin();
}

function savePolarisSession(user, profile) {
    localStorage.setItem("polaris_user", JSON.stringify(user));
    localStorage.setItem("polaris_profile", JSON.stringify(profile));
}

/* =========================================================
   PROTECT PAGE
========================================================= */
async function protectPolarisPage(requiredPermission = null) {
    if (typeof initializeSupabase === "function") {
        initializeSupabase();
    }

    let attempts = 0;
    while (typeof polarisSupabase === "undefined" || !polarisSupabase) {
        if (attempts >= 30) {
            showAccessError("Unable to initialize secure authentication.");
            return false;
        }
        await sleep(100);
        attempts++;
    }

    const session = await getAuthenticatedSession();
    if (!session) {
        redirectToLogin();
        return false;
    }

    const user = await getAuthenticatedUser();
    if (!user) {
        redirectToLogin();
        return false;
    }

    const profile = await getStaffProfile(user.id);
    if (!profile) {
        showAccessError("Your account does not have a Polaris staff profile.");
        await logoutFromSupabase();
        return false;
    }

    if (!profile.is_active) {
        showAccessError("Your Polaris staff account is inactive.");
        await logoutFromSupabase();
        return false;
    }

    savePolarisSession(user, profile);

    const permission = requiredPermission || getRequiredPermission();

    if (permission && !roleHasPermission(profile.role, permission)) {
        showAccessError("Access denied. Your role does not have permission to open this module.");
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1500);
        return false;
    }

    updateAuthenticatedUI(profile);
    return true;
}

/* =========================================================
   UPDATE UI
========================================================= */
function updateAuthenticatedUI(profile) {
    document.querySelectorAll("[data-user-name]").forEach(el => {
        el.textContent = profile.full_name;
    });

    document.querySelectorAll("[data-user-role]").forEach(el => {
        el.textContent = profile.role;
    });

    document.querySelectorAll("[data-user-team]").forEach(el => {
        el.textContent = profile.team_name || "No Team";
    });

    /* Hide unauthorized menu items */
    document.querySelectorAll("[data-permission]").forEach(el => {
        const permission = el.getAttribute("data-permission");
        if (!roleHasPermission(profile.role, permission)) {
            el.style.display = "none";
        }
    });
}

/* =========================================================
   LOGOUT & REDIRECT HELPER FUNCTIONS
========================================================= */
function setupLogoutButtons() {
    document.querySelectorAll("[data-logout]").forEach(button => {
        button.addEventListener("click", async function (e) {
            e.preventDefault();
            await logoutFromSupabase();
        });
    });
}

function redirectToLogin() {
    if (!window.location.pathname.endsWith("login.html")) {
        window.location.href = "login.html";
    }
}

function showAccessError(message) {
    let box = document.getElementById("authError");
    if (!box) {
        box = document.createElement("div");
        box.id = "authError";
        box.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            max-width: 90%;
            padding: 14px 18px;
            border-radius: 8px;
            background: #fff1ef;
            color: #a93226;
            border: 1px solid #f1c7c1;
            font-family: Arial, sans-serif;
            font-size: 13px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        `;
        document.body.appendChild(box);
    }
    box.textContent = message;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/* =========================================================
   AUTOMATIC PROTECTION
========================================================= */
document.addEventListener("DOMContentLoaded", async function () {
    const page = getCurrentPageName();

    if (page === "login.html" || page === "index.html" || page === "" || page === "apply.html") {
        return;
    }

    if (POLARIS_PAGE_PERMISSIONS[page] !== undefined) {
        await protectPolarisPage();
    }

    setupLogoutButtons();
});
