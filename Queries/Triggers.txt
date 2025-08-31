-- Log Household changes
DELIMITER //
CREATE TRIGGER tr_household_after_insert
AFTER INSERT ON Household
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, new_values)
    VALUES (NULL, 'INSERT', 'Household', NEW.household_id, 
            CONCAT('{"ea_code":"', NEW.ea_code, '", "structure_number":"', NEW.structure_number, '", "household_number":"', NEW.household_number, '"}'));
END //
DELIMITER ;





DELIMITER //
CREATE TRIGGER tr_household_after_update
AFTER UPDATE ON Household
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, old_values, new_values)
    VALUES (NULL, 'UPDATE', 'Household', NEW.household_id, 
            CONCAT('{"ea_code":"', OLD.ea_code, '", "structure_number":"', OLD.structure_number, '", "household_number":"', OLD.household_number, '"}'),
            CONCAT('{"ea_code":"', NEW.ea_code, '", "structure_number":"', NEW.structure_number, '", "household_number":"', NEW.household_number, '"}'));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_household_after_delete
AFTER DELETE ON Household
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, old_values)
    VALUES (NULL, 'DELETE', 'Household', OLD.household_id, 
            CONCAT('{"ea_code":"', OLD.ea_code, '", "structure_number":"', OLD.structure_number, '", "household_number":"', OLD.household_number, '"}'));
END //
DELIMITER ;

-- Log Person changes
DELIMITER //
CREATE TRIGGER tr_person_after_insert
AFTER INSERT ON Person
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, new_values)
    VALUES (NULL, 'INSERT', 'Person', NEW.person_id, 
            CONCAT('{"full_name":"', NEW.full_name, '", "relationship_to_head":"', NEW.relationship_to_head, '", "sex":"', NEW.sex, '"}'));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_person_after_update
AFTER UPDATE ON Person
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, old_values, new_values)
    VALUES (NULL, 'UPDATE', 'Person', NEW.person_id, 
            CONCAT('{"full_name":"', OLD.full_name, '", "relationship_to_head":"', OLD.relationship_to_head, '", "sex":"', OLD.sex, '"}'),
            CONCAT('{"full_name":"', NEW.full_name, '", "relationship_to_head":"', NEW.relationship_to_head, '", "sex":"', NEW.sex, '"}'));
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_person_after_delete
AFTER DELETE ON Person
FOR EACH ROW
BEGIN
    INSERT INTO ActivityLog (user_id, action, table_affected, record_id, old_values)
    VALUES (NULL, 'DELETE', 'Person', OLD.person_id, 
            CONCAT('{"full_name":"', OLD.full_name, '", "relationship_to_head":"', OLD.relationship_to_head, '", "sex":"', OLD.sex, '"}'));
END //
DELIMITER ;