# Deployment Guide

## Hosting Platform

MediVault is designed for deployment on Vercel with Supabase providing the
database, authentication, and storage services.

## Requirements

- A GitHub repository
- A Vercel account
- A Supabase project
- The required environment variables

## Deployment Steps

### 1. Create a Supabase Project

Create a Supabase project and run the SQL scripts that will be added under the
`supabase/` directory during the database setup phase.

### 2. Configure Environment Variables

Create `.env.local` for local development:

```text
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add the same variables to the Vercel project settings before deployment.

### 3. Push the Application to GitHub

Push the completed application branch to the GitHub repository.

### 4. Create a Vercel Project

1. Sign in to Vercel.
2. Import the MediVault GitHub repository.
3. Confirm the detected Next.js framework settings.
4. Add the Supabase environment variables.
5. Deploy the application.

### 5. Verify the Deployment

- Open the deployed URL
- Test login and logout
- Test medicine inventory management
- Test manual prescription matching
- Test OCR image upload and text extraction
- Test reports
- Check mobile responsiveness

## Notes

- Never commit `.env.local`.
- Apply the Supabase schema before testing database-backed features.
- OCR results must be reviewed manually before dispensing medicine.
