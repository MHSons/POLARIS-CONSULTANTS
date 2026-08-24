/* =========================================================
   POLARIS CONSULTANTS - ADMIN PROFILE SETUP
========================================================= */

/*
   INSTRUCTIONS:
   1. Create user in Supabase Dashboard -> Authentication -> Users -> Add User
   2. Copy the user's UUID and replace 'YOUR_ADMIN_USER_UUID' below.
   3. Replace 'YOUR_ADMIN_EMAIL' with your actual admin email.
*/

INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    team_name,
    is_active
) 
VALUES (
    'YOUR_ADMIN_USER_UUID',
    'Polaris Administrator',
    'YOUR_ADMIN_EMAIL',
    'SUPER ADMIN',
    'Management',
    true
)
ON CONFLICT (id) 
DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    team_name = EXCLUDED.team_name,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();
