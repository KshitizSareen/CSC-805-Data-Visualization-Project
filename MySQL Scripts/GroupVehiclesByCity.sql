Use DataVis_Project_Database;

DELIMITER $$
CREATE PROCEDURE `GroupVehiclesByCity` (IN minPrice INT, IN maxPrice INT, IN minYear INT, IN maxYear INT, 
IN manufacturerCategories VARCHAR(255), IN modelCategories VARCHAR(255), IN conditionCategories VARCHAR(255), 
IN cylinderCategories VARCHAR(255), IN fuelCategories VARCHAR(255), IN titleStatusCategories VARCHAR(255), 
IN transmissionCategories VARCHAR(255),  IN driveCategories VARCHAR(255), IN typeCategories VARCHAR(255), 
IN in_min_odometer INT, IN in_max_odometer INT,IN minLat DOUBLE, IN maxLat DOUBLE, IN minLong DOUBLE, IN maxLong DOUBLE)

BEGIN

SELECT AVG(price) as 'avgPrice',Min(price) as 'minPrice',Max(price) as 'maxPrice',COUNT(*) as 'Count',city FROM Vehicle_Data
WHERE (price >= minPrice AND price<=maxPrice) 
AND 
(year >= minYear AND year<=maxYear) 
AND 
(FIND_IN_SET(Manufacturer_Category,manufacturerCategories) OR manufacturerCategories is NULL)
AND
(FIND_IN_SET(Model_Category,modelCategories) OR modelCategories is NULL)
AND
(FIND_IN_SET(Condtion_Category,conditionCategories) OR conditionCategories is NULL)
AND
(FIND_IN_SET(Cylinders_Category,cylinderCategories) OR cylinderCategories is NULL)
AND 
(FIND_IN_SET(Fuel_Category,fuelCategories) OR fuelCategories is NULL)
AND 
(FIND_IN_SET(Title_status_Category,titleStatusCategories) OR titleStatusCategories is NULL)
AND 
(FIND_IN_SET(Transmission_Category,transmissionCategories) OR transmissionCategories is NULL)
AND
(FIND_IN_SET(Drive_Category,driveCategories) OR driveCategories is NULL)
AND
(FIND_IN_SET(Type_Category,typeCategories) OR typeCategories is NULL)
AND
(odometer >= in_min_odometer AND odometer <= in_max_odometer)
AND 
(lat>=minLat AND lat<=maxLat)
AND 
(`long`>=minLong AND `long`<=maxLong)
GROUP BY city ORDER BY `index` ASC;

END$$
DELIMITER ;