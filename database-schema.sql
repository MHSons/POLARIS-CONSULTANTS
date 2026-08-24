/* =========================================================
   POLARIS CONSULTANTS
   COMPLETE DATABASE SCHEMA
   STEP 15

   PURPOSE:
   - Teams
   - Staff
   - Countries
   - Visa Types
   - Customers
   - Leads
   - Applications
   - Documents
   - Transactions
   - Receipts
   - Expenses
   - Follow-ups
   - WhatsApp Logs
   - Audit Logs
   - RLS Security
========================================================= */


/* =========================================================
   1. EXTENSIONS
========================================================= */

create extension if not exists pgcrypto;


/* =========================================================
   2. HELPER FUNCTION
========================================================= */

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin

    new.updated_at = now();

    return new;

end;
$$;


/* =========================================================
   3. TEAMS
========================================================= */

create table if not exists public.teams (

    id uuid primary key
        default gen_random_uuid(),

    name text not null unique,

    description text,

    manager_id uuid,

    is_active boolean not null
        default true,

    created_at timestamptz not null
        default now(),

    updated_at timestamptz not null
        default now()

);


/* =========================================================
   4. PROFILES / STAFF
========================================================= */

create table if not exists public.profiles (

    id uuid primary key
        references auth.users(id)
        on delete cascade,

    full_name text not null,

    email text not null,

    phone text,

    role text not null
        default 'RECEPTION'
        check (
            role in (
                'SUPER ADMIN',
                'MANAGER',
                'COUNSELLOR',
                'PROCESSING OFFICER',
                'FINANCE',
                'RECEPTION'
            )
        ),

    team_id uuid
        references public.teams(id)
        on delete set null,

    team_name text,

    is_active boolean not null
        default true,

    avatar_url text,

    created_at timestamptz not null
        default now(),

    updated_at timestamptz not null
        default now()

);


/* =========================================================
   5. COUNTRIES
========================================================= */

