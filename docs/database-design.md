# Database Design

MediVault uses Supabase PostgreSQL. Apply [`supabase/schema.sql`](../supabase/schema.sql)
first, then load [`supabase/seed.sql`](../supabase/seed.sql) for demo records.

## Tables

- `profiles`: staff identity and role
- `medicines`: inventory records with stock, price, and expiry information
- `prescription_scans`: uploaded image metadata and extracted OCR text
- `scan_results`: medicine matches produced from a prescription scan
- `pharmacy_settings`: pharmacy details and stock alert thresholds

Row-level security is enabled in the schema. Authenticated staff can manage
inventory records and users can access their own prescription scans.
