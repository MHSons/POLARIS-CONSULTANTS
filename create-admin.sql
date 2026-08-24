/* =========================================================
   POLARIS CONSULTANTS
   ADMIN PROFILE SETUP
========================================================= */


/*
   IMPORTANT:

   First create the user from:

   Supabase Dashboard
   ↓
   Authentication
   ↓
   Users
   ↓
   Add User


   Enter your admin email and password.

   Then copy that user's UUID.

   Replace:

   YOUR_ADMIN_USER_UUID

   below.
*/


insert into public.profiles (

    id,

    full_name,

    email,

    role,

    team_name,

    is_active

)

values (

    'YOUR_ADMIN_USER_UUID',

    'Polaris Administrator',

    'YOUR_ADMIN_EMAIL',

    'SUPER ADMIN',

    'Management',

    true

)

on conflict (id)

do update set

    full_name =
        excluded.full_name,

    email =
        excluded.email,

    role =
        excluded.role,

    team_name =
        excluded.team_name,

    is_active =
        excluded.is_active,

    updated_at =
        now();
