-- Create the iphones table
CREATE TABLE iphones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  colors TEXT NOT NULL,
  display TEXT NOT NULL,
  chip VARCHAR(100) NOT NULL,
  camera TEXT NOT NULL,
  battery TEXT NOT NULL,
  features TEXT NOT NULL,
  release_year INTEGER NOT NULL,
  storage_options TEXT NOT NULL,
  water_resistance VARCHAR(100),
  dimensions VARCHAR(100) NOT NULL,
  weight NUMERIC(6, 2) NOT NULL,
  series VARCHAR(50) NOT NULL
);

-- Insert iPhone data
INSERT INTO iphones (name, image_url, price, colors, display, chip, camera, battery, features, release_year, storage_options, water_resistance, dimensions, weight, series) VALUES
-- iPhone 15 Series
('iPhone 15 Pro Max', '/placeholder.svg?height=400&width=200', 1199.00, 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium', '6.7-inch Super Retina XDR display with ProMotion and Always-On', 'A17 Pro chip', 'Pro camera system (48MP Main, Ultra Wide, 5x Telephoto)', 'Up to 29 hours video playback', 'Dynamic Island, USB-C connector with USB 3, Action button, Titanium design', 2023, '256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '159.9 x 76.7 x 8.25 mm', 221.00, 'iPhone 15'),

('iPhone 15 Pro', '/placeholder.svg?height=400&width=200', 999.00, 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium', '6.1-inch Super Retina XDR display with ProMotion and Always-On', 'A17 Pro chip', 'Pro camera system (48MP Main, Ultra Wide, Telephoto)', 'Up to 23 hours video playback', 'Dynamic Island, USB-C connector with USB 3, Action button, Titanium design', 2023, '128GB, 256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '146.6 x 70.6 x 8.25 mm', 187.00, 'iPhone 15'),

('iPhone 15 Plus', '/placeholder.svg?height=400&width=200', 899.00, 'Black, Blue, Green, Yellow, Pink', '6.7-inch Super Retina XDR display', 'A16 Bionic chip', 'Dual-camera system (48MP Main, Ultra Wide)', 'Up to 26 hours video playback', 'Dynamic Island, USB-C connector, Emergency SOS', 2023, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '160.9 x 77.8 x 7.80 mm', 201.00, 'iPhone 15'),

('iPhone 15', '/placeholder.svg?height=400&width=200', 799.00, 'Black, Blue, Green, Yellow, Pink', '6.1-inch Super Retina XDR display', 'A16 Bionic chip', 'Dual-camera system (48MP Main, Ultra Wide)', 'Up to 20 hours video playback', 'Dynamic Island, USB-C connector, Emergency SOS', 2023, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '147.6 x 71.6 x 7.80 mm', 171.00, 'iPhone 15'),