create table if not exists public.countries (

    id uuid primary key
        default gen_random_uuid(),

    name text not null unique,

    code text,

    continent text,

    currency text,

    capital text,

    description text,

    study_visa_available boolean
        default true,

    work_visa_available boolean
        default true,

    visit_visa_available boolean
        default true,

    permanent_residency_available boolean
        default false,

    is_active boolean
        default true,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   6. VISA TYPES
========================================================= */

create table if not exists public.visa_types (

    id uuid primary key
        default gen_random_uuid(),

    name text not null unique,

    code text unique,

    description text,

    is_active boolean
        default true,

    created_at timestamptz
        default now()

);


/* =========================================================
   7. CUSTOMERS
========================================================= */

create table if not exists public.customers (

    id uuid primary key
        default gen_random_uuid(),

    customer_code text unique,

    full_name text not null,

    cnic text,

    passport_number text,

    passport_expiry date,

    date_of_birth date,

    gender text,

    nationality text
        default 'Pakistani',

    email text,

    phone text not null,

    alternate_phone text,

    whatsapp_number text,

    address text,

    city text,

    country_of_residence text
        default 'Pakistan',

    emergency_contact_name text,

    emergency_contact_phone text,

    assigned_team_id uuid
        references public.teams(id)
        on delete set null,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    source text,

    notes text,

    status text
        default 'active'
        check (
            status in (
                'active',
                'inactive',
                'closed',
                'blacklisted'
            )
        ),

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   8. LEADS
========================================================= */

create table if not exists public.leads (

    id uuid primary key
        default gen_random_uuid(),

    lead_code text unique,

    full_name text not null,

    phone text,

    whatsapp_number text,

    email text,

    city text,

    country_interested_id uuid
        references public.countries(id)
        on delete set null,

    visa_type_id uuid
        references public.visa_types(id)
        on delete set null,

    source text,

    assigned_team_id uuid
        references public.teams(id)
        on delete set null,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    status text not null
        default 'new'
        check (
            status in (
                'new',
                'contacted',
                'qualified',
                'follow_up',
                'converted',
                'lost',
                'closed'
            )
        ),

    priority text
        default 'normal'
        check (
            priority in (
                'low',
                'normal',
                'high',
                'urgent'
            )
        ),

    notes text,

    converted_customer_id uuid
        references public.customers(id)
        on delete set null,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   9. APPLICATIONS
========================================================= */

create table if not exists public.applications (

    id uuid primary key
        default gen_random_uuid(),

    application_number text unique,

    customer_id uuid not null
        references public.customers(id)
        on delete cascade,

    country_id uuid
        references public.countries(id)
        on delete set null,

    visa_type_id uuid
        references public.visa_types(id)
        on delete set null,

    visa_type text,

    assigned_team_id uuid
        references public.teams(id)
        on delete set null,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    intake_date date
        default current_date,

    submission_date date,

    appointment_date date,

    decision_date date,

    status text not null
        default 'pending'
        check (
            status in (
                'pending',
                'in progress',
                'processing',
                'under review',
                'submitted',
                'approved',
                'rejected',
                'withdrawn',
                'closed'
            )
        ),

    priority text
        default 'normal',

    university_name text,

    course_name text,

    intake text,

    employer_name text,

    job_title text,

    visit_purpose text,

    application_fee numeric(14,2)
        default 0,

    service_fee numeric(14,2)
        default 0,

    notes text,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   10. DOCUMENTS
========================================================= */

create table if not exists public.documents (

    id uuid primary key
        default gen_random_uuid(),

    customer_id uuid
        references public.customers(id)
        on delete cascade,

    application_id uuid
        references public.applications(id)
        on delete cascade,

    document_type text not null,

    document_name text not null,

    file_url text,

    storage_path text,

    expiry_date date,

    verification_status text
        default 'pending'
        check (
            verification_status in (
                'pending',
                'verified',
                'rejected'
            )
        ),

    uploaded_by uuid
        references public.profiles(id)
        on delete set null,

    notes text,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   11. TRANSACTIONS
========================================================= */

create table if not exists public.transactions (

    id uuid primary key
        default gen_random_uuid(),

    transaction_number text unique,

    customer_id uuid
        references public.customers(id)
        on delete set null,

    application_id uuid
        references public.applications(id)
        on delete set null,

    team_id uuid
        references public.teams(id)
        on delete set null,

    transaction_type text not null
        check (
            transaction_type in (
                'received',
                'income',
                'payment_received',
                'expense',
                'paid',
                'payment',
                'refund'
            )
        ),

    amount numeric(14,2) not null
        check (amount >= 0),

    payment_method text
        default 'cash'
        check (
            payment_method in (
                'cash',
                'bank',
                'jazzcash',
                'easypaisa',
                'card',
                'online',
                'other'
            )
        ),

    reference_number text,

    description text,

    transaction_date date
        default current_date,

    created_by uuid
        references public.profiles(id)
        on delete set null,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   12. RECEIPTS
========================================================= */

create table if not exists public.receipts (

    id uuid primary key
        default gen_random_uuid(),

    receipt_number text unique not null,

    transaction_id uuid
        references public.transactions(id)
        on delete set null,

    customer_id uuid
        references public.customers(id)
        on delete set null,

    amount numeric(14,2) not null,

    payment_method text,

    description text,

    qr_token text unique,

    qr_data text,

    generated_by uuid
        references public.profiles(id)
        on delete set null,

    generated_at timestamptz
        default now()

);


/* =========================================================
   13. EXPENSES
========================================================= */

create table if not exists public.expenses (

    id uuid primary key
        default gen_random_uuid(),

    expense_number text unique,

    category text not null,

    amount numeric(14,2) not null
        check (amount >= 0),

    payment_method text
        default 'cash',

    description text,

    expense_date date
        default current_date,

    team_id uuid
        references public.teams(id)
        on delete set null,

    created_by uuid
        references public.profiles(id)
        on delete set null,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   14. FOLLOW UPS
========================================================= */

create table if not exists public.followups (

    id uuid primary key
        default gen_random_uuid(),

    customer_id uuid
        references public.customers(id)
        on delete cascade,

    lead_id uuid
        references public.leads(id)
        on delete cascade,

    application_id uuid
        references public.applications(id)
        on delete cascade,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    followup_date timestamptz not null,

    followup_type text
        default 'call',

    notes text,

    status text
        default 'pending'
        check (
            status in (
                'pending',
                'completed',
                'cancelled'
            )
        ),

    completed_at timestamptz,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


/* =========================================================
   15. WHATSAPP LOGS
========================================================= */

create table if not exists public.whatsapp_logs (

    id uuid primary key
        default gen_random_uuid(),

    customer_id uuid
        references public.customers(id)
        on delete set null,

    lead_id uuid
        references public.leads(id)
        on delete set null,

    phone_number text not null,

    message text not null,

    message_type text
        default 'manual',

    status text
        default 'pending'
        check (
            status in (
                'pending',
                'sent',
                'failed'
            )
        ),

    provider_message_id text,

    sent_by uuid
        references public.profiles(id)
        on delete set null,

    sent_at timestamptz,

    created_at timestamptz
        default now()

);


/* =========================================================
   16. AUDIT LOGS
========================================================= */

create table if not exists public.audit_logs (

    id uuid primary key
        default gen_random_uuid(),

    user_id uuid
        references public.profiles(id)
        on delete set null,

    action text not null,

    table_name text,

    record_id uuid,

    old_data jsonb,

    new_data jsonb,

    ip_address text,

    created_at timestamptz
        default now()

);


/* =========================================================
   17. COUNTRY SERVICES
========================================================= */

create table if not exists public.country_services (

    id uuid primary key
        default gen_random_uuid(),

    country_id uuid not null
        references public.countries(id)
        on delete cascade,

    visa_type_id uuid
        references public.visa_types(id)
        on delete cascade,

    eligibility text,

    required_documents text,

    processing_time text,

    estimated_cost text,

    application_process text,

    requirements text,

    notes text,

    is_active boolean
        default true,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now(),

    unique (
        country_id,
        visa_type_id
    )

);


/* =========================================================
   18. INDEXES
========================================================= */

create index if not exists
idx_customers_phone
on public.customers(phone);


create index if not exists
idx_customers_cnic
on public.customers(cnic);


create index if not exists
idx_customers_passport
on public.customers(passport_number);


create index if not exists
idx_customers_staff
on public.customers(assigned_staff_id);


create index if not exists
idx_customers_team
on public.customers(assigned_team_id);


create index if not exists
idx_leads_staff
on public.leads(assigned_staff_id);


create index if not exists
idx_leads_team
on public.leads(assigned_team_id);


create index if not exists
idx_leads_status
on public.leads(status);


create index if not exists
idx_applications_customer
on public.applications(customer_id);


create index if not exists
idx_applications_country
on public.applications(country_id);


create index if not exists
idx_applications_status
on public.applications(status);


create index if not exists
idx_transactions_customer
on public.transactions(customer_id);


create index if not exists
idx_transactions_date
on public.transactions(transaction_date);


create index if not exists
idx_followups_date
on public.followups(followup_date);


create index if not exists
idx_documents_customer
on public.documents(customer_id);


/* =========================================================
   19. UPDATED_AT TRIGGERS
========================================================= */

drop trigger if exists
teams_updated_at
on public.teams;


create trigger
teams_updated_at

before update
on public.teams

for each row

execute function
public.set_updated_at();


drop trigger if exists
profiles_updated_at
on public.profiles;


create trigger
profiles_updated_at

before update
on public.profiles

for each row

execute function
public.set_updated_at();


drop trigger if exists
countries_updated_at
on public.countries;


create trigger
countries_updated_at

before update
on public.countries

for each row

execute function
public.set_updated_at();


drop trigger if exists
customers_updated_at
on public.customers;


create trigger
customers_updated_at

before update
on public.customers

for each row

execute function
public.set_updated_at();


drop trigger if exists
leads_updated_at
on public.leads;


create trigger
leads_updated_at

before update
on public.leads

for each row

execute function
public.set_updated_at();


drop trigger if exists
applications_updated_at
on public.applications;


create trigger
applications_updated_at

before update
on public.applications

for each row

execute function
public.set_updated_at();


drop trigger if exists
documents_updated_at
on public.documents;


create trigger
documents_updated_at

before update
on public.documents

for each row

execute function
public.set_updated_at();


drop trigger if exists
transactions_updated_at
on public.transactions;


create trigger
transactions_updated_at

before update
on public.transactions

for each row

execute function
public.set_updated_at();


drop trigger if exists
expenses_updated_at
on public.expenses;


create trigger
expenses_updated_at

before update
on public.expenses

for each row

execute function
public.set_updated_at();


drop trigger if exists
followups_updated_at
on public.followups;


create trigger
followups_updated_at

before update
on public.followups

for each row

execute function
public.set_updated_at();


drop trigger if exists
country_services_updated_at
on public.country_services;


create trigger
country_services_updated_at

before update
on public.country_services

for each row

execute function
public.set_updated_at();


/* =========================================================
   20. ENABLE ROW LEVEL SECURITY
========================================================= */

alter table public.teams
enable row level security;

alter table public.profiles
enable row level security;

alter table public.countries
enable row level security;

alter table public.visa_types
enable row level security;

alter table public.customers
enable row level security;

alter table public.leads
enable row level security;

alter table public.applications
enable row level security;

alter table public.documents
enable row level security;

alter table public.transactions
enable row level security;

alter table public.receipts
enable row level security;

alter table public.expenses
enable row level security;

alter table public.followups
enable row level security;

alter table public.whatsapp_logs
enable row level security;

alter table public.audit_logs
enable row level security;

alter table public.country_services
enable row level security;


/* =========================================================
   21. HELPER FUNCTIONS FOR SECURITY
========================================================= */

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$

    select role

    from public.profiles

    where id = auth.uid();

$$;


create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$

    select exists (

        select 1

        from public.profiles

        where id = auth.uid()

        and role = 'SUPER ADMIN'

        and is_active = true

    );

$$;


/* =========================================================
   22. PROFILES POLICIES
========================================================= */

drop policy if exists
profiles_select_authenticated
on public.profiles;


create policy
profiles_select_authenticated

on public.profiles

for select

to authenticated

using (
    is_active = true
    or id = auth.uid()
);


drop policy if exists
profiles_admin_all
on public.profiles;


create policy
profiles_admin_all

on public.profiles

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


/* =========================================================
   23. COUNTRY POLICIES
========================================================= */

drop policy if exists
countries_read_authenticated
on public.countries;


create policy
countries_read_authenticated

on public.countries

for select

to authenticated

using (
    is_active = true
);


drop policy if exists
countries_admin_write
on public.countries;


create policy
countries_admin_write

on public.countries

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


/* =========================================================
   24. VISA TYPE POLICIES
========================================================= */

drop policy if exists
visa_types_read_authenticated
on public.visa_types;


create policy
visa_types_read_authenticated

on public.visa_types

for select

to authenticated

using (
    is_active = true
);


drop policy if exists
visa_types_admin_write
on public.visa_types;


create policy
visa_types_admin_write

on public.visa_types

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


/* =========================================================
   25. TEAM POLICIES
========================================================= */

drop policy if exists
teams_authenticated
on public.teams;


create policy
teams_authenticated

on public.teams

for select

to authenticated

using (
    is_active = true
);


drop policy if exists
teams_admin_write
on public.teams;


create policy
teams_admin_write

on public.teams

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


/* =========================================================
   26. CUSTOMER POLICIES
========================================================= */

drop policy if exists
customers_authenticated_select
on public.customers;


create policy
customers_authenticated_select

on public.customers

for select

to authenticated

using (
    true
);


drop policy if exists
customers_staff_insert
on public.customers;


create policy
customers_staff_insert

on public.customers

for insert

to authenticated

with check (
    true
);


drop policy if exists
customers_staff_update
on public.customers;


create policy
customers_staff_update

on public.customers

for update

to authenticated

using (
    true
)

with check (
    true
);


drop policy if exists
customers_admin_delete
on public.customers;


create policy
customers_admin_delete

on public.customers

for delete

to authenticated

using (
    public.is_admin()
);


/* =========================================================
   27. LEAD POLICIES
========================================================= */

drop policy if exists
leads_authenticated_select
on public.leads;


create policy
leads_authenticated_select

on public.leads

for select

to authenticated

using (
    true
);


drop policy if exists
leads_authenticated_insert
on public.leads;


create policy
leads_authenticated_insert

on public.leads

for insert

to authenticated

with check (
    true
);


drop policy if exists
leads_authenticated_update
on public.leads;


create policy
leads_authenticated_update

on public.leads

for update

to authenticated

using (
    true
)

with check (
    true
);


drop policy if exists
leads_admin_delete
on public.leads;


create policy
leads_admin_delete

on public.leads

for delete

to authenticated

using (
    public.is_admin()
);


/* =========================================================
   28. APPLICATION POLICIES
========================================================= */

drop policy if exists
applications_authenticated_select
on public.applications;


create policy
applications_authenticated_select

on public.applications

for select

to authenticated

using (
    true
);


drop policy if exists
applications_authenticated_insert
on public.applications;


create policy
applications_authenticated_insert

on public.applications

for insert

to authenticated

with check (
    true
);


drop policy if exists
applications_authenticated_update
on public.applications;


create policy
applications_authenticated_update

on public.applications

for update

to authenticated

using (
    true
)

with check (
    true
);


drop policy if exists
applications_admin_delete
on public.applications;


create policy
applications_admin_delete

on public.applications

for delete

to authenticated

using (
    public.is_admin()
);


/* =========================================================
   29. DOCUMENT POLICIES
========================================================= */

drop policy if exists
documents_authenticated_all
on public.documents;


create policy
documents_authenticated_all

on public.documents

for all

to authenticated

using (
    true
)

with check (
    true
);


/* =========================================================
   30. TRANSACTION POLICIES
========================================================= */

drop policy if exists
transactions_authenticated_select
on public.transactions;


create policy
transactions_authenticated_select

on public.transactions

for select

to authenticated

using (
    true
);


drop policy if exists
transactions_authenticated_insert
on public.transactions;


create policy
transactions_authenticated_insert

on public.transactions

for insert

to authenticated

with check (
    true
);


drop policy if exists
transactions_finance_update
on public.transactions;


create policy
transactions_finance_update

on public.transactions

for update

to authenticated

using (
    public.current_user_role()
    in (
        'SUPER ADMIN',
        'MANAGER',
        'FINANCE'
    )
)

with check (
    public.current_user_role()
    in (
        'SUPER ADMIN',
        'MANAGER',
        'FINANCE'
    )
);


/* =========================================================
   31. RECEIPT POLICIES
========================================================= */

drop policy if exists
receipts_authenticated_all
on public.receipts;


create policy
receipts_authenticated_all

on public.receipts

for all

to authenticated

using (
    true
)

with check (
    true
);


/* =========================================================
   32. EXPENSE POLICIES
========================================================= */

drop policy if exists
expenses_authenticated_select
on public.expenses;


create policy
expenses_authenticated_select

on public.expenses

for select

to authenticated

using (
    true
);


drop policy if exists
expenses_finance_write
on public.expenses;


create policy
expenses_finance_write

on public.expenses

for all

to authenticated

using (
    public.current_user_role()
    in (
        'SUPER ADMIN',
        'MANAGER',
        'FINANCE'
    )
)

with check (
    public.current_user_role()
    in (
        'SUPER ADMIN',
        'MANAGER',
        'FINANCE'
    )
);


/* =========================================================
   33. FOLLOW-UP POLICIES
========================================================= */

drop policy if exists
followups_authenticated_all
on public.followups;


create policy
followups_authenticated_all

on public.followups

for all

to authenticated

using (
    true
)

with check (
    true
);


/* =========================================================
   34. WHATSAPP LOG POLICIES
========================================================= */

drop policy if exists
whatsapp_authenticated_all
on public.whatsapp_logs;


create policy
whatsapp_authenticated_all

on public.whatsapp_logs

for all

to authenticated

using (
    true
)

with check (
    true
);


/* =========================================================
   35. AUDIT LOG POLICIES
========================================================= */

drop policy if exists
audit_authenticated_select
on public.audit_logs;


create policy
audit_authenticated_select

on public.audit_logs

for select

to authenticated

using (
    public.is_admin()
);


drop policy if exists
audit_authenticated_insert
on public.audit_logs;


create policy
audit_authenticated_insert

on public.audit_logs

for insert

to authenticated

with check (
    auth.uid() = user_id
);


/* =========================================================
   36. COUNTRY SERVICES
========================================================= */

drop policy if exists
country_services_read
on public.country_services;


create policy
country_services_read

on public.country_services

for select

to authenticated

using (
    is_active = true
);


drop policy if exists
country_services_admin_write
on public.country_services;


create policy
country_services_admin_write

on public.country_services

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


/* =========================================================
   37. DEFAULT VISA TYPES
========================================================= */

insert into public.visa_types (
    name,
    code,
    description
)

values

(
    'Study Visa',
    'STUDY',
    'Visa for students studying abroad.'
),

(
    'Work Visa',
    'WORK',
    'Visa for employment and professional work.'
),

(
    'Visit Visa',
    'VISIT',
    'Visa for tourism, family visits and short stays.'
),

(
    'Business Visa',
    'BUSINESS',
    'Visa for business and commercial activities.'
),

(
    'Family Visa',
    'FAMILY',
    'Visa for family reunion and dependent purposes.'
),

(
    'Transit Visa',
    'TRANSIT',
    'Visa for transit through a country.'
)

on conflict (name)
do nothing;


/* =========================================================
   38. DEFAULT TEAM
========================================================= */

insert into public.teams (
    name,
    description
)

values (

    'Management',

    'Polaris Consultants management team.'

)

on conflict (name)
do nothing;


/* =========================================================
   39. BASIC COUNTRIES
========================================================= */

insert into public.countries (
    name,
    code,
    continent
)

values

(
    'United Kingdom',
    'GB',
    'Europe'
),

(
    'United States',
    'US',
    'North America'
),

(
    'Canada',
    'CA',
    'North America'
),

(
    'Australia',
    'AU',
    'Oceania'
),

(
    'New Zealand',
    'NZ',
    'Oceania'
),

(
    'Germany',
    'DE',
    'Europe'
),

(
    'France',
    'FR',
    'Europe'
),

(
    'Italy',
    'IT',
    'Europe'
),

(
    'Spain',
    'ES',
    'Europe'
),

(
    'Ireland',
    'IE',
    'Europe'
),

(
    'Netherlands',
    'NL',
    'Europe'
),

(
    'Sweden',
    'SE',
    'Europe'
),

(
    'Finland',
    'FI',
    'Europe'
),

(
    'Denmark',
    'DK',
    'Europe'
),

(
    'Norway',
    'NO',
    'Europe'
),

(
    'Switzerland',
    'CH',
    'Europe'
),

(
    'Austria',
    'AT',
    'Europe'
),

(
    'Poland',
    'PL',
    'Europe'
),

(
    'Portugal',
    'PT',
    'Europe'
),

(
    'Hungary',
    'HU',
    'Europe'
),

(
    'Malta',
    'MT',
    'Europe'
),

(
    'Cyprus',
    'CY',
    'Europe'
),

(
    'UAE',
    'AE',
    'Asia'
),

(
    'Saudi Arabia',
    'SA',
    'Asia'
),

(
    'Qatar',
    'QA',
    'Asia'
),

(
    'Turkey',
    'TR',
    'Asia'
),

(
    'Malaysia',
    'MY',
    'Asia'
),

(
    'China',
    'CN',
    'Asia'
),

(
    'Japan',
    'JP',
    'Asia'
),

(
    'South Korea',
    'KR',
    'Asia'
)

on conflict (name)
do nothing;


/* =========================================================
   40. CUSTOMER CODE GENERATOR
========================================================= */

create or replace function public.generate_customer_code()
returns trigger
language plpgsql
as $$
begin

    if new.customer_code is null then

        new.customer_code :=
            'PC-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
customer_code_trigger
on public.customers;


create trigger
customer_code_trigger

before insert
on public.customers

for each row

execute function
public.generate_customer_code();


/* =========================================================
   41. LEAD CODE GENERATOR
========================================================= */

create or replace function public.generate_lead_code()
returns trigger
language plpgsql
as $$
begin

    if new.lead_code is null then

        new.lead_code :=
            'LEAD-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
lead_code_trigger
on public.leads;


create trigger
lead_code_trigger

before insert
on public.leads

for each row

execute function
public.generate_lead_code();


/* =========================================================
   42. APPLICATION NUMBER GENERATOR
========================================================= */

create or replace function public.generate_application_number()
returns trigger
language plpgsql
as $$
begin

    if new.application_number is null then

        new.application_number :=
            'APP-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
application_number_trigger
on public.applications;


create trigger
application_number_trigger

before insert
on public.applications

for each row

execute function
public.generate_application_number();


/* =========================================================
   43. TRANSACTION NUMBER GENERATOR
========================================================= */

create or replace function public.generate_transaction_number()
returns trigger
language plpgsql
as $$
begin

    if new.transaction_number is null then

        new.transaction_number :=
            'TXN-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
transaction_number_trigger
on public.transactions;


create trigger
transaction_number_trigger

before insert
on public.transactions

for each row

execute function
public.generate_transaction_number();


/* =========================================================
   44. RECEIPT NUMBER GENERATOR
========================================================= */

create or replace function public.generate_receipt_number()
returns trigger
language plpgsql
as $$
begin

    if new.receipt_number is null then

        new.receipt_number :=
            'RCP-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    if new.qr_token is null then

        new.qr_token :=
            encode(
                gen_random_bytes(16),
                'hex'
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
receipt_number_trigger
on public.receipts;


create trigger
receipt_number_trigger

before insert
on public.receipts

for each row

execute function
public.generate_receipt_number();


/* =========================================================
   45. EXPENSE NUMBER GENERATOR
========================================================= */

create or replace function public.generate_expense_number()
returns trigger
language plpgsql
as $$
begin

    if new.expense_number is null then

        new.expense_number :=
            'EXP-' ||
            to_char(
                now(),
                'YYYYMMDD'
            ) ||
            '-' ||
            upper(
                substring(
                    replace(
                        gen_random_uuid()::text,
                        '-',
                        ''
                    )
                    from 1 for 6
                )
            );

    end if;


    return new;

end;
$$;


drop trigger if exists
expense_number_trigger
on public.expenses;


create trigger
expense_number_trigger

before insert
on public.expenses

for each row

execute function
public.generate_expense_number();


/* =========================================================
   46. FINAL
========================================================= */

select
    'Polaris Consultants database schema created successfully.'
    as message;
