SELECT table_name, rowsecurity 
FROM information_schema.tables 
WHERE table_schema = 'public';

SELECT COUNT(*) FROM public.countries;
