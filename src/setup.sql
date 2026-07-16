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

-- --------------------------------

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

-- --------------------------------

-- Create Service Project Category Table
CREATE TABLE service_project_category (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(150) UNIQUE NOT NULL
);

-- Inserting into the Service Project Category Table
INSERT INTO service_project_category (name)
VALUES
    ('Environment'),
    ('Education'),
    ('Community Outreach'),
    ('Construction'),
    ('Food Assistance');

-- Verify the data insertion for the Service Project Category Table
SELECT * FROM service_project_category;

-- --------------------------------

-- Create Service Project Has Category Table (Many-to-many Junction)
CREATE TABLE service_project_has_category (
	project_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (project_id, category_id),
	FOREIGN KEY (project_id)
		REFERENCES service_project(project_id)
		ON DELETE CASCADE,
	FOREIGN KEY (category_id)
		REFERENCES service_project_category(category_id)
		ON DELETE CASCADE
);

-- Inserting into the Service Project Has Category Table (Many-to-many Junction)
INSERT INTO service_project_has_category (project_id, category_id)
VALUES
    -- BrightFuture Builders
    (1, 1),  -- Park Cleanup -> Environment
    (1, 3),  -- Park Cleanup -> Community Outreach

    (2, 4),  -- Playground Restoration -> Construction
    (2, 3),  -- Playground Restoration -> Community Outreach

    (3, 4),  -- Community Center Renovation -> Construction
    (3, 3),  -- Community Center Renovation -> Community Outreach

    (4, 1),  -- Neighborhood Beautification -> Environment
    (4, 3),  -- Neighborhood Beautification -> Community Outreach

    (5, 4),  -- Accessibility Ramp Build -> Construction
    (5, 3),  -- Accessibility Ramp Build -> Community Outreach

    -- GreenHarvest Growers
    (6, 1),  -- Community Garden Planting -> Environment
    (6, 3),  -- Community Garden Planting -> Community Outreach
    (6, 2),  -- Community Garden Planting -> Education

    (7, 5),  -- Food Drive -> Food Assistance
    (7, 3),  -- Food Drive -> Community Outreach

    (8, 2),  -- Urban Farming Workshop -> Education
    (8, 1),  -- Urban Farming Workshop -> Environment

    (9, 1),  -- Tree Planting Day -> Environment
    (9, 3),  -- Tree Planting Day -> Community Outreach

    (10, 3), -- Farmers Market Volunteer -> Community Outreach
    (10, 5), -- Farmers Market Volunteer -> Food Assistance

    -- UnityServe Volunteers
    (11, 2), -- Community Tutoring -> Education
    (11, 3), -- Community Tutoring -> Community Outreach

    (12, 3), -- Senior Center Visit -> Community Outreach

    (13, 3), -- Health Fair Assistance -> Community Outreach
    (13, 2), -- Health Fair Assistance -> Education

    (14, 5), -- School Supply Drive -> Food Assistance
    (14, 3), -- School Supply Drive -> Community Outreach

    (15, 5), -- Holiday Meal Packaging -> Food Assistance
    (15, 3); -- Holiday Meal Packaging -> Community Outreach

-- Verify the data insertion for the Service Project Has Category Table
SELECT * FROM service_project_has_category;