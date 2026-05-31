# User Guide

## Demo Access

Open `/login` and continue with the pre-filled demo account. The demo uses local
browser storage, so it can be explored before a Supabase project is connected.

## Inventory

Open `/medicines` to search, filter, add, and remove inventory records. New demo
records persist in browser storage.

## Prescription Checker

Open `/checker` to type prescription text or upload an image. Tesseract.js
extracts image text in the browser. Review the editable text and choose **Check
availability** to see matching inventory records.

## Customer Phone Scan

Open `/scan` on a phone to take a prescription photo or enter medicine names.
After checking availability, customers can review stock quantities, prices,
requested quantities, line totals, and the estimated prescription total.

## Reports

Open `/reports` to review low-stock, out-of-stock, and near-expiry records.

## Safety

MediVault checks inventory availability only. Staff must manually verify medicine
names before dispensing. The app does not provide medical advice.
