DELIMITER //
CREATE  PROCEDURE `sp_delete_District`( IN p_district_code varchar(20))
Begin 
 Delete from District where district_code = p_district_code;
 Delete from SubDistrict where district_code = p_district_code;
 
 end//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_agricultural_activity`(IN p_agriculture_id INT)
BEGIN
    DELETE FROM AgriculturalActivity WHERE agriculture_id = p_agriculture_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_disability`(IN p_disability_id INT)
BEGIN
    DELETE FROM Disability WHERE disability_id = p_disability_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_economic_activity`(IN p_activity_id INT)
BEGIN
    DELETE FROM EconomicActivity WHERE activity_id = p_activity_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_education`(IN p_education_id INT)
BEGIN
    DELETE FROM Education WHERE education_id = p_education_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_enumerationarea`(IN `p_ea_code` VARCHAR(20))
Begin 
DELETE from enumeration_area where ea_code = p_ea_code;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_fertility`(IN p_fertility_id INT)
BEGIN
    DELETE FROM Fertility WHERE fertility_id = p_fertility_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_household`( IN p_household_id int)
Begin 
DELETE from Household where household_id = p_household_id;

End//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_housing_condition`(IN p_housing_id INT)
BEGIN
    DELETE FROM HousingCondition WHERE housing_id = p_housing_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_locality`(
IN p_locality_code varchar(20)


)
BEGIN 
DELETE from Locality where locality_code = p_locality_code;
Delete from EnumerationArea where locality_code = p_locality_code;

END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_person`(IN p_person_id INT)
BEGIN
    DELETE FROM Person WHERE person_id = p_person_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_region`(IN `p_region_code` VARCHAR(20))
BEGIN
	Delete from Region where region_code = p_region_code;
    Delete from District where region_code = p_region_code;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_delete_subdistrict`(
in p_sub_district_code varchar(20)
)
Begin 
	DELETE from SubDistrict where sub_district_code = p_sub_district_code;
    Delete from Locality  where sub_district_code = p_sub_district_code;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_agricultural_activities_by_household`(IN p_household_id INT)
BEGIN
    SELECT 
        aa.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM AgriculturalActivity aa
    JOIN Household h ON aa.household_id = h.household_id
    WHERE aa.household_id = p_household_id
    ORDER BY aa.agriculture_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_agricultural_activity`(IN p_agriculture_id INT)
BEGIN
    SELECT 
        aa.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM AgriculturalActivity aa
    JOIN Household h ON aa.household_id = h.household_id
    WHERE aa.agriculture_id = p_agriculture_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_agricultural_activities`()
BEGIN
    SELECT 
        aa.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM AgriculturalActivity aa
    JOIN Household h ON aa.household_id = h.household_id
    ORDER BY aa.agriculture_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_disabilities`()
BEGIN
    SELECT 
        d.*,
        p.full_name,
        p.household_id
    FROM Disability d
    JOIN Person p ON d.person_id = p.person_id
    ORDER BY d.disability_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_district`()
Begin 
	select * from District; 
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_economic_activities`()
BEGIN
    SELECT 
        ea.*,
        p.full_name,
        p.household_id
    FROM EconomicActivity ea
    JOIN Person p ON ea.person_id = p.person_id
    ORDER BY ea.activity_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_educations`()
BEGIN
    SELECT 
        e.*,
        p.full_name,
        p.household_id
    FROM Education e
    JOIN Person p ON e.person_id = p.person_id
    ORDER BY e.education_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_fertilities`()
BEGIN
    SELECT 
        f.*,
        p.full_name,
        p.household_id,
        p.sex
    FROM Fertility f
    JOIN Person p ON f.person_id = p.person_id
    ORDER BY f.fertility_id DESC;
END//
DELIMITER ;


DELIMITER //

