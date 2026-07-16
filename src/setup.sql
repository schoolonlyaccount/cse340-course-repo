-- Create the Organization Table
CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

-- Inserting into the Organization Table
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
	'BrightFuture Builders',
	'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
	'info@brightfuturebuilders.org',
	'brightfuture-logo.png'
),
(
	'GreenHarvest Growers',
	'An urban farming collective promoting food sustainability and education in local neighborhoods.',
	'contact@greenharvest.org',
	'greenharvest-logo.png'
),
(
	'UnityServe Volunteers',
	'A volunteer coordination group supporting local charities and service initiatives.',
	'hello@unityserve.org',
	'unityserve-logo.png'
);

-- Verify the data insertion for the Organization Table
SELECT * FROM organization;


-- Create the Service Project Table
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Inserting into the Service Project Table
INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
	-- BrightFuture Builders
	(1, 'Park Cleanup', 'Join volunteers to clean and beautify the local park.', 'Central City Park', '2026-08-15'),
	(1, 'Playground Restoration', 'Repair and repaint playground equipment.', 'Lincoln Elementary', '2026-08-22'),
	(1, 'Community Center Renovation', 'Help renovate the local community center.', 'Downtown Community Center', '2026-09-05'),
	(1, 'Neighborhood Beautification', 'Plant flowers and improve public spaces.', 'Maple Street', '2026-09-19'),
	(1, 'Accessibility Ramp Build', 'Build wheelchair ramps for community facilities.', 'Westside Recreation Center', '2026-10-03'),
	
	-- GreenHarvest Growers
	(2, 'Community Garden Planting', 'Plant vegetables and flowers in the community garden.', 'Greenwood Garden', '2026-08-16'),
	(2, 'Food Drive', 'Collect and distribute food to local families.', 'Community Food Bank', '2026-08-30'),
	(2, 'Urban Farming Workshop', 'Teach residents about sustainable gardening.', 'City Greenhouse', '2026-09-12'),
	(2, 'Tree Planting Day', 'Plant trees throughout the neighborhood.', 'River Park', '2026-09-26'),
	(2, 'Farmers Market Volunteer', 'Help organize the weekly farmers market.', 'Town Square', '2026-10-10'),
	
	-- UnityServe Volunteers
	(3, 'Community Tutoring', 'Tutor students in math, reading, and science.', 'Public Library', '2026-08-20'),
	(3, 'Senior Center Visit', 'Spend time with seniors through games and conversation.', 'Sunrise Senior Center', '2026-09-03'),
	(3, 'Health Fair Assistance', 'Assist with community health screenings.', 'Civic Center', '2026-09-17'),
	(3, 'School Supply Drive', 'Collect backpacks and school supplies for students.', 'City Hall', '2026-10-01'),
	(3, 'Holiday Meal Packaging', 'Prepare meal packages for families in need.', 'Community Outreach Center', '2026-10-15');

-- Verify the data insertion for the Service Project Table
SELECT * FROM service_project;