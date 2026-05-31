# User Guide

## Demo Access

Open `/login` and enter the temporary staff account:

```text
Username: admin
Password: MediVault@2026
```

Staff pages redirect to `/login` until a valid staff session exists. The demo
uses browser session storage until Supabase Auth is connected.

## Inventory

Open `/medicines` to search, filter, add, and remove inventory records. New demo
records persist in browser storage. Use the pencil action to edit a record.
Deleting a medicine asks for confirmation first. Category and stock-level filters
can be combined to find records that need attention.

## Prescription Checker

Open `/checker` to type prescription text or upload an image. Tesseract.js
extracts image text in the browser. Review the editable text and choose **Check
availability** to see matching inventory records.

## Customer Phone Scan

Open `/scan` on a phone to take a prescription photo or enter medicine names.
After checking availability, customers can review stock quantities, prices,
requested quantities, line totals, and the estimated prescription total. Use the
reset button before checking a new prescription.

## Reports

Open `/reports` to review low-stock, out-of-stock, and near-expiry records.

## Settings

Open `/settings` to update the pharmacy profile and alert thresholds. The demo
form checks that the pharmacy name is present and that alert thresholds are
positive numbers.

## Safety

MediVault checks inventory availability only. Staff must manually verify medicine
names before dispensing. The app does not provide medical advice.
