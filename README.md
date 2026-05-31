# MediVault

**Web-Based Smart Pharmacy Inventory & Prescription Availability Checker**

Check medicine availability from prescriptions instantly.

MediVault is a responsive web application for pharmacy staff to manage medicine
inventory and check whether medicines mentioned in prescription text or images
are available in stock.

## Overview

Pharmacy staff often need to check prescriptions manually. This can take time
when medicine names are unclear or written using different brand names, generic
names, and strengths. MediVault keeps medicine records in a searchable digital
inventory and checks prescription text against those records.

MediVault is an inventory availability checker. It is not a billing, payment, or
point-of-sale system.

## Features

- Medicine inventory management
- Add, edit, delete, search, and filter medicines
- Dashboard with stock and expiry summaries
- Manual prescription text checker
- Prescription image upload
- OCR-based text extraction with editable results
- Public phone-friendly prescription scanner with price totals
- Exact and possible medicine match suggestions
- Medicine availability, price, and quantity display
- Low-stock, near-expiry, expired, and out-of-stock reports
- Admin and staff authentication
- Responsive interface for desktop and mobile devices

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Tesseract.js
- Vercel

## Modules

### Medicine Inventory

Manage medicine records including medicine name, generic name, brand name,
strength, dosage form, price, quantity, expiry date, category, and manufacturer.

### Prescription Checker

Enter prescription text manually or upload a prescription image. OCR text can be
reviewed and edited before checking availability.

### Smart Matching

Compare prescription text with medicine, generic, and brand names. Show exact
matches first and possible matches for unclear text.

### Dashboard and Reports

Display inventory summaries and status reports for low-stock, near-expiry,
expired, and out-of-stock medicines.

## Safety Notice

MediVault does not provide medical advice. OCR and medicine matching results may
contain errors. Pharmacy staff must verify medicine names manually before
dispensing.

## Documentation

- [Project Proposal](docs/project-proposal.md)
- [Roadmap](docs/roadmap.md)
- [System Architecture](docs/system-architecture.md)
- [Deployment Guide](docs/deployment-guide.md)

## Development Status

The polished demo application is complete. It uses seeded browser-local data so
the UI can be explored immediately and includes a Supabase schema for connecting
the production database.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Supabase credentials are optional for the demo UI.
Apply `supabase/schema.sql` and `supabase/seed.sql` when connecting a Supabase
project.

Temporary staff login:

```text
Username: admin
Password: MediVault@2026
```

Customers can open `http://localhost:3000/scan` from a phone to upload a
prescription, review detected medicines, adjust requested quantities, and view
the estimated total.

## License

This project is licensed under the [MIT License](LICENSE).