CREATE PROCEDURE `sp_get_all_by_cursor_fertilities`()
BEGIN
    -- Declare variables to hold cursor values
    DECLARE v_fertility_id INT;
    DECLARE v_person_id INT;
    DECLARE v_other_fertility_columns VARCHAR(255); -- replace with actual column types
    DECLARE v_full_name VARCHAR(255);
    DECLARE v_household_id INT;
    DECLARE v_sex CHAR(1);
    
    -- Declare a cursor for the SELECT statement
    DECLARE fertility_cursor CURSOR FOR
        SELECT 
            f.fertility_id,
            f.person_id,
            f.other_column,  -- replace with your actual fertility columns
            p.full_name,
            p.household_id,
            p.sex
        FROM Fertility f
        JOIN Person p ON f.person_id = p.person_id
        ORDER BY f.fertility_id DESC;
    
    -- Declare a handler for end of cursor
    DECLARE done INT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Open cursor
    OPEN fertility_cursor;
    
    read_loop: LOOP
        FETCH fertility_cursor INTO v_fertility_id, v_person_id, v_other_fertility_columns, v_full_name, v_household_id, v_sex;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Here you can do something with the fetched values
        -- For example, you can SELECT them one by one
        SELECT 
            v_fertility_id AS fertility_id,
            v_person_id AS person_id,
            v_other_fertility_columns AS other_column,
            v_full_name,
            v_household_id,
            v_sex;
    END LOOP;
    
    -- Close cursor
    CLOSE fertility_cursor;
END//

DELIMITER ;




DELIMITER //
CREATE  PROCEDURE `sp_get_all_households`()
Begin 
 SELECT * from Household; 
 
End//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_housing_conditions`()
BEGIN
    SELECT 
        hc.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM HousingCondition hc
    JOIN Household h ON hc.household_id = h.household_id
    ORDER BY hc.housing_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_localities`()
Begin 
 select * from Locality; 
 
 end//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_persons`()
BEGIN
    SELECT 
        p.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM Person p
    JOIN Household h ON p.household_id = h.household_id
    ORDER BY p.person_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_all_regions`()
BEGIN
    SELECT * FROM Region ORDER BY region_code;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_disabilities_by_person`(IN p_person_id INT)
BEGIN
    SELECT 
        d.*,
        p.full_name,
        p.household_id
    FROM Disability d
    JOIN Person p ON d.person_id = p.person_id
    WHERE d.person_id = p_person_id
    ORDER BY d.disability_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_disability`(IN p_disability_id INT)
BEGIN
    SELECT 
        d.*,
        p.full_name,
        p.household_id
    FROM Disability d
    JOIN Person p ON d.person_id = p.person_id
    WHERE d.disability_id = p_disability_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_economic_activities_by_person`(IN p_person_id INT)
BEGIN
    SELECT 
        ea.*,
        p.full_name,
        p.household_id
    FROM EconomicActivity ea
    JOIN Person p ON ea.person_id = p.person_id
    WHERE ea.person_id = p_person_id
    ORDER BY ea.activity_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_economic_activity`(IN p_activity_id INT)
BEGIN
    SELECT 
        ea.*,
        p.full_name,
        p.household_id
    FROM EconomicActivity ea
    JOIN Person p ON ea.person_id = p.person_id
    WHERE ea.activity_id = p_activity_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_education`(IN p_education_id INT)
BEGIN
    SELECT 
        e.*,
        p.full_name,
        p.household_id
    FROM Education e
    JOIN Person p ON e.person_id = p.person_id
    WHERE e.education_id = p_education_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_educations_by_person`(IN p_person_id INT)
BEGIN
    SELECT 
        e.*,
        p.full_name,
        p.household_id
    FROM Education e
    JOIN Person p ON e.person_id = p.person_id
    WHERE e.person_id = p_person_id
    ORDER BY e.education_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_enumerationarea`()
Begin 
select * from enumeration_area;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_fertilities_by_person`(IN p_person_id INT)
BEGIN
    SELECT 
        f.*,
        p.full_name,
        p.household_id,
        p.sex
    FROM Fertility f
    JOIN Person p ON f.person_id = p.person_id
    WHERE f.person_id = p_person_id
    ORDER BY f.fertility_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_fertility`(IN p_fertility_id INT)
BEGIN
    SELECT 
        f.*,
        p.full_name,
        p.household_id,
        p.sex
    FROM Fertility f
    JOIN Person p ON f.person_id = p.person_id
    WHERE f.fertility_id = p_fertility_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_household_members`(IN p_household_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_person_id INT;
    DECLARE v_full_name VARCHAR(100);
    DECLARE v_relationship_to_head VARCHAR(50);
    DECLARE v_sex VARCHAR(10);
    DECLARE v_age INT;
    
    DECLARE cur CURSOR FOR 
        SELECT person_id, full_name, relationship_to_head, sex, age 
        FROM Person 
        WHERE household_id = p_household_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_household_members (
        person_id INT,
        full_name VARCHAR(100),
        relationship_to_head VARCHAR(50),
        sex VARCHAR(10),
        age INT
    );
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_person_id, v_full_name, v_relationship_to_head, v_sex, v_age;
        IF done THEN
            LEAVE read_loop;
        END IF;
        INSERT INTO temp_household_members VALUES (v_person_id, v_full_name, v_relationship_to_head, v_sex, v_age);
    END LOOP;
    
    CLOSE cur;
    
    SELECT * FROM temp_household_members;
    DROP TEMPORARY TABLE temp_household_members;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_household_with_members`(
    IN p_household_id int 
    )
