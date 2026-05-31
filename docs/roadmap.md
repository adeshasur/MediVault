# MediVault Roadmap

## Phase 1: Project Reset and Documentation

- Confirm the web application scope
- Replace the previous implementation plan
- Add project documentation
- Add repository defaults and license

## Phase 2: Next.js Setup

- Initialize Next.js
- Configure Tailwind CSS
- Create the base application layout
- Add reusable navigation components

## Phase 3: Supabase Setup

- Create the Supabase project
- Add database tables and seed data
- Configure environment variables
- Connect the application to Supabase

## Phase 4: Inventory Management

- Add the medicine list page
- Add medicine creation and editing forms
- Add medicine deletion
- Add search and filters
- Add stock and expiry status indicators

## Phase 5: Dashboard

- Show total medicine count
- Show available and out-of-stock counts
- Show low-stock count
- Show near-expiry count
- Show recent records

## Phase 6: Manual Prescription Checker

- Add an editable prescription text area
- Extract possible medicine names
- Match names against inventory
- Display exact and possible matches

## Phase 7: OCR Scanner

- Add prescription image upload
- Show image previews
- Extract text using Tesseract.js
- Allow staff to review OCR text before matching

## Phase 8: Reports

- Add low-stock report
- Add near-expiry and expired medicine reports
- Add out-of-stock report

## Phase 9: Authentication

- Add Supabase Auth
- Add admin and staff roles
- Protect dashboard pages
- Add logout

## Phase 10: Deployment

- Create a Vercel project
- Add environment variables
- Deploy and test the live application

## Phase 11: Final Documentation

- Add screenshots
- Add user guide
- Document limitations and future improvements
