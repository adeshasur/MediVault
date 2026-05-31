insert into medicines (medicine_name, generic_name, brand_name, category, strength, dosage_form, price, quantity, expiry_date, manufacturer) values
('Panadol', 'Paracetamol', 'Panadol', 'Pain Relief', '500mg', 'Tablet', 12.00, 250, '2027-03-10', 'GSK'),
('Piriton', 'Chlorpheniramine', 'Piriton', 'Allergy', '4mg', 'Tablet', 8.00, 180, '2026-11-20', 'GSK'),
('Amoxil', 'Amoxicillin', 'Amoxil', 'Antibiotic', '500mg', 'Capsule', 35.00, 90, '2026-09-15', 'GSK'),
('Augmentin', 'Amoxicillin Clavulanate', 'Augmentin', 'Antibiotic', '625mg', 'Tablet', 95.00, 60, '2026-12-01', 'GSK'),
('Cetirizine', 'Cetirizine', 'Cetirizine', 'Allergy', '10mg', 'Tablet', 18.00, 120, '2027-01-05', 'Generic Pharma'),
('Pantoprazole', 'Pantoprazole', 'Pan 40', 'Gastric', '40mg', 'Tablet', 35.00, 8, '2026-08-30', 'Alkem'),
('Atorvastatin', 'Atorvastatin', 'Atorva', 'Cholesterol', '10mg', 'Tablet', 32.00, 0, '2026-07-14', 'Zydus'),
('Azithromycin', 'Azithromycin', 'Azee', 'Antibiotic', '500mg', 'Tablet', 120.00, 4, '2026-06-15', 'Cipla');

insert into pharmacy_settings (pharmacy_name, phone, address, low_stock_threshold, near_expiry_days)
values ('MediCare Pharmacy', '+94 11 234 5678', '42 Galle Road, Colombo 03', 10, 120);
