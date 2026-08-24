/* =========================================================
   POLARIS CONSULTANTS
   SUPABASE CONFIGURATION
========================================================= */

/*
   STEP 17

   Yahan apni Supabase project information add karein.

   IMPORTANT:
   Supabase URL aur ANON/PUBLISHABLE key frontend
   mein use ki ja sakti hai.

   SERVICE ROLE KEY kabhi bhi is file mein mat dalna.
*/


const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";


const SUPABASE_ANON_KEY =
    "PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE";


/*
   Supabase client
*/

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
