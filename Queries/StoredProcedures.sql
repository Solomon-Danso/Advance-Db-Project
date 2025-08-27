-- Insert Household
DELIMITER //
CREATE PROCEDURE sp_insert_household(
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
END //
DELIMITER ;


-- Insert Region
DELIMITER //
CREATE PROCEDURE sp_insert_region(
    IN p_region_code VARCHAR(20),
    IN p_region_name VARCHAR(20)
   
)
BEGIN
    INSERT INTO Region (
        region_code, region_name
    ) VALUES (
        p_region_code, p_region_name
    );
    
END //
DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_get_all_regions()
BEGIN
    SELECT * FROM Region ORDER BY region_code;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_update_region(
    IN p_region_code VARCHAR(20),
    IN p_region_name VARCHAR(20)
)
BEGIN
    UPDATE Region 
    SET 
        region_code = p_region_code,
        region_name = p_region_name,
        updated_at = CURRENT_TIMESTAMP
    WHERE region_code = p_region_code;
    
    SELECT ROW_COUNT() AS rows_affected;
END //

DELIMITER ;

DELIMITER //

create procedure sp_delete_region(
in p_region_code varchar(20),
   p_region_name varchar(20)

)

BEGIN
	Delete from Region where region_code = p_region_code;
    Delete from District where region_code = p_region_code;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_insert_district(
    In p_district_code varchar(20),
    in p_region_code varchar(20),
    in p_district_name varchar(20),
    in p_district_type varchar(20)
    )
    
Begin 
	insert into District(district_code, region_code, district_name, district_type) 
    values (p_district_code, p_region_code, p_district_name, p_district_type);
END //


-- Insert Person
DELIMITER //
CREATE PROCEDURE sp_insert_person(
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
    OUT p_person_id INT
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
    
    SET p_person_id = LAST_INSERT_ID();
END //
DELIMITER ;





-- Update Person
DELIMITER //
CREATE PROCEDURE sp_update_person(
    IN p_person_id INT,
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
    UPDATE Person SET
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
END //
DELIMITER ;

-- Delete Person
DELIMITER //
CREATE PROCEDURE sp_delete_person(IN p_person_id INT)
BEGIN
    DELETE FROM Person WHERE person_id = p_person_id;
END //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_insert_subdistrict(
IN p_sub_district_code varchar(20),
IN p_district_code varchar(20),
In p_sub_district_name varchar(250)

)

Begin 
	insert into SubDistrict(sub_district_code, district_code, sub_district_name) Values (p_sub_district_code, p_district_code, p_sub_district_name);
END //

DELIMITER //

CREATE PROCEDURE sp_select_subdistrict()

Begin 
	select * from SubDistrict;
END //
-- Retrieve Household Members using Cursor
DELIMITER //


DELIMITER //

CREATE PROCEDURE sp_delete_subdistrict(
in p_sub_district_code varchar(20)
)

Begin 
	DELETE from SubDistrict where sub_district_code = p_sub_district_code;
    Delete from Locality  where sub_district_code = p_sub_district_code;
END //

DELIMITER //

create PROCEDURE sp_insert_locality(
IN p_locality_code varchar(20),
IN p_sub_district_code varchar(20),
IN p_locality_name varchar(100)

)

BEGIN 
insert into Locality (locality_code, sub_district_code,locality_name) values (p_locality_code, p_sub_district_code, p_locality_name);

END //

DELIMITER //

create PROCEDURE sp_delete_locality(
IN p_locality_code varchar(20)


)

BEGIN 
DELETE from Locality where locality_code = p_locality_code;
Delete from EnumerationArea where locality_code = p_locality_code;

END //

DELIMITER //

Create Procedure sp_insert_enumerationarea(
IN p_ea_code varchar(20),
IN p_locality_code varchar(20), 
IN p_ea_type varchar(20),
IN p_ea_number varchar(20)  
)

Begin 
insert into EnumerationArea(ea_code,locality_code,ea_type,ea_number) values (p_ea_code, p_locality_code, p_ea_type, p_ea_number); 
END//

DELIMITER //

Create Procedure sp_delete_enumerationarea(
IN p_ea_code varchar(20) 
)

Begin 
DELETE from EnumerationArea where ea_code = p_ea_code;
END//



DELIMITER //

Create Procedure sp_get_enumerationarea(

)

Begin 
select * from EnumerationArea;
END//


CREATE PROCEDURE sp_get_all_localities()

Begin 
 select * from Locality; 
 
 end;

CREATE PROCEDURE sp_get_household_members(IN p_household_id INT)
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
END //
DELIMITER ;