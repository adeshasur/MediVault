# Supabase Setup

MediVault uses Supabase PostgreSQL as the live inventory source. The deployed
application does not read medicine records from hardcoded frontend arrays.

## 1. Create the Database

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run `supabase/schema.sql`.

The schema allows public read-only access to medicine availability. Authenticated
staff accounts can create, edit, and remove medicine records.

## 2. Import Medicine Inventory

1. Open **Table Editor** and select `medicines`.
2. Choose **Insert** and then **Import data from CSV**.
3. Upload `data/sample-medicines.csv`.
4. Map the CSV headers to the matching database columns.

The CSV contains an expanded starter dataset. Replace or extend it with the
pharmacy's actual stock export for production use.

## 3. Create Staff Accounts

Open **Authentication** > **Users** and create staff accounts with email and
password credentials. Staff use those credentials at `/login`.

## 4. Configure Vercel

Add these variables in the Vercel project settings:

```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Redeploy the application after saving environment variables.
