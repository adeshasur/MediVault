# System Architecture

## Architecture Type

MediVault uses a modern web application architecture based on Next.js and
Supabase.

## Main Components

### Frontend

Next.js, React, and Tailwind CSS provide the responsive user interface for the
landing page, dashboard, inventory, prescription checker, reports, and settings.

### Backend and Database

Supabase provides the PostgreSQL database, authentication, and file storage.
Medicine records, prescription scans, match results, user profiles, and pharmacy
settings are stored in Supabase.

### OCR

Tesseract.js extracts text from uploaded prescription images in the browser. The
extracted text remains editable so staff can correct OCR errors before checking
inventory.

### Hosting

Vercel hosts the Next.js application and supports deployment from the GitHub
repository. Supabase hosts the backend services.

## Application Flow

1. A staff member logs in.
2. The staff member manages or searches medicine inventory.
3. The staff member enters prescription text or uploads an image.
4. Tesseract.js extracts editable text from an uploaded image when needed.
5. The matching utility compares text against medicine, generic, and brand names.
6. The application displays availability, price, quantity, and possible matches.
7. The staff member verifies medicine names manually before dispensing.

## Planned Database Tables

- `profiles`
- `medicines`
- `prescription_scans`
- `scan_results`
- `pharmacy_settings`

## Deployment Flow

1. Code is pushed to GitHub.
2. Vercel detects the change and builds the Next.js application.
3. Vercel deploys the frontend.
4. Supabase provides database, authentication, and storage services.
