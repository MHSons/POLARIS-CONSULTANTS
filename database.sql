-- ========================================================
-- POLARIS CONSULTANTS
-- DATABASE STRUCTURE
-- ========================================================


-- ========================================================
-- CUSTOMERS TABLE
-- ========================================================

create table if not exists customers (

    id uuid
        default gen_random_uuid()
        primary key,

    full_name text
        not null,

    cnic text,

    passport_number text,

    phone text,

    whatsapp_number text,

    email text,

    date_of_birth date,

    gender text,

    nationality text,

    city text,

    address text,

    created_at timestamptz
        default now()

);


-- ========================================================
-- LEADS TABLE
-- ========================================================

create table if not exists leads (

    id uuid
        default gen_random_uuid()
        primary key,

    customer_id uuid
        references customers(id)
        on delete set null,

    country text,

    visa_type text,

    source text,

    status text
        default 'New',

    assigned_team text,

    assigned_staff text,

    notes text,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


-- ========================================================
-- APPLICATIONS TABLE
-- ========================================================

create table if not exists applications (

    id uuid
        default gen_random_uuid()
        primary key,

    customer_id uuid
        references customers(id)
        on delete set null,

    lead_id uuid
        references leads(id)
        on delete set null,

    full_name text
        not null,

    cnic text,

    passport_number text,

    passport_expiry date,

    date_of_birth date,

    gender text,

    nationality text,

    phone text,

    whatsapp_number text,

    email text,

    city text,

    address text,

    country text
        not null,

    visa_type text
        not null,

    course_name text,

    university_name text,

    intake text,

    employer_name text,

    job_title text,

    visit_purpose text,

    source text,

    notes text,

    status text
        default 'New',

    assigned_team text,

    assigned_staff text,

    created_at timestamptz
        default now(),

    updated_at timestamptz
        default now()

);


-- ========================================================
-- FINANCIAL TRANSACTIONS
-- ========================================================

create table if not exists transactions (

    id uuid
        default gen_random_uuid()
        primary key,

    customer_id uuid
        references customers(id)
        on delete set null,

    application_id uuid
        references applications(id)
        on delete set null,

    transaction_type text
        not null,

    amount numeric(14,2)
        not null,

    currency text
        default 'PKR',

    payment_method text,

    description text,

    received_from text,

    paid_to text,

    transaction_date date
        default current_date,

    created_by text,

    created_at timestamptz
        default now()

);


-- ========================================================
-- PAYMENT SLIPS
-- ========================================================

create table if not exists payment_slips (

    id uuid
        default gen_random_uuid()
        primary key,

    transaction_id uuid
        references transactions(id)
        on delete cascade,

    slip_number text
        unique
        not null,

    qr_value text,

    created_at timestamptz
        default now()

);


-- ========================================================
-- TEAMS
-- ========================================================

create table if not exists teams (

    id uuid
        default gen_random_uuid()
        primary key,

    team_name text
        unique
        not null,

    team_leader text,

    status text
        default 'Active',

    created_at timestamptz
        default now()

);


-- ========================================================
-- STAFF
-- ========================================================

create table if not exists staff (

    id uuid
        default gen_random_uuid()
        primary key,

    full_name text
        not null,

    email text,

    phone text,

    role text,

    team_id uuid
        references teams(id)
        on delete set null,

    status text
        default 'Active',

    created_at timestamptz
        default now()

);


-- ========================================================
-- VISA COUNTRIES
-- ========================================================

create table if not exists visa_countries (

    id uuid
        default gen_random_uuid()
        primary key,

    country_name text
        unique
        not null,

    country_code text,

    study_visa boolean
        default true,

    work_visa boolean
        default true,

    visit_visa boolean
        default true,

    description text,

    requirements text,

    processing_time text,

    created_at timestamptz
        default now()

);
