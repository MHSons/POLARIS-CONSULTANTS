-- ============================================================
-- POLARIS CONSULTANTS
-- SUPABASE DATABASE SCHEMA
-- STEP 11
-- ============================================================

create extension if not exists "pgcrypto";


-- ============================================================
-- 1. PROFILES / STAFF
-- ============================================================

create table if not exists public.profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    email text,

    phone text,

    role text not null default 'RECEPTION'
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

    team_name text,

    is_active boolean not null default true,

    avatar_url text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);


-- ============================================================
-- 2. TEAMS
-- ============================================================

create table if not exists public.teams (

    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    description text,

    manager_id uuid references public.profiles(id)
        on delete set null,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 3. COUNTRIES
-- ============================================================

create table if not exists public.countries (

    id uuid primary key default gen_random_uuid(),

    country_name text not null unique,

    country_code text,

    flag_emoji text,

    continent text,

    currency text,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 4. VISA SERVICES
-- ============================================================

create table if not exists public.visa_services (

    id uuid primary key default gen_random_uuid(),

    country_id uuid not null references public.countries(id)
        on delete cascade,

    visa_type text not null
        check (
            visa_type in (
                'STUDY VISA',
                'WORK VISA',
                'VISIT VISA',
                'BUSINESS VISA',
                'DEPENDENT VISA',
                'FAMILY VISA',
                'OTHER'
            )
        ),

    service_name text not null,

    description text,

    requirements text,

    processing_time text,

    official_fee numeric(12,2) default 0,

    consultancy_fee numeric(12,2) default 0,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 5. CUSTOMERS
-- ============================================================

create table if not exists public.customers (

    id uuid primary key default gen_random_uuid(),

    customer_code text unique,

    full_name text not null,

    cnic text,

    passport_number text,

    date_of_birth date,

    gender text,

    nationality text default 'Pakistani',

    email text,

    phone text not null,

    whatsapp_number text,

    address text,

    city text,

    country_of_residence text default 'Pakistan',

    assigned_team_id uuid references public.teams(id)
        on delete set null,

    assigned_staff_id uuid references public.profiles(id)
        on delete set null,

    source text,

    notes text,

    status text not null default 'ACTIVE'
        check (
            status in (
                'ACTIVE',
                'INACTIVE',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);


-- ============================================================
-- 6. LEADS
-- ============================================================

create table if not exists public.leads (

    id uuid primary key default gen_random_uuid(),

    lead_code text unique,

    full_name text not null,

    phone text,

    whatsapp_number text,

    email text,

    city text,

    interested_country_id uuid
        references public.countries(id)
        on delete set null,

    interested_visa_type text,

    source text,

    assigned_team_id uuid
        references public.teams(id)
        on delete set null,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    status text not null default 'NEW'
        check (
            status in (
                'NEW',
                'CONTACTED',
                'FOLLOW_UP',
                'QUALIFIED',
                'CONVERTED',
                'LOST',
                'CLOSED'
            )
        ),

    priority text not null default 'NORMAL'
        check (
            priority in (
                'LOW',
                'NORMAL',
                'HIGH',
                'URGENT'
            )
        ),

    next_follow_up_at timestamptz,

    notes text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);


-- ============================================================
-- 7. APPLICATIONS
-- ============================================================

create table if not exists public.applications (

    id uuid primary key default gen_random_uuid(),

    application_code text unique,

    customer_id uuid not null
        references public.customers(id)
        on delete cascade,

    country_id uuid
        references public.countries(id)
        on delete set null,

    visa_service_id uuid
        references public.visa_services(id)
        on delete set null,

    assigned_team_id uuid
        references public.teams(id)
        on delete set null,

    assigned_staff_id uuid
        references public.profiles(id)
        on delete set null,

    status text not null default 'NEW'
        check (
            status in (
                'NEW',
                'DOCUMENTS_PENDING',
                'DOCUMENTS_RECEIVED',
                'UNDER_PROCESSING',
                'SUBMITTED',
                'EMBASSY_PROCESSING',
                'INTERVIEW',
                'APPROVED',
                'REFUSED',
                'WITHDRAWN',
                'COMPLETED'
            )
        ),

    application_date date default current_date,

    submission_date date,

    decision_date date,

    appointment_date timestamptz,

    total_fee numeric(12,2) default 0,

    paid_amount numeric(12,2) default 0,

    remaining_amount numeric(12,2) default 0,

    notes text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);


-- ============================================================
-- 8. DOCUMENTS
-- ============================================================

create table if not exists public.documents (

    id uuid primary key default gen_random_uuid(),

    customer_id uuid
        references public.customers(id)
        on delete cascade,

    application_id uuid
        references public.applications(id)
        on delete cascade,

    document_type text not null,

    document_name text not null,

    file_path text not null,

    file_url text,

    expiry_date date,

    verified boolean not null default false,

    verified_by uuid
        references public.profiles(id)
        on delete set null,

    verified_at timestamptz,

    notes text,

    uploaded_by uuid
        references public.profiles(id)
        on delete set null,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 9. FINANCIAL TRANSACTIONS
-- ============================================================

create table if not exists public.transactions (

    id uuid primary key default gen_random_uuid(),

    transaction_code text unique,

    customer_id uuid
        references public.customers(id)
        on delete set null,

    application_id uuid
        references public.applications(id)
        on delete set null,

    transaction_type text not null
        check (
            transaction_type in (
                'RECEIPT',
                'PAYMENT',
                'EXPENSE',
                'REFUND',
                'ADJUSTMENT'
            )
        ),

    category text,

    description text,

    amount numeric(12,2) not null
        check (amount >= 0),

    payment_method text
        check (
            payment_method in (
                'CASH',
                'BANK',
                'JAZZCASH',
                'EASYPAISA',
                'CARD',
                'ONLINE',
                'OTHER'
            )
        ),

    reference_number text,

    transaction_date timestamptz not null default now(),

    received_by uuid
        references public.profiles(id)
        on delete set null,

    notes text,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 10. RECEIPTS
-- ============================================================

create table if not exists public.receipts (

    id uuid primary key default gen_random_uuid(),

    receipt_number text unique not null,

    transaction_id uuid not null
        references public.transactions(id)
        on delete cascade,

    customer_id uuid
        references public.customers(id)
        on delete set null,

    amount numeric(12,2) not null,

    payment_method text,

    purpose text,

    qr_data text,

    issued_by uuid
        references public.profiles(id)
        on delete set null,

    issued_at timestamptz not null default now(),

    notes text

);


-- ============================================================
-- 11. EXPENSES
-- ============================================================

create table if not exists public.expenses (

    id uuid primary key default gen_random_uuid(),

    expense_code text unique,

    category text not null,

    description text,

    amount numeric(12,2) not null
        check (amount >= 0),

    payment_method text,

    expense_date date not null default current_date,

    team_id uuid
        references public.teams(id)
        on delete set null,

    paid_to text,

    reference_number text,

    created_by uuid
        references public.profiles(id)
        on delete set null,

    notes text,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 12. FOLLOW UPS
-- ============================================================

create table if not exists public.follow_ups (

    id uuid primary key default gen_random_uuid(),

    lead_id uuid
        references public.leads(id)
        on delete cascade,

    customer_id uuid
        references public.customers(id)
        on delete cascade,

    application_id uuid
        references public.applications(id)
        on delete cascade,

    assigned_to uuid
        references public.profiles(id)
        on delete set null,

    follow_up_date timestamptz not null,

    method text,

    status text not null default 'PENDING'
        check (
            status in (
                'PENDING',
                'COMPLETED',
                'MISSED',
                'CANCELLED'
            )
        ),

    notes text,

    completed_at timestamptz,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 13. WHATSAPP MESSAGES LOG
-- ============================================================

create table if not exists public.whatsapp_messages (

    id uuid primary key default gen_random_uuid(),

    customer_id uuid
        references public.customers(id)
        on delete set null,

    lead_id uuid
        references public.leads(id)
        on delete set null,

    phone_number text not null,

    message text not null,

    message_type text default 'CUSTOMER_APPLICATION',

    status text default 'PENDING',

    external_message_id text,

    sent_by uuid
        references public.profiles(id)
        on delete set null,

    created_at timestamptz not null default now(),

    sent_at timestamptz

);


-- ============================================================
-- 14. AUDIT LOGS
-- ============================================================

create table if not exists public.audit_logs (

    id uuid primary key default gen_random_uuid(),

    user_id uuid
        references public.profiles(id)
        on delete set null,

    action text not null,

    table_name text,

    record_id uuid,

    old_data jsonb,

    new_data jsonb,

    ip_address text,

    user_agent text,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 15. COUNTRY INFORMATION
-- ============================================================

create table if not exists public.country_information (

    id uuid primary key default gen_random_uuid(),

    country_id uuid not null unique
        references public.countries(id)
        on delete cascade,

    overview text,

    capital text,

    language text,

    currency text,

    timezone text,

    education_overview text,

    work_overview text,

    visit_overview text,

    visa_overview text,

    admission_information text,

    accommodation_information text,

    financial_requirements text,

    document_requirements text,

    application_process text,

    interview_information text,

    embassy_information text,

    important_notes text,

    last_verified_at timestamptz,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);


-- ============================================================
-- 16. APPLICATION NOTES
-- ============================================================

create table if not exists public.application_notes (

    id uuid primary key default gen_random_uuid(),

    application_id uuid not null
        references public.applications(id)
        on delete cascade,

    user_id uuid
        references public.profiles(id)
        on delete set null,

    note text not null,

    created_at timestamptz not null default now()

);


-- ============================================================
-- 17. INDEXES
-- ============================================================

create index if not exists idx_customers_phone
on public.customers(phone);

create index if not exists idx_customers_passport
on public.customers(passport_number);

create index if not exists idx_customers_assigned_staff
on public.customers(assigned_staff_id);

create index if not exists idx_leads_status
on public.leads(status);

create index if not exists idx_leads_assigned_staff
on public.leads(assigned_staff_id);

create index if not exists idx_applications_customer
on public.applications(customer_id);

create index if not exists idx_applications_status
on public.applications(status);

create index if not exists idx_transactions_customer
on public.transactions(customer_id);

create index if not exists idx_transactions_date
on public.transactions(transaction_date);

create index if not exists idx_documents_customer
on public.documents(customer_id);

create index if not exists idx_followups_date
on public.follow_ups(follow_up_date);


-- ============================================================
-- 18. UPDATED_AT FUNCTION
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin

    new.updated_at = now();

    return new;

end;
$$;


-- ============================================================
-- 19. UPDATED_AT TRIGGERS
-- ============================================================

drop trigger if exists profiles_updated_at
on public.profiles;

create trigger profiles_updated_at

before update on public.profiles

for each row

execute function public.set_updated_at();


drop trigger if exists customers_updated_at
on public.customers;

create trigger customers_updated_at

before update on public.customers

for each row

execute function public.set_updated_at();


drop trigger if exists leads_updated_at
on public.leads;

create trigger leads_updated_at

before update on public.leads

for each row

execute function public.set_updated_at();


drop trigger if exists applications_updated_at
on public.applications;

create trigger applications_updated_at

before update on public.applications

for each row

execute function public.set_updated_at();


drop trigger if exists country_information_updated_at
on public.country_information;

create trigger country_information_updated_at

before update on public.country_information

for each row

execute function public.set_updated_at();


-- ============================================================
-- 20. CUSTOMER CODE
-- ============================================================

create or replace function public.generate_customer_code()
returns trigger
language plpgsql
as $$
begin

    if new.customer_code is null then

        new.customer_code :=
            'PC-' ||
            to_char(now(), 'YYYYMMDD') ||
            '-' ||
            upper(substr(replace(new.id::text, '-', ''), 1, 6));

    end if;

    return new;

end;
$$;


drop trigger if exists customers_code_trigger
on public.customers;

create trigger customers_code_trigger

before insert on public.customers

for each row

execute function public.generate_customer_code();


-- ============================================================
-- 21. LEAD CODE
-- ============================================================

create or replace function public.generate_lead_code()
returns trigger
language plpgsql
as $$
begin

    if new.lead_code is null then

        new.lead_code :=
            'LEAD-' ||
            to_char(now(), 'YYYYMMDD') ||
            '-' ||
            upper(substr(replace(new.id::text, '-', ''), 1, 6));

    end if;

    return new;

end;
$$;


drop trigger if exists leads_code_trigger
on public.leads;

create trigger leads_code_trigger

before insert on public.leads

for each row

execute function public.generate_lead_code();


-- ============================================================
-- 22. APPLICATION CODE
-- ============================================================

create or replace function public.generate_application_code()
returns trigger
language plpgsql
as $$
begin

    if new.application_code is null then

        new.application_code :=
            'APP-' ||
            to_char(now(), 'YYYYMMDD') ||
            '-' ||
            upper(substr(replace(new.id::text, '-', ''), 1, 6));

    end if;

    return new;

end;
$$;


drop trigger if exists applications_code_trigger
on public.applications;

create trigger applications_code_trigger

before insert on public.applications

for each row

execute function public.generate_application_code();


-- ============================================================
-- 23. TRANSACTION CODE
-- ============================================================

create or replace function public.generate_transaction_code()
returns trigger
language plpgsql
as $$
begin

    if new.transaction_code is null then

        new.transaction_code :=
            'TXN-' ||
            to_char(now(), 'YYYYMMDDHH24MISS') ||
            '-' ||
            upper(substr(replace(new.id::text, '-', ''), 1, 4));

    end if;

    return new;

end;
$$;


drop trigger if exists transactions_code_trigger
on public.transactions;

create trigger transactions_code_trigger

before insert on public.transactions

for each row

execute function public.generate_transaction_code();


-- ============================================================
-- 24. RECEIPT NUMBER
-- ============================================================

create or replace function public.generate_receipt_number()
returns trigger
language plpgsql
as $$
begin

    if new.receipt_number is null then

        new.receipt_number :=
            'RCPT-' ||
            to_char(now(), 'YYYYMMDDHH24MISS') ||
            '-' ||
            upper(substr(replace(new.id::text, '-', ''), 1, 4));

    end if;

    return new;

end;
$$;


drop trigger if exists receipts_number_trigger
on public.receipts;

create trigger receipts_number_trigger

before insert on public.receipts

for each row

execute function public.generate_receipt_number();


-- ============================================================
-- 25. APPLICATION REMAINING BALANCE
-- ============================================================

create or replace function public.calculate_application_balance()
returns trigger
language plpgsql
as $$
begin

    new.remaining_amount :=
        greatest(
            coalesce(new.total_fee, 0)
            -
            coalesce(new.paid_amount, 0),
            0
        );

    return new;

end;
$$;


drop trigger if exists application_balance_trigger
on public.applications;

create trigger application_balance_trigger

before insert or update
on public.applications

for each row

execute function public.calculate_application_balance();


-- ============================================================
-- 26. ROLE FUNCTION
-- ============================================================

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


-- ============================================================
-- 27. ADMIN CHECK
-- ============================================================

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


-- ============================================================
-- 28. MANAGER CHECK
-- ============================================================

create or replace function public.is_manager_or_admin()
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

        and role in (
            'SUPER ADMIN',
            'MANAGER'
        )

        and is_active = true

    );

$$;


-- ============================================================
-- 29. FINANCE ACCESS
-- ============================================================

create or replace function public.can_access_finance()
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

        and role in (
            'SUPER ADMIN',
            'MANAGER',
            'FINANCE'
        )

        and is_active = true

    );

$$;


-- ============================================================
-- 30. ENABLE RLS
-- ============================================================

alter table public.profiles enable row level security;

alter table public.teams enable row level security;

alter table public.countries enable row level security;

alter table public.visa_services enable row level security;

alter table public.customers enable row level security;

alter table public.leads enable row level security;

alter table public.applications enable row level security;

alter table public.documents enable row level security;

alter table public.transactions enable row level security;

alter table public.receipts enable row level security;

alter table public.expenses enable row level security;

alter table public.follow_ups enable row level security;

alter table public.whatsapp_messages enable row level security;

alter table public.audit_logs enable row level security;

alter table public.country_information enable row level security;

alter table public.application_notes enable row level security;


-- ============================================================
-- 31. PROFILES POLICIES
-- ============================================================

drop policy if exists profiles_select
on public.profiles;

create policy profiles_select

on public.profiles

for select

to authenticated

using (
    auth.uid() = id
    or public.is_manager_or_admin()
);


drop policy if exists profiles_update
on public.profiles;

create policy profiles_update

on public.profiles

for update

to authenticated

using (
    auth.uid() = id
    or public.is_admin()
);

    
drop policy if exists profiles_admin_insert
on public.profiles;

create policy profiles_admin_insert

on public.profiles

for insert

to authenticated

with check (
    public.is_admin()
);


-- ============================================================
-- 32. COUNTRY POLICIES
-- ============================================================

drop policy if exists countries_authenticated_read
on public.countries;

create policy countries_authenticated_read

on public.countries

for select

to authenticated

using (true);


drop policy if exists countries_admin_write
on public.countries;

create policy countries_admin_write

on public.countries

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


-- ============================================================
-- 33. VISA SERVICE POLICIES
-- ============================================================

drop policy if exists visa_services_read
on public.visa_services;

create policy visa_services_read

on public.visa_services

for select

to authenticated

using (true);


drop policy if exists visa_services_admin_write
on public.visa_services;

create policy visa_services_admin_write

on public.visa_services

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


-- ============================================================
-- 34. CUSTOMER POLICIES
-- ============================================================

drop policy if exists customers_read
on public.customers;

create policy customers_read

on public.customers

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


drop policy if exists customers_insert
on public.customers;

create policy customers_insert

on public.customers

for insert

to authenticated

with check (
    auth.uid() is not null
);


drop policy if exists customers_update
on public.customers;

create policy customers_update

on public.customers

for update

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
)

with check (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


-- ============================================================
-- 35. LEADS POLICIES
-- ============================================================

drop policy if exists leads_read
on public.leads;

create policy leads_read

on public.leads

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


drop policy if exists leads_insert
on public.leads;

create policy leads_insert

on public.leads

for insert

to authenticated

with check (
    auth.uid() is not null
);


drop policy if exists leads_update
on public.leads;

create policy leads_update

on public.leads

for update

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
)

with check (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


-- ============================================================
-- 36. APPLICATION POLICIES
-- ============================================================

drop policy if exists applications_read
on public.applications;

create policy applications_read

on public.applications

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


drop policy if exists applications_insert
on public.applications;

create policy applications_insert

on public.applications

for insert

to authenticated

with check (
    auth.uid() is not null
);


drop policy if exists applications_update
on public.applications;

create policy applications_update

on public.applications

for update

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
)

with check (
    public.is_manager_or_admin()

    or

    assigned_staff_id = auth.uid()
);


-- ============================================================
-- 37. DOCUMENT POLICIES
-- ============================================================

drop policy if exists documents_read
on public.documents;

create policy documents_read

on public.documents

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    uploaded_by = auth.uid()
);


drop policy if exists documents_insert
on public.documents;

create policy documents_insert

on public.documents

for insert

to authenticated

with check (
    auth.uid() is not null
);


drop policy if exists documents_update
on public.documents;

create policy documents_update

on public.documents

for update

to authenticated

using (
    public.is_manager_or_admin()

    or

    uploaded_by = auth.uid()
);


-- ============================================================
-- 38. FINANCE POLICIES
-- ============================================================

drop policy if exists transactions_finance_read
on public.transactions;

create policy transactions_finance_read

on public.transactions

for select

to authenticated

using (
    public.can_access_finance()
);


drop policy if exists transactions_finance_insert
on public.transactions;

create policy transactions_finance_insert

on public.transactions

for insert

to authenticated

with check (
    public.can_access_finance()
);


drop policy if exists transactions_finance_update
on public.transactions;

create policy transactions_finance_update

on public.transactions

for update

to authenticated

using (
    public.can_access_finance()
)

with check (
    public.can_access_finance()
);


-- ============================================================
-- 39. RECEIPT POLICIES
-- ============================================================

drop policy if exists receipts_finance_read
on public.receipts;

create policy receipts_finance_read

on public.receipts

for select

to authenticated

using (
    public.can_access_finance()
);


drop policy if exists receipts_finance_insert
on public.receipts;

create policy receipts_finance_insert

on public.receipts

for insert

to authenticated

with check (
    public.can_access_finance()
);


-- ============================================================
-- 40. EXPENSE POLICIES
-- ============================================================

drop policy if exists expenses_finance_access
on public.expenses;

create policy expenses_finance_access

on public.expenses

for all

to authenticated

using (
    public.can_access_finance()
)

with check (
    public.can_access_finance()
);


-- ============================================================
-- 41. FOLLOW-UP POLICIES
-- ============================================================

drop policy if exists followups_read
on public.follow_ups;

create policy followups_read

on public.follow_ups

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_to = auth.uid()
);


drop policy if exists followups_insert
on public.follow_ups;

create policy followups_insert

on public.follow_ups

for insert

to authenticated

with check (
    auth.uid() is not null
);


drop policy if exists followups_update
on public.follow_ups;

create policy followups_update

on public.follow_ups

for update

to authenticated

using (
    public.is_manager_or_admin()

    or

    assigned_to = auth.uid()
);


-- ============================================================
-- 42. COUNTRY INFORMATION POLICIES
-- ============================================================

drop policy if exists country_information_read
on public.country_information;

create policy country_information_read

on public.country_information

for select

to authenticated

using (true);


drop policy if exists country_information_admin_write
on public.country_information;

create policy country_information_admin_write

on public.country_information

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);


-- ============================================================
-- 43. APPLICATION NOTES
-- ============================================================

drop policy if exists application_notes_read
on public.application_notes;

create policy application_notes_read

on public.application_notes

for select

to authenticated

using (
    public.is_manager_or_admin()

    or

    user_id = auth.uid()
);


drop policy if exists application_notes_insert
on public.application_notes;

create policy application_notes_insert

on public.application_notes

for insert

to authenticated

with check (
    auth.uid() is not null
);


-- ============================================================
-- 44. AUDIT LOGS
-- ============================================================

drop policy if exists audit_logs_admin_read
on public.audit_logs;

create policy audit_logs_admin_read

on public.audit_logs

for select

to authenticated

using (
    public.is_admin()
);


-- ============================================================
-- 45. DEFAULT COUNTRIES
-- ============================================================

insert into public.countries
    (country_name, country_code, flag_emoji, continent, currency)
values

    ('United Kingdom', 'GB', '🇬🇧', 'Europe', 'GBP'),

    ('United States', 'US', '🇺🇸', 'North America', 'USD'),

    ('Canada', 'CA', '🇨🇦', 'North America', 'CAD'),

    ('Australia', 'AU', '🇦🇺', 'Oceania', 'AUD'),

    ('New Zealand', 'NZ', '🇳🇿', 'Oceania', 'NZD'),

    ('Germany', 'DE', '🇩🇪', 'Europe', 'EUR'),

    ('France', 'FR', '🇫🇷', 'Europe', 'EUR'),

    ('Italy', 'IT', '🇮🇹', 'Europe', 'EUR'),

    ('Spain', 'ES', '🇪🇸', 'Europe', 'EUR'),

    ('Netherlands', 'NL', '🇳🇱', 'Europe', 'EUR'),

    ('Ireland', 'IE', '🇮🇪', 'Europe', 'EUR'),

    ('Sweden', 'SE', '🇸🇪', 'Europe', 'SEK'),

    ('Norway', 'NO', '🇳🇴', 'Europe', 'NOK'),

    ('Denmark', 'DK', '🇩🇰', 'Europe', 'DKK'),

    ('Finland', 'FI', '🇫🇮', 'Europe', 'EUR'),

    ('Poland', 'PL', '🇵🇱', 'Europe', 'PLN'),

    ('Portugal', 'PT', '🇵🇹', 'Europe', 'EUR'),

    ('Switzerland', 'CH', '🇨🇭', 'Europe', 'CHF'),

    ('Austria', 'AT', '🇦🇹', 'Europe', 'EUR'),

    ('Belgium', 'BE', '🇧🇪', 'Europe', 'EUR'),

    ('United Arab Emirates', 'AE', '🇦🇪', 'Asia', 'AED'),

    ('Saudi Arabia', 'SA', '🇸🇦', 'Asia', 'SAR'),

    ('Qatar', 'QA', '🇶🇦', 'Asia', 'QAR'),

    ('Oman', 'OM', '🇴🇲', 'Asia', 'OMR'),

    ('Turkey', 'TR', '🇹🇷', 'Asia', 'TRY'),

    ('Malaysia', 'MY', '🇲🇾', 'Asia', 'MYR'),

    ('China', 'CN', '🇨🇳', 'Asia', 'CNY'),

    ('Japan', 'JP', '🇯🇵', 'Asia', 'JPY'),

    ('South Korea', 'KR', '🇰🇷', 'Asia', 'KRW'),

    ('Singapore', 'SG', '🇸🇬', 'Asia', 'SGD'),

    ('Pakistan', 'PK', '🇵🇰', 'Asia', 'PKR')

on conflict (country_name)

do nothing;


-- ============================================================
-- END OF POLARIS DATABASE SCHEMA
-- ============================================================
