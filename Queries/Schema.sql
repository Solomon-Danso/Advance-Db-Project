-- Geographical Tables
CREATE TABLE Region (
    region_code VARCHAR(2) PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL
);

CREATE TABLE District (
    district_code VARCHAR(10) PRIMARY KEY,
    region_code VARCHAR(2) NOT NULL,
    district_name VARCHAR(50) NOT NULL,
    district_type VARCHAR(20),
    FOREIGN KEY (region_code) REFERENCES Region(region_code)
);

DELIMITER //

CREATE PROCEDURE sp_get_all_district()
    
Begin 
	select * from District; 
END //

DELIMITER //

CREATE PROCEDURE sp_delete_District( IN p_district_code varchar(20))

Begin 
 Delete from District where district_code = p_district_code;
 Delete from SubDistrict where district_code = p_district_code;
 
 end //

CREATE TABLE SubDistrict (
    sub_district_code VARCHAR(10) PRIMARY KEY,
    district_code VARCHAR(10) NOT NULL,
    sub_district_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (district_code) REFERENCES District(district_code)
);

CREATE TABLE Locality (
    locality_code VARCHAR(10) PRIMARY KEY,
    sub_district_code VARCHAR(10) NOT NULL,
    locality_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (sub_district_code) REFERENCES SubDistrict(sub_district_code)
);

CREATE TABLE EnumerationArea (
    ea_code VARCHAR(10) PRIMARY KEY,
    locality_code VARCHAR(10) NOT NULL,
    ea_type VARCHAR(20),
    ea_number VARCHAR(10),
    FOREIGN KEY (locality_code) REFERENCES Locality(locality_code)
);

-- Household Tables
CREATE TABLE Household (
    household_id INT AUTO_INCREMENT PRIMARY KEY,
    ea_code VARCHAR(10) NOT NULL,
    structure_number VARCHAR(20),
    household_number VARCHAR(20),
    type_of_residence ENUM('Occupied', 'Vacant') NOT NULL,
    detailed_address TEXT,
    contact_phone1 VARCHAR(15),
    contact_phone2 VARCHAR(15),
    nhis_ecg_vra_number VARCHAR(20),
    date_started DATE,
    date_completed DATE,
    total_visits INT,
    form_number VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ea_code) REFERENCES EnumerationArea(ea_code)
);



