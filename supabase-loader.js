/* =========================================================
   POLARIS CONSULTANTS
   SUPABASE LOADER
========================================================= */


/*
    This file loads the official Supabase JavaScript
    library before initializing our application.
*/


(function () {

    const script =
        document.createElement(
            "script"
        );


    script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


    script.async = true;


    script.onload =
        function () {

            console.log(
                "Supabase library loaded."
            );


            if (
                typeof initializeSupabase ===
                "function"
            ) {

                initializeSupabase();

            }

        };


    script.onerror =
        function () {

            console.error(
                "Unable to load Supabase library."
            );

        };


    document.head.appendChild(
        script
    );

})();