-- iPhone 14 Series
('iPhone 14 Pro Max', '/placeholder.svg?height=400&width=200', 1099.00, 'Deep Purple, Gold, Silver, Space Black', '6.7-inch Super Retina XDR display with ProMotion and Always-On', 'A16 Bionic chip', 'Pro camera system (48MP Main, Ultra Wide, Telephoto)', 'Up to 29 hours video playback', 'Dynamic Island, Emergency SOS, Crash Detection', 2022, '128GB, 256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '160.7 x 77.6 x 7.85 mm', 240.00, 'iPhone 14'),

('iPhone 14 Pro', '/placeholder.svg?height=400&width=200', 999.00, 'Deep Purple, Gold, Silver, Space Black', '6.1-inch Super Retina XDR display with ProMotion and Always-On', 'A16 Bionic chip', 'Pro camera system (48MP Main, Ultra Wide, Telephoto)', 'Up to 23 hours video playback', 'Dynamic Island, Emergency SOS, Crash Detection', 2022, '128GB, 256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '147.5 x 71.5 x 7.85 mm', 206.00, 'iPhone 14'),

('iPhone 14 Plus', '/placeholder.svg?height=400&width=200', 899.00, 'Blue, Purple, Yellow, Midnight, Starlight, PRODUCT(RED)', '6.7-inch Super Retina XDR display', 'A15 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 26 hours video playback', 'Emergency SOS, Crash Detection, Lightning connector', 2022, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '160.8 x 78.1 x 7.80 mm', 203.00, 'iPhone 14'),

('iPhone 14', '/placeholder.svg?height=400&width=200', 799.00, 'Blue, Purple, Yellow, Midnight, Starlight, PRODUCT(RED)', '6.1-inch Super Retina XDR display', 'A15 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 20 hours video playback', 'Emergency SOS, Crash Detection, Lightning connector', 2022, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '146.7 x 71.5 x 7.80 mm', 172.00, 'iPhone 14'),

-- iPhone 13 Series
('iPhone 13 Pro Max', '/placeholder.svg?height=400&width=200', 1099.00, 'Graphite, Gold, Silver, Sierra Blue', '6.7-inch Super Retina XDR display with ProMotion', 'A15 Bionic chip', 'Pro camera system (12MP Main, Ultra Wide, Telephoto)', 'Up to 28 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2021, '128GB, 256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '160.8 x 78.1 x 7.65 mm', 238.00, 'iPhone 13'),

('iPhone 13 Pro', '/placeholder.svg?height=400&width=200', 999.00, 'Graphite, Gold, Silver, Sierra Blue', '6.1-inch Super Retina XDR display with ProMotion', 'A15 Bionic chip', 'Pro camera system (12MP Main, Ultra Wide, Telephoto)', 'Up to 22 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2021, '128GB, 256GB, 512GB, 1TB', 'IP68 (6 meters for up to 30 minutes)', '146.7 x 71.5 x 7.65 mm', 203.00, 'iPhone 13'),

('iPhone 13', '/placeholder.svg?height=400&width=200', 799.00, 'Pink, Blue, Midnight, Starlight, PRODUCT(RED)', '6.1-inch Super Retina XDR display', 'A15 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 19 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2021, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '146.7 x 71.5 x 7.65 mm', 173.00, 'iPhone 13'),

('iPhone 13 mini', '/placeholder.svg?height=400&width=200', 699.00, 'Pink, Blue, Midnight, Starlight, PRODUCT(RED)', '5.4-inch Super Retina XDR display', 'A15 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 17 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2021, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '131.5 x 64.2 x 7.65 mm', 140.00, 'iPhone 13'),

-- iPhone SE
('iPhone SE (3rd generation)', '/placeholder.svg?height=400&width=200', 429.00, 'Midnight, Starlight, PRODUCT(RED)', '4.7-inch Retina HD display', 'A15 Bionic chip', 'Single 12MP camera', 'Up to 15 hours video playback', 'Touch ID, 5G, Durable glass and aluminum design', 2022, '64GB, 128GB, 256GB', 'IP67 (1 meter for up to 30 minutes)', '138.4 x 67.3 x 7.3 mm', 144.00, 'iPhone SE'),

-- iPhone 12 Series
('iPhone 12 Pro Max', '/placeholder.svg?height=400&width=200', 1099.00, 'Graphite, Gold, Silver, Pacific Blue', '6.7-inch Super Retina XDR display', 'A14 Bionic chip', 'Pro camera system (12MP Main, Ultra Wide, Telephoto)', 'Up to 20 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2020, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '160.8 x 78.1 x 7.4 mm', 226.00, 'iPhone 12'),

('iPhone 12 Pro', '/placeholder.svg?height=400&width=200', 999.00, 'Graphite, Gold, Silver, Pacific Blue', '6.1-inch Super Retina XDR display', 'A14 Bionic chip', 'Pro camera system (12MP Main, Ultra Wide, Telephoto)', 'Up to 17 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2020, '128GB, 256GB, 512GB', 'IP68 (6 meters for up to 30 minutes)', '146.7 x 71.5 x 7.4 mm', 187.00, 'iPhone 12'),

('iPhone 12', '/placeholder.svg?height=400&width=200', 799.00, 'Black, White, PRODUCT(RED), Green, Blue, Purple', '6.1-inch Super Retina XDR display', 'A14 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 17 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2020, '64GB, 128GB, 256GB', 'IP68 (6 meters for up to 30 minutes)', '146.7 x 71.5 x 7.4 mm', 162.00, 'iPhone 12'),

('iPhone 12 mini', '/placeholder.svg?height=400&width=200', 699.00, 'Black, White, PRODUCT(RED), Green, Blue, Purple', '5.4-inch Super Retina XDR display', 'A14 Bionic chip', 'Dual-camera system (12MP Main, Ultra Wide)', 'Up to 15 hours video playback', 'Face ID, MagSafe, Ceramic Shield', 2020, '64GB, 128GB, 256GB', 'IP68 (6 meters for up to 30 minutes)', '131.5 x 64.2 x 7.4 mm', 133.00, 'iPhone 12');