CREATE TABLE HousingCondition (
    housing_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    dwelling_type ENUM('Separate house', 'Semi-detached house', 'Flat/Apartment', 'Compound house', 'Huts/Buildings (same compound)', 'Huts/Buildings (different compounds)', 'Tent', 'Improvised home', 'Living quarters attached to office/shop', 'Uncompleted building', 'Other') NOT NULL,
    outer_wall_material ENUM('Mud bricks/earth', 'Wood', 'Metal sheet/slate/asbestos', 'Stone', 'Burnt bricks', 'Cement blocks/concrete', 'Landcrete', 'Bamboo', 'Palm leaves/Thatch (grass)/Raffia', 'Other') NOT NULL,
    floor_material ENUM('Earth/Mud', 'Cement/Concrete', 'Stone', 'Burnt bricks', 'Wood', 'Vinyl tiles', 'Ceramic/Porcelain/Granite/Marble tiles', 'Terrazzo/Terrazzo tiles', 'Other') NOT NULL,
    roof_material ENUM('Mud/Mud bricks/Earth', 'Wood', 'Metal sheet', 'Slate/Asbestos', 'Cement/Concrete', 'Roofing Tiles', 'Bamboo', 'Thatch/Palm leaves or Raffia', 'Other') NOT NULL,
    tenure_arrangement ENUM('Owner occupied', 'Rent free', 'Perching', 'Squatting', 'Other') NOT NULL,
    ownership_type ENUM('Owned by household member', 'Being purchased', 'Relative not household member', 'Other private individual', 'Private employer', 'Other private agency', 'Public/Government ownership', 'Other') NOT NULL,
    total_rooms INT,
    sleeping_rooms INT,
    shared_sleeping_rooms BOOLEAN,
    households_sharing_sleeping_rooms INT,
    lighting_source ENUM('Electricity (main)', 'Electricity (private generator)', 'Kerosene lamp', 'Gas lamp', 'Solar energy', 'Candle', 'Flashlight/Torch', 'Firewood', 'Crop residue', 'Other') NOT NULL,
    drinking_water_source ENUM('Pipe-borne inside dwelling', 'Pipe-borne outside dwelling', 'Public tap/Standpipe', 'Borehole/Pump/Tube well', 'Protected well', 'Rain water', 'Protected spring', 'Bottled water', 'Sachet water', 'Tanker supply/Vendor provided', 'Unprotected well', 'Unprotected spring', 'River/Stream', 'Dugout/Pond/Lake/Dam/Canal', 'Other') NOT NULL,
    other_water_source ENUM('Pipe-borne inside dwelling', 'Pipe-borne outside dwelling', 'Public tap/Standpipe', 'Borehole/Pump/Tube well', 'Protected well', 'Rain water', 'Protected spring', 'Tanker supply/Vendor provided', 'Unprotected well', 'Unprotected spring', 'River/Stream', 'Dugout/Pond/Lake/Dam/Canal', 'Other') NOT NULL,
    cooking_fuel ENUM('None, no cooking', 'Wood', 'Gas', 'Electricity', 'Kerosene', 'Charcoal', 'Crop residue', 'Saw dust', 'Animal waste', 'Other') NOT NULL,
    cooking_space ENUM('No cooking', 'Separate room for exclusive use of household', 'Separate room shared with other household(s)', 'Enclosure without roof', 'Structure with roof but without walls', 'Bedroom/Hall/Living room', 'Veranda', 'Open space in compound', 'Other') NOT NULL,
    bathing_facility ENUM('Own bathroom for exclusive use', 'Shared separate bathroom in same house', 'Private open cubicle', 'Shared open cubicle', 'Public bath house', 'Bathroom in another house', 'Open space around house', 'In a river, pond, lake or dam', 'Other') NOT NULL,
    toilet_facility ENUM('No facility', 'WC', 'Pit latrine', 'KVIP', 'Bucket/Pan', 'Public toilet', 'Other') NOT NULL,
    shared_toilet BOOLEAN,
    households_sharing_toilet INT,
    solid_waste_disposal ENUM('Collected', 'Burned by household', 'Public dump (Container)', 'Public dump (Open space)', 'Dumped indiscriminately', 'Buried by household', 'Other') NOT NULL,
    liquid_waste_disposal ENUM('Through the sewage system', 'Through drainage system into a gutter', 'Through drainage into a pit (soak away)', 'Thrown onto the street/outside', 'Thrown into gutter', 'Thrown onto compound', 'Other') NOT NULL,
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

-- Person Tables
CREATE TABLE Person (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    relationship_to_head ENUM('Head', 'Spouse', 'Child', 'Parent/Parent in-law', 'Son/Daughter in-law', 'Grandchild', 'Brother/Sister', 'Step child', 'Foster child', 'Other relative', 'Non-relative') NOT NULL,
    sex ENUM('Male', 'Female') NOT NULL,
    date_of_birth DATE,
    age INT,
    nationality ENUM('Ghanaian by birth', 'Dual Nationality', 'Ghanaian by naturalization', 'Nigerian', 'Liberian', 'Sierra Leonean', 'Gambian', 'Togolese', 'Burkinabe', 'Ivorian', 'Other ECOWAS National', 'African, other than ECOWAS', 'European', 'American', 'Asian', 'Oceanian') NOT NULL,
    ethnicity_code VARCHAR(10),
    ethnicity_name VARCHAR(50),
    born_in_locality BOOLEAN,
    birth_region_country_code VARCHAR(10),
    birth_region_country_name VARCHAR(50),
    lived_in_locality_since_birth BOOLEAN,
    years_lived_in_locality INT,
    religion ENUM('No Religion', 'Catholic', 'Protestant', 'Pentecostal/Charismatic', 'Other Christian', 'Islam', 'Ahmadi', 'Traditionalist', 'Other') NOT NULL,
    marital_status ENUM('Never married', 'Informal/consensual union/living together', 'Married', 'Separated', 'Divorced', 'Widowed') NOT NULL,
    present_on_census_night BOOLEAN NOT NULL,
    status ENUM('Usual member present', 'Visitor present', 'Usual member absent') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

CREATE TABLE HouseholdMemberAbsent (
    absent_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    destination_town_village VARCHAR(100),
    destination_region_country_code VARCHAR(10),
    destination_region_country_name VARCHAR(50),
    months_absent INT,
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE Emigrant (
    emigrant_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    relationship_to_head ENUM('Head', 'Spouse', 'Child', 'Parent/Parent in-law', 'Son/Daughter in-law', 'Grandchild', 'Brother/Sister', 'Step child', 'Foster child', 'Other relative', 'Non-relative') NOT NULL,
    sex ENUM('Male', 'Female') NOT NULL,
    age_at_departure INT,
    destination_country_code VARCHAR(10),
    destination_country_name VARCHAR(50),
    year_of_departure INT,
    activity_abroad ENUM('Employed', 'Unemployed', 'Student', 'Other') NOT NULL,
    activity_abroad_other VARCHAR(100),
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

CREATE TABLE Education (
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    literacy_language VARCHAR(50),
    ever_attended_school BOOLEAN,
    highest_level_schooling ENUM('Nursery', 'Kindergarten', 'Primary', 'JSS/JHS', 'Middle', 'SSS/SHS', 'Secondary', 'Voc/technical/commercial', 'Post middle/secondary certificate', 'Post secondary Diploma', 'Bachelor degree', 'Post graduate') NOT NULL,
    highest_grade_completed INT,
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE EconomicActivity (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    engaged_in_activity BOOLEAN,
    engagement_status ENUM('Did not work but had job to go back to', 'Worked before, seeking work and available', 'Seeking work for the first time and available', 'Did voluntary work without pay', 'Did not work and not seeking work') NOT NULL,
    reason_not_seeking_work ENUM('Did home duties', 'In full time education', 'Pensioner/Retiree', 'Disabled/sick to work', 'Too old/too young', 'Other') NOT NULL,
    occupation_code VARCHAR(10),
    occupation_description VARCHAR(100),
    industry_establishment_name VARCHAR(100),
    industry_establishment_location VARCHAR(100),
    industry_product_service VARCHAR(100),
    employment_status ENUM('Employee', 'Self employed without employees', 'Self employed with employees', 'Casual worker', 'Contributing family worker', 'Apprentice', 'Domestic employee', 'Other') NOT NULL,
    employment_sector ENUM('Public (Government)', 'Private Formal', 'Private Informal', 'Semi-Public/Parastatal', 'NGO/Local and International', 'International Organisation') NOT NULL,
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE Disability (
    disability_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    has_disability BOOLEAN NOT NULL,
    sight_disability BOOLEAN,
    hearing_disability BOOLEAN,
    speech_disability BOOLEAN,
    physical_disability BOOLEAN,
    intellectual_disability BOOLEAN,
    emotional_disability BOOLEAN,
    other_disability BOOLEAN,
    other_disability_description VARCHAR(100),
    owns_mobile_phone BOOLEAN,
    uses_internet BOOLEAN,
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE Fertility (
    fertility_id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT NOT NULL,
    children_ever_born_male INT,
    children_ever_born_female INT,
    children_surviving_male INT,
    children_surviving_female INT,
    children_born_past_12_months_male INT,
    children_born_past_12_months_female INT,
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

CREATE TABLE Mortality (
    mortality_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    deceased_name VARCHAR(100) NOT NULL,
    sex ENUM('Male', 'Female') NOT NULL,
    age_at_death INT,
    death_due_to_accident_violence BOOLEAN,
    female_12_54_death_related_to_pregnancy BOOLEAN,
    year_of_death INT,
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

CREATE TABLE AgriculturalActivity (
    agriculture_id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    engaged_in_agriculture BOOLEAN NOT NULL,
    crop_farming BOOLEAN,
    tree_growing BOOLEAN,
    livestock_rearing BOOLEAN,
    fish_farming BOOLEAN,
    male_engaged INT,
    female_engaged INT,
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

CREATE TABLE CropDetail (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    agriculture_id INT NOT NULL,
    crop_type VARCHAR(100),
    crop_code VARCHAR(10),
    farm_size DECIMAL(10,2),
    measurement_unit ENUM('Acre', 'Hectare', 'Pole', 'Rope', 'Plot') NOT NULL,
    type_of_cropping ENUM('Mixed Cropping', 'Inter-Cropping', 'Mono Cropping') NOT NULL,
    FOREIGN KEY (agriculture_id) REFERENCES AgriculturalActivity(agriculture_id)
);

CREATE TABLE LivestockDetail (
    livestock_id INT AUTO_INCREMENT PRIMARY KEY,
    agriculture_id INT NOT NULL,
    livestock_type VARCHAR(100),
    livestock_code VARCHAR(10),
    number_of_animals INT,
    FOREIGN KEY (agriculture_id) REFERENCES AgriculturalActivity(agriculture_id)
);

-- System Tables
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('Enumerator', 'Supervisor', 'Admin') NOT NULL,
    phone_number VARCHAR(15),
    signature_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ActivityLog (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(50) NOT NULL,
    table_affected VARCHAR(50) NOT NULL,
    record_id INT,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


