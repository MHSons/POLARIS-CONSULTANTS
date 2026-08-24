/* =========================================================
   POLARIS CONSULTANTS
   REAL SUPABASE AUTHENTICATION
   STEP 13
========================================================= */


/* =========================================================
   INITIALIZE SUPABASE
========================================================= */

function getPolarisSupabase() {

    if (
        typeof polarisSupabase !==
        "undefined" &&
        polarisSupabase
    ) {

        return polarisSupabase;

    }


    if (
        typeof initializeSupabase ===
        "function"
    ) {

        initializeSupabase();

    }


    if (
        typeof polarisSupabase !==
        "undefined"
    ) {

        return polarisSupabase;

    }


    return null;

}


/* =========================================================
   LOGIN
========================================================= */

async function loginWithSupabase(
    email,
    password
) {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        return {

            success: false,

            message:
                "Supabase is not configured."

        };

    }


    if (!email || !password) {

        return {

            success: false,

            message:
                "Email and password are required."

        };

    }


    try {

        const {
            data,
            error
        } =
            await supabase
                .auth
                .signInWithPassword({

                    email:
                        email.trim(),

                    password:
                        password

                });


        if (error) {

            console.error(
                "Supabase login error:",
                error
            );


            return {

                success: false,

                message:
                    getAuthErrorMessage(
                        error
                    )

            };

        }


        if (!data.user) {

            return {

                success: false,

                message:
                    "Login failed."

            };

        }


        /*
           Get staff profile.
        */

        const profile =
            await getStaffProfile(
                data.user.id
            );


        if (!profile) {

            await supabase
                .auth
                .signOut();


            return {

                success: false,

                message:
                    "Your account exists, but no staff profile has been assigned. Please contact the administrator."

            };

        }


        if (!profile.is_active) {

            await supabase
                .auth
                .signOut();


            return {

                success: false,

                message:
                    "Your Polaris staff account is currently inactive."

            };

        }


        /*
           Store non-sensitive session
           information for frontend UI.
        */

        const localSession = {

            userId:
                data.user.id,

            email:
                data.user.email,

            name:
                profile.full_name,

            role:
                profile.role,

            team:
                profile.team_name,

            isActive:
                profile.is_active,

            authenticated:
                true

        };


        sessionStorage.setItem(
            "polarisSession",
            JSON.stringify(
                localSession
            )
        );


        return {

            success: true,

            user:
                data.user,

            profile:
                profile

        };

    } catch (error) {

        console.error(
            "Unexpected login error:",
            error
        );


        return {

            success: false,

            message:
                "An unexpected error occurred while logging in."

        };

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutFromSupabase() {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        sessionStorage.removeItem(
            "polarisSession"
        );

        window.location.href =
            "login.html";

        return;

    }


    try {

        await supabase
            .auth
            .signOut();

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    sessionStorage.removeItem(
        "polarisSession"
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   GET AUTHENTICATED USER
========================================================= */

async function getAuthenticatedUser() {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        return null;

    }


    const {
        data,
        error
    } =
        await supabase
            .auth
            .getUser();


    if (error) {

        return null;

    }


    return data.user;

}


/* =========================================================
   GET SESSION
========================================================= */

async function getAuthenticatedSession() {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        return null;

    }


    const {
        data,
        error
    } =
        await supabase
            .auth
            .getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return null;

    }


    return data.session;

}


/* =========================================================
   GET PROFILE
========================================================= */

async function getAuthenticatedProfile() {

    const user =
        await getAuthenticatedUser();


    if (!user) {

        return null;

    }


    return await getStaffProfile(
        user.id
    );

}


/* =========================================================
   PASSWORD RESET
========================================================= */

async function sendPasswordReset(
    email
) {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        return {

            success: false,

            message:
                "Supabase is not configured."

        };

    }


    if (!email) {

        return {

            success: false,

            message:
                "Please enter your email address."

        };

    }


    try {

        const {
            error
        } =
            await supabase
                .auth
                .resetPasswordForEmail(
                    email.trim(),
                    {

                        redirectTo:
                            window.location.origin +
                            "/reset-password.html"

                    }
                );


        if (error) {

            return {

                success: false,

                message:
                    getAuthErrorMessage(
                        error
                    )

            };

        }


        return {

            success: true,

            message:
                "Password reset instructions have been sent if the account exists."

        };

    } catch (error) {

        return {

            success: false,

            message:
                "Unable to process password reset."

        };

    }

}


/* =========================================================
   CHANGE PASSWORD
========================================================= */

async function changePassword(
    newPassword
) {

    const supabase =
        getPolarisSupabase();


    if (!supabase) {

        return {

            success: false,

            message:
                "Supabase is not configured."

        };

    }


    if (
        !newPassword ||
        newPassword.length < 8
    ) {

        return {

            success: false,

            message:
                "Password must contain at least 8 characters."

        };

    }


    const {
        data,
        error
    } =
        await supabase
            .auth
            .updateUser({

                password:
                    newPassword

            });


    if (error) {

        return {

            success: false,

            message:
                getAuthErrorMessage(
                    error
                )

        };

    }


    return {

        success: true,

        user:
            data.user

    };

}


/* =========================================================
   AUTH ERROR TRANSLATION
========================================================= */

function getAuthErrorMessage(
    error
) {

    if (!error) {

        return "Authentication failed.";

    }


    const message =
        String(
            error.message ||
            ""
        ).toLowerCase();


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {

        return "Email or password is incorrect.";

    }


    if (
        message.includes(
            "email not confirmed"
        )
    ) {

        return "Please confirm your email address before signing in.";

    }


    if (
        message.includes(
            "too many requests"
        )
    ) {

        return "Too many login attempts. Please wait and try again.";

    }


    if (
        message.includes(
            "user not found"
        )
    ) {

        return "No account was found with this email.";

    }


    return (
        error.message ||
        "Unable to authenticate your account."
    );

}


/* =========================================================
   SAVE FRONTEND SESSION
========================================================= */

function savePolarisSession(
    user,
    profile
) {

    if (!user || !profile) {

        return;

    }


    const session = {

        userId:
            user.id,

        email:
            user.email,

        name:
            profile.full_name,

        role:
            profile.role,

        team:
            profile.team_name,

        isActive:
            profile.is_active,

        authenticated:
            true

    };


    sessionStorage.setItem(
        "polarisSession",
        JSON.stringify(
            session
        )
    );

}


/* =========================================================
   GET LOCAL PROFILE
========================================================= */

function getLocalPolarisSession() {

    const value =
        sessionStorage.getItem(
            "polarisSession"
        );


    if (!value) {

        return null;

    }


    try {

        return JSON.parse(
            value
        );

    } catch (error) {

        sessionStorage.removeItem(
            "polarisSession"
        );

        return null;

    }

}