Begin 
 select * from Household where household_id = p_household_id;
 
 End//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_housing_condition`(IN p_housing_id INT)
BEGIN
    SELECT 
        hc.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM HousingCondition hc
    JOIN Household h ON hc.household_id = h.household_id
    WHERE hc.housing_id = p_housing_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_housing_conditions_by_household`(IN p_household_id INT)
BEGIN
    SELECT * FROM HousingCondition 
    WHERE household_id = p_household_id
    ORDER BY housing_id DESC;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_person`(IN p_person_id INT)
BEGIN
    SELECT 
        p.*,
        h.ea_code,
        h.structure_number,
        h.household_number
    FROM Person p
    JOIN Household h ON p.household_id = h.household_id
    WHERE p.person_id = p_person_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_persons_by_household`(IN p_household_id INT)
BEGIN
    SELECT * FROM Person 
    WHERE household_id = p_household_id
    ORDER BY 
        CASE relationship_to_head 
            WHEN 'Head' THEN 1
            WHEN 'Spouse' THEN 2
            WHEN 'Child' THEN 3
            ELSE 4
        END,
        person_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_get_subdistricts`()
Begin 
	select * from SubDistrict;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_agricultural_activity`(
    IN p_household_id INT,
    IN p_engaged_in_agriculture BOOLEAN,
    IN p_crop_farming BOOLEAN,
    IN p_tree_growing BOOLEAN,
    IN p_livestock_rearing BOOLEAN,
    IN p_fish_farming BOOLEAN,
    IN p_male_engaged INT,
    IN p_female_engaged INT,
    OUT p_id INT
)
BEGIN
    INSERT INTO AgriculturalActivity (
        household_id, engaged_in_agriculture, crop_farming, tree_growing,
        livestock_rearing, fish_farming, male_engaged, female_engaged
    ) VALUES (
        p_household_id, p_engaged_in_agriculture, p_crop_farming, p_tree_growing,
        p_livestock_rearing, p_fish_farming, p_male_engaged, p_female_engaged
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_disability`(
    IN p_person_id INT,
    IN p_has_disability BOOLEAN,
    IN p_sight_disability BOOLEAN,
    IN p_hearing_disability BOOLEAN,
    IN p_speech_disability BOOLEAN,
    IN p_physical_disability BOOLEAN,
    IN p_intellectual_disability BOOLEAN,
    IN p_emotional_disability BOOLEAN,
    IN p_other_disability BOOLEAN,
    IN p_other_disability_description VARCHAR(100),
    IN p_owns_mobile_phone BOOLEAN,
    IN p_uses_internet BOOLEAN,
    OUT p_id INT
)
BEGIN
    INSERT INTO Disability (
        person_id, has_disability, sight_disability, hearing_disability,
        speech_disability, physical_disability, intellectual_disability,
        emotional_disability, other_disability, other_disability_description,
        owns_mobile_phone, uses_internet
    ) VALUES (
        p_person_id, p_has_disability, p_sight_disability, p_hearing_disability,
        p_speech_disability, p_physical_disability, p_intellectual_disability,
        p_emotional_disability, p_other_disability, p_other_disability_description,
        p_owns_mobile_phone, p_uses_internet
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_district`(
    In p_district_code varchar(20),
    in p_region_code varchar(20),
    in p_district_name varchar(20),
    in p_district_type varchar(20)
    )
Begin 
	insert into District(district_code, region_code, district_name, district_type) 
    values (p_district_code, p_region_code, p_district_name, p_district_type);
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_economic_activity`(
    IN p_person_id INT,
    IN p_engaged_in_activity BOOLEAN,
    IN p_engagement_status ENUM('Did not work but had job to go back to', 'Worked before, seeking work and available', 'Seeking work for the first time and available', 'Did voluntary work without pay', 'Did not work and not seeking work'),
    IN p_reason_not_seeking_work ENUM('Did home duties', 'In full time education', 'Pensioner/Retiree', 'Disabled/sick to work', 'Too old/too young', 'Other'),
    IN p_occupation_code VARCHAR(10),
    IN p_occupation_description VARCHAR(100),
    IN p_industry_establishment_name VARCHAR(100),
    IN p_industry_establishment_location VARCHAR(100),
    IN p_industry_product_service VARCHAR(100),
    IN p_employment_status ENUM('Employee', 'Self employed without employees', 'Self employed with employees', 'Casual worker', 'Contributing family worker', 'Apprentice', 'Domestic employee', 'Other'),
    IN p_employment_sector ENUM('Public (Government)', 'Private Formal', 'Private Informal', 'Semi-Public/Parastatal', 'NGO/Local and International', 'International Organisation'),
    OUT p_id INT
)
BEGIN
    INSERT INTO EconomicActivity (
        person_id, engaged_in_activity, engagement_status, reason_not_seeking_work,
        occupation_code, occupation_description, industry_establishment_name,
        industry_establishment_location, industry_product_service, employment_status,
        employment_sector
    ) VALUES (
        p_person_id, p_engaged_in_activity, p_engagement_status, p_reason_not_seeking_work,
        p_occupation_code, p_occupation_description, p_industry_establishment_name,
        p_industry_establishment_location, p_industry_product_service, p_employment_status,
        p_employment_sector
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_education`(
    IN p_person_id INT,
    IN p_literacy_language VARCHAR(50),
    IN p_ever_attended_school BOOLEAN,
    IN p_highest_level_schooling ENUM('Nursery', 'Kindergarten', 'Primary', 'JSS/JHS', 'Middle', 'SSS/SHS', 'Secondary', 'Voc/technical/commercial', 'Post middle/secondary certificate', 'Post secondary Diploma', 'Bachelor degree', 'Post graduate'),
    IN p_highest_grade_completed INT,
    OUT p_id INT
)
BEGIN
    INSERT INTO Education (
        person_id, literacy_language, ever_attended_school, 
        highest_level_schooling, highest_grade_completed
    ) VALUES (
        p_person_id, p_literacy_language, p_ever_attended_school,
        p_highest_level_schooling, p_highest_grade_completed
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_enumerationarea`(IN `p_ea_code` VARCHAR(20), IN `p_locality_code` VARCHAR(20), IN `p_ea_type` VARCHAR(20), IN `p_ea_number` VARCHAR(20))
Begin 
insert into enumeration_area(ea_code,locality_code,ea_type,ea_number) values (p_ea_code, p_locality_code, p_ea_type, p_ea_number); 
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_fertility`(
    IN p_person_id INT,
    IN p_children_ever_born_male INT,
    IN p_children_ever_born_female INT,
    IN p_children_surviving_male INT,
    IN p_children_surviving_female INT,
    IN p_children_born_past_12_months_male INT,
    IN p_children_born_past_12_months_female INT,
    OUT p_id INT
)
BEGIN
    INSERT INTO Fertility (
        person_id, children_ever_born_male, children_ever_born_female,
        children_surviving_male, children_surviving_female,
        children_born_past_12_months_male, children_born_past_12_months_female
    ) VALUES (
        p_person_id, p_children_ever_born_male, p_children_ever_born_female,
        p_children_surviving_male, p_children_surviving_female,
        p_children_born_past_12_months_male, p_children_born_past_12_months_female
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_household`(
    IN p_ea_code VARCHAR(10),
    IN p_structure_number VARCHAR(20),
    IN p_household_number VARCHAR(20),
    IN p_type_of_residence ENUM('Occupied', 'Vacant'),
    IN p_detailed_address TEXT,
    IN p_contact_phone1 VARCHAR(15),
    IN p_contact_phone2 VARCHAR(15),
    IN p_nhis_ecg_vra_number VARCHAR(20),
    IN p_date_started DATE,
    IN p_date_completed DATE,
    IN p_total_visits INT,
    IN p_form_number VARCHAR(10),
    OUT p_household_id INT
)
BEGIN
    INSERT INTO Household (
        ea_code, structure_number, household_number, type_of_residence,
        detailed_address, contact_phone1, contact_phone2, nhis_ecg_vra_number,
        date_started, date_completed, total_visits, form_number
    ) VALUES (
        p_ea_code, p_structure_number, p_household_number, p_type_of_residence,
        p_detailed_address, p_contact_phone1, p_contact_phone2, p_nhis_ecg_vra_number,
        p_date_started, p_date_completed, p_total_visits, p_form_number
    );
    
    SET p_household_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_housing_condition`(
    IN p_household_id INT,
    IN p_dwelling_type ENUM('Separate house', 'Semi-detached house', 'Flat/Apartment', 'Compound house', 'Huts/Buildings (same compound)', 'Huts/Buildings (different compounds)', 'Tent', 'Improvised home', 'Living quarters attached to office/shop', 'Uncompleted building', 'Other'),
    IN p_outer_wall_material ENUM('Mud bricks/earth', 'Wood', 'Metal sheet/slate/asbestos', 'Stone', 'Burnt bricks', 'Cement blocks/concrete', 'Landcrete', 'Bamboo', 'Palm leaves/Thatch (grass)/Raffia', 'Other'),
    IN p_floor_material ENUM('Earth/Mud', 'Cement/Concrete', 'Stone', 'Burnt bricks', 'Wood', 'Vinyl tiles', 'Ceramic/Porcelain/Granite/Marble tiles', 'Terrazzo/Terrazzo tiles', 'Other'),
    IN p_roof_material ENUM('Mud/Mud bricks/Earth', 'Wood', 'Metal sheet', 'Slate/Asbestos', 'Cement/Concrete', 'Roofing Tiles', 'Bamboo', 'Thatch/Palm leaves or Raffia', 'Other'),
    IN p_tenure_arrangement ENUM('Owner occupied', 'Rent free', 'Perching', 'Squatting', 'Other'),
    IN p_ownership_type ENUM('Owned by household member', 'Being purchased', 'Relative not household member', 'Other private individual', 'Private employer', 'Other private agency', 'Public/Government ownership', 'Other'),
    IN p_total_rooms INT,
    IN p_sleeping_rooms INT,
    IN p_shared_sleeping_rooms BOOLEAN,
    IN p_households_sharing_sleeping_rooms INT,
    IN p_lighting_source ENUM('Electricity (main)', 'Electricity (private generator)', 'Kerosene lamp', 'Gas lamp', 'Solar energy', 'Candle', 'Flashlight/Torch', 'Firewood', 'Crop residue', 'Other'),
    IN p_drinking_water_source ENUM('Pipe-borne inside dwelling', 'Pipe-borne outside dwelling', 'Public tap/Standpipe', 'Borehole/Pump/Tube well', 'Protected well', 'Rain water', 'Protected spring', 'Bottled water', 'Sachet water', 'Tanker supply/Vendor provided', 'Unprotected well', 'Unprotected spring', 'River/Stream', 'Dugout/Pond/Lake/Dam/Canal', 'Other'),
    IN p_other_water_source ENUM('Pipe-borne inside dwelling', 'Pipe-borne outside dwelling', 'Public tap/Standpipe', 'Borehole/Pump/Tube well', 'Protected well', 'Rain water', 'Protected spring', 'Tanker supply/Vendor provided', 'Unprotected well', 'Unprotected spring', 'River/Stream', 'Dugout/Pond/Lake/Dam/Canal', 'Other'),
    IN p_cooking_fuel ENUM('None, no cooking', 'Wood', 'Gas', 'Electricity', 'Kerosene', 'Charcoal', 'Crop residue', 'Saw dust', 'Animal waste', 'Other'),
    IN p_cooking_space ENUM('No cooking', 'Separate room for exclusive use of household', 'Separate room shared with other household(s)', 'Enclosure without roof', 'Structure with roof but without walls', 'Bedroom/Hall/Living room', 'Veranda', 'Open space in compound', 'Other'),
    IN p_bathing_facility ENUM('Own bathroom for exclusive use', 'Shared separate bathroom in same house', 'Private open cubicle', 'Shared open cubicle', 'Public bath house', 'Bathroom in another house', 'Open space around house', 'In a river, pond, lake or dam', 'Other'),
    IN p_toilet_facility ENUM('No facility', 'WC', 'Pit latrine', 'KVIP', 'Bucket/Pan', 'Public toilet', 'Other'),
    IN p_shared_toilet BOOLEAN,
    IN p_households_sharing_toilet INT,
    IN p_solid_waste_disposal ENUM('Collected', 'Burned by household', 'Public dump (Container)', 'Public dump (Open space)', 'Dumped indiscriminately', 'Buried by household', 'Other'),
    IN p_liquid_waste_disposal ENUM('Through the sewage system', 'Through drainage system into a gutter', 'Through drainage into a pit (soak away)', 'Thrown onto the street/outside', 'Thrown into gutter', 'Thrown onto compound', 'Other'),
    OUT p_id INT
)
BEGIN
    INSERT INTO HousingCondition (
        household_id, dwelling_type, outer_wall_material, floor_material, roof_material,
        tenure_arrangement, ownership_type, total_rooms, sleeping_rooms, shared_sleeping_rooms,
        households_sharing_sleeping_rooms, lighting_source, drinking_water_source, other_water_source,
        cooking_fuel, cooking_space, bathing_facility, toilet_facility, shared_toilet,
        households_sharing_toilet, solid_waste_disposal, liquid_waste_disposal
    ) VALUES (
        p_household_id, p_dwelling_type, p_outer_wall_material, p_floor_material, p_roof_material,
        p_tenure_arrangement, p_ownership_type, p_total_rooms, p_sleeping_rooms, p_shared_sleeping_rooms,
        p_households_sharing_sleeping_rooms, p_lighting_source, p_drinking_water_source, p_other_water_source,
        p_cooking_fuel, p_cooking_space, p_bathing_facility, p_toilet_facility, p_shared_toilet,
        p_households_sharing_toilet, p_solid_waste_disposal, p_liquid_waste_disposal
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_locality`(
IN p_locality_code varchar(20),
IN p_sub_district_code varchar(20),
IN p_locality_name varchar(100)

)
BEGIN 
insert into Locality (locality_code, sub_district_code,locality_name) values (p_locality_code, p_sub_district_code, p_locality_name);

END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_person`(
    IN p_household_id INT,
    IN p_full_name VARCHAR(100),
    IN p_relationship_to_head ENUM('Head', 'Spouse', 'Child', 'Parent/Parent in-law', 'Son/Daughter in-law', 'Grandchild', 'Brother/Sister', 'Step child', 'Foster child', 'Other relative', 'Non-relative'),
    IN p_sex ENUM('Male', 'Female'),
    IN p_date_of_birth DATE,
    IN p_age INT,
    IN p_nationality ENUM('Ghanaian by birth', 'Dual Nationality', 'Ghanaian by naturalization', 'Nigerian', 'Liberian', 'Sierra Leonean', 'Gambian', 'Togolese', 'Burkinabe', 'Ivorian', 'Other ECOWAS National', 'African, other than ECOWAS', 'European', 'American', 'Asian', 'Oceanian'),
    IN p_ethnicity_code VARCHAR(10),
    IN p_ethnicity_name VARCHAR(50),
    IN p_born_in_locality BOOLEAN,
    IN p_birth_region_country_code VARCHAR(10),
    IN p_birth_region_country_name VARCHAR(50),
    IN p_lived_in_locality_since_birth BOOLEAN,
    IN p_years_lived_in_locality INT,
    IN p_religion ENUM('No Religion', 'Catholic', 'Protestant', 'Pentecostal/Charismatic', 'Other Christian', 'Islam', 'Ahmadi', 'Traditionalist', 'Other'),
    IN p_marital_status ENUM('Never married', 'Informal/consensual union/living together', 'Married', 'Separated', 'Divorced', 'Widowed'),
    IN p_present_on_census_night BOOLEAN,
    IN p_status ENUM('Usual member present', 'Visitor present', 'Usual member absent'),
    OUT p_id INT
)
BEGIN
    INSERT INTO Person (
        household_id, full_name, relationship_to_head, sex, date_of_birth, age,
        nationality, ethnicity_code, ethnicity_name, born_in_locality,
        birth_region_country_code, birth_region_country_name, lived_in_locality_since_birth,
        years_lived_in_locality, religion, marital_status, present_on_census_night, status
    ) VALUES (
        p_household_id, p_full_name, p_relationship_to_head, p_sex, p_date_of_birth, p_age,
        p_nationality, p_ethnicity_code, p_ethnicity_name, p_born_in_locality,
        p_birth_region_country_code, p_birth_region_country_name, p_lived_in_locality_since_birth,
        p_years_lived_in_locality, p_religion, p_marital_status, p_present_on_census_night, p_status
    );
    
    SET p_id = LAST_INSERT_ID();
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_insert_region`(
    IN p_region_code VARCHAR(20),
    IN p_region_name VARCHAR(20)
   
)


BEGIN
    INSERT INTO Region (
        region_code, region_name
    ) VALUES (
        p_region_code, p_region_name
    );
    
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_insert_subdistrict`(
IN p_sub_district_code varchar(20),
IN p_district_code varchar(20),
In p_sub_district_name varchar(250)

)
Begin 
	insert into SubDistrict(sub_district_code, district_code, sub_district_name) Values (p_sub_district_code, p_district_code, p_sub_district_name);
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_update_education`(
    IN p_education_id INT,
    IN p_person_id INT,
    IN p_literacy_language VARCHAR(50),
    IN p_ever_attended_school BOOLEAN,
    IN p_highest_level_schooling ENUM('Nursery', 'Kindergarten', 'Primary', 'JSS/JHS', 'Middle', 'SSS/SHS', 'Secondary', 'Voc/technical/commercial', 'Post middle/secondary certificate', 'Post secondary Diploma', 'Bachelor degree', 'Post graduate'),
    IN p_highest_grade_completed INT
)
BEGIN
    UPDATE Education 
    SET 
        person_id = p_person_id,
        literacy_language = p_literacy_language,
        ever_attended_school = p_ever_attended_school,
        highest_level_schooling = p_highest_level_schooling,
        highest_grade_completed = p_highest_grade_completed
    WHERE education_id = p_education_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_update_housing_condition`(IN `p_housing_id` INT, IN `p_household_id` INT, IN `p_dwelling_type` ENUM('Separate house','Semi-detached house','Flat/Apartment','Compound house','Huts/Buildings (same compound)','Huts/Buildings (different compounds)','Tent','Improvised home','Living quarters attached to office/shop','Uncompleted building','Other'), IN `p_outer_wall_material` ENUM('Mud bricks/earth','Wood','Metal sheet/slate/asbestos','Stone','Burnt bricks','Cement blocks/concrete','Landcrete','Bamboo','Palm leaves/Thatch (grass)/Raffia','Other'), IN `p_floor_material` ENUM('Earth/Mud','Cement/Concrete','Stone','Burnt bricks','Wood','Vinyl tiles','Ceramic/Porcelain/Granite/Marble tiles','Terrazzo/Terrazzo tiles','Other'), IN `p_roof_material` ENUM('Mud/Mud bricks/Earth','Wood','Metal sheet','Slate/Asbestos','Cement/Concrete','Roofing Tiles','Bamboo','Thatch/Palm leaves or Raffia','Other'), IN `p_tenure_arrangement` ENUM('Owner occupied','Rent free','Perching','Squatting','Other'), IN `p_ownership_type` ENUM('Owned by household member','Being purchased','Relative not household member','Other private individual','Private employer','Other private agency','Public/Government ownership','Other'), IN `p_total_rooms` INT, IN `p_sleeping_rooms` INT, IN `p_shared_sleeping_rooms` TINYINT, IN `p_households_sharing_sleeping_rooms` INT, IN `p_lighting_source` ENUM('Electricity (main)','Electricity (private generator)','Kerosene lamp','Gas lamp','Solar energy','Candle','Flashlight/Torch','Firewood','Crop residue','Other'), IN `p_drinking_water_source` ENUM('Pipe-borne inside dwelling','Pipe-borne outside dwelling','Public tap/Standpipe','Borehole/Pump/Tube well','Protected well','Rain water','Protected spring','Bottled water','Sachet water','Tanker supply/Vendor provided','Unprotected well','Unprotected spring','River/Stream','Dugout/Pond/Lake/Dam/Canal','Other'), IN `p_other_water_source` ENUM('Pipe-borne inside dwelling','Pipe-borne outside dwelling','Public tap/Standpipe','Borehole/Pump/Tube well','Protected well','Rain water','Protected spring','Tanker supply/Vendor provided','Unprotected well','Unprotected spring','River/Stream','Dugout/Pond/Lake/Dam/Canal','Other'), IN `p_cooking_fuel` ENUM('None, no cooking','Wood','Gas','Electricity','Kerosene','Charcoal','Crop residue','Saw dust','Animal waste','Other'), IN `p_cooking_space` ENUM('No cooking','Separate room for exclusive use of household','Separate room shared with other household(s)','Enclosure without roof','Structure with roof but without walls','Bedroom/Hall/Living room','Veranda','Open space in compound','Other'), IN `p_bathing_facility` ENUM('Own bathroom for exclusive use','Shared separate bathroom in same house','Private open cubicle','Shared open cubicle','Public bath house','Bathroom in another house','Open space around house','In a river, pond, lake or dam','Other'), IN `p_toilet_facility` ENUM('No facility','WC','Pit latrine','KVIP','Bucket/Pan','Public toilet','Other'), IN `p_shared_toilet` TINYINT, IN `p_households_sharing_toilet` INT, IN `p_solid_waste_disposal` ENUM('Collected','Burned by household','Public dump (Container)','Public dump (Open space)','Dumped indiscriminately','Buried by household','Other'), IN `p_liquid_waste_disposal` ENUM('Through the sewage system','Through drainage system into a gutter','Through drainage into a pit (soak away)','Thrown onto the street/outside','Thrown into gutter','Thrown onto compound','Other'))
BEGIN
    UPDATE HousingCondition 
    SET 
        household_id = p_household_id,
        dwelling_type = p_dwelling_type,
        outer_wall_material = p_outer_wall_material,
        floor_material = p_floor_material,
        roof_material = p_roof_material,
        tenure_arrangement = p_tenure_arrangement,
        ownership_type = p_ownership_type,
        total_rooms = p_total_rooms,
        sleeping_rooms = p_sleeping_rooms,
        shared_sleeping_rooms = p_shared_sleeping_rooms,
        households_sharing_sleeping_rooms = p_households_sharing_sleeping_rooms,
        lighting_source = p_lighting_source,
        drinking_water_source = p_drinking_water_source,
        other_water_source = p_other_water_source,
        cooking_fuel = p_cooking_fuel,
        cooking_space = p_cooking_space,
        bathing_facility = p_bathing_facility,
        toilet_facility = p_toilet_facility,
        shared_toilet = p_shared_toilet,
        households_sharing_toilet = p_households_sharing_toilet,
        solid_waste_disposal = p_solid_waste_disposal,
        liquid_waste_disposal = p_liquid_waste_disposal
    WHERE housing_id = p_housing_id;
END//
DELIMITER ;

DELIMITER //
CREATE  PROCEDURE `sp_update_person`(
    IN p_person_id INT,
    IN p_household_id INT,
    IN p_full_name VARCHAR(100),
    IN p_relationship_to_head ENUM('Head', 'Spouse', 'Child', 'Parent/Parent in-law', 'Son/Daughter in-law', 'Grandchild', 'Brother/Sister', 'Step child', 'Foster child', 'Other relative', 'Non-relative'),
    IN p_sex ENUM('Male', 'Female'),
    IN p_date_of_birth DATE,
    IN p_age INT,
    IN p_nationality ENUM('Ghanaian by birth', 'Dual Nationality', 'Ghanaian by naturalization', 'Nigerian', 'Liberian', 'Sierra Leonean', 'Gambian', 'Togolese', 'Burkinabe', 'Ivorian', 'Other ECOWAS National', 'African, other than ECOWAS', 'European', 'American', 'Asian', 'Oceanian'),
    IN p_ethnicity_code VARCHAR(10),
    IN p_ethnicity_name VARCHAR(50),
    IN p_born_in_locality BOOLEAN,
    IN p_birth_region_country_code VARCHAR(10),
    IN p_birth_region_country_name VARCHAR(50),
    IN p_lived_in_locality_since_birth BOOLEAN,
    IN p_years_lived_in_locality INT,
    IN p_religion ENUM('No Religion', 'Catholic', 'Protestant', 'Pentecostal/Charismatic', 'Other Christian', 'Islam', 'Ahmadi', 'Traditionalist', 'Other'),
    IN p_marital_status ENUM('Never married', 'Informal/consensual union/living together', 'Married', 'Separated', 'Divorced', 'Widowed'),
    IN p_present_on_census_night BOOLEAN,
    IN p_status ENUM('Usual member present', 'Visitor present', 'Usual member absent')
)
BEGIN
    UPDATE Person 
    SET 
        household_id = p_household_id,
        full_name = p_full_name,
        relationship_to_head = p_relationship_to_head,
        sex = p_sex,
        date_of_birth = p_date_of_birth,
        age = p_age,
        nationality = p_nationality,
        ethnicity_code = p_ethnicity_code,
        ethnicity_name = p_ethnicity_name,
        born_in_locality = p_born_in_locality,
        birth_region_country_code = p_birth_region_country_code,
        birth_region_country_name = p_birth_region_country_name,
        lived_in_locality_since_birth = p_lived_in_locality_since_birth,
        years_lived_in_locality = p_years_lived_in_locality,
        religion = p_religion,
        marital_status = p_marital_status,
        present_on_census_night = p_present_on_census_night,
        status = p_status
    WHERE person_id = p_person_id;
END//
DELIMITER ;
