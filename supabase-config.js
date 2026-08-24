/* =========================================================
   POLARIS CONSULTANTS
   SUPABASE CONNECTION
   STEP 12
========================================================= */


/*
    IMPORTANT:

    Yahan apni Supabase project ki values paste karni hain.

    Supabase Dashboard:
    Project Settings
    ↓
    API
    ↓
    Project URL
    ↓
    anon / publishable key
*/


const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";


const SUPABASE_ANON_KEY =
    "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";


/* =========================================================
   SUPABASE CLIENT
========================================================= */

let polarisSupabase = null;


/*
    Supabase library load hone ke baad
    client create hoga.
*/

function initializeSupabase() {

    if (
        typeof window.supabase ===
        "undefined"
    ) {

        console.error(
            "Supabase library is not loaded."
        );

        return false;
    }


    if (
        SUPABASE_URL.includes(
            "PASTE_YOUR"
        )
    ) {

        console.warn(
            "Supabase URL has not been configured yet."
        );

        return false;
    }


    if (
        SUPABASE_ANON_KEY.includes(
            "PASTE_YOUR"
        )
    ) {

        console.warn(
            "Supabase anon key has not been configured yet."
        );

        return false;
    }


    polarisSupabase =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );


    console.log(
        "Polaris Supabase connected."
    );


    return true;
}


/* =========================================================
   CHECK CONNECTION
========================================================= */

async function checkSupabaseConnection() {

    if (!polarisSupabase) {

        const initialized =
            initializeSupabase();


        if (!initialized) {

            return {

                success: false,

                message:
                    "Supabase is not configured."

            };

        }

    }


    try {

        const {
            data,
            error
        } =
            await polarisSupabase
                .from("countries")
                .select("id")
                .limit(1);


        if (error) {

            console.error(
                "Supabase connection error:",
                error
            );


            return {

                success: false,

                message:
                    error.message

            };

        }


        return {

            success: true,

            message:
                "Supabase connection successful."

        };

    } catch (error) {

        console.error(error);


        return {

            success: false,

            message:
                "Unable to connect to Supabase."

        };

    }

}


/* =========================================================
   GET CURRENT USER
========================================================= */

async function getSupabaseUser() {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return null;

    }


    const {
        data,
        error
    } =
        await polarisSupabase
            .auth
            .getUser();


    if (error) {

        console.error(
            "User error:",
            error
        );

        return null;

    }


    return data.user;

}


/* =========================================================
   GET CURRENT SESSION
========================================================= */

async function getSupabaseSession() {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return null;

    }


    const {
        data,
        error
    } =
        await polarisSupabase
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
   GET STAFF PROFILE
========================================================= */

async function getStaffProfile(
    userId = null
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return null;

    }


    let id = userId;


    if (!id) {

        const user =
            await getSupabaseUser();


        if (!user) {

            return null;

        }


        id = user.id;

    }


    const {
        data,
        error
    } =
        await polarisSupabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();


    if (error) {

        console.error(
            "Profile error:",
            error
        );

        return null;

    }


    return data;

}


/* =========================================================
   GET CURRENT ROLE
========================================================= */

async function getCurrentSupabaseRole() {

    const profile =
        await getStaffProfile();


    if (!profile) {

        return null;

    }


    return profile.role;

}


/* =========================================================
   LOGOUT
========================================================= */

async function supabaseLogout() {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return false;

    }


    const {
        error
    } =
        await polarisSupabase
            .auth
            .signOut();


    if (error) {

        console.error(
            "Logout error:",
            error
        );

        return false;

    }


    sessionStorage.removeItem(
        "polarisSession"
    );


    window.location.href =
        "login.html";


    return true;

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

function listenForAuthChanges(
    callback
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return null;

    }


    return polarisSupabase
        .auth
        .onAuthStateChange(
            (
                event,
                session
            ) => {

                console.log(
                    "Auth event:",
                    event
                );


                if (
                    typeof callback ===
                    "function"
                ) {

                    callback(
                        event,
                        session
                    );

                }

            }
        );

}


/* =========================================================
   DATABASE HELPER
========================================================= */


/*
    Example:

    const customers =
        await supabaseSelect(
            "customers",
            "*"
        );
*/

async function supabaseSelect(
    table,
    columns = "*",
    filters = {}
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase not configured."
                )

        };

    }


    let query =
        polarisSupabase
            .from(table)
            .select(columns);


    Object.keys(filters)
        .forEach(
            key => {

                query =
                    query.eq(
                        key,
                        filters[key]
                    );

            }
        );


    const {
        data,
        error
    } =
        await query;


    return {

        data,
        error

    };

}


/* =========================================================
   DATABASE INSERT HELPER
========================================================= */

async function supabaseInsert(
    table,
    record
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase not configured."
                )

        };

    }


    const {
        data,
        error
    } =
        await polarisSupabase
            .from(table)
            .insert(record)
            .select()
            .single();


    return {

        data,
        error

    };

}


/* =========================================================
   DATABASE UPDATE HELPER
========================================================= */

async function supabaseUpdate(
    table,
    record,
    filters
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase not configured."
                )

        };

    }


    let query =
        polarisSupabase
            .from(table)
            .update(record);


    Object.keys(filters)
        .forEach(
            key => {

                query =
                    query.eq(
                        key,
                        filters[key]
                    );

            }
        );


    const {
        data,
        error
    } =
        await query
            .select();


    return {

        data,
        error

    };

}


/* =========================================================
   DATABASE DELETE HELPER
========================================================= */

async function supabaseDelete(
    table,
    filters
) {

    if (!polarisSupabase) {

        initializeSupabase();

    }


    if (!polarisSupabase) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase not configured."
                )

        };

    }


    let query =
        polarisSupabase
            .from(table)
            .delete();


    Object.keys(filters)
        .forEach(
            key => {

                query =
                    query.eq(
                        key,
                        filters[key]
                    );

            }
        );


    const {
        data,
        error
    } =
        await query;


    return {

        data,
        error

    };

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSupabase();

    }
);
