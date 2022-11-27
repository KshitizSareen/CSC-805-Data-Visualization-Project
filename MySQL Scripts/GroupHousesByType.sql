Use DataVis_Project_Database;

DELIMITER $$
CREATE PROCEDURE `GroupHousesByType` (IN minPrice INT, IN maxPrice INT, IN housingTypes VARCHAR(255), IN minSqFeet INT, 
IN maxSqFeet INT, IN minBeds INT, IN maxBeds INT, IN minBaths INT, IN maxBaths INT, IN in_cats_allowed INT,
IN in_dogs_allowed INT, IN in_smoking_allowed INT, IN in_wheelchair_access INT, IN in_electric_vehicle_charge INT, 
IN in_comes_furnished INT, IN minLat DOUBLE, IN maxLat DOUBLE, IN minLong DOUBLE, IN maxLong DOUBLE)

BEGIN

SELECT AVG(price) as 'avgPrice',Min(price) as 'minPrice',Max(price) as 'maxPrice',COUNT(*) as 'Count',`Type Category` FROM Housing_Data
WHERE (price >= minPrice AND price<=maxPrice) 
AND 
(FIND_IN_SET(type,housingTypes) OR housingTypes is NULL)
AND
(sqfeet>= minSqFeet AND sqFeet<=maxSqFeet)
AND
(beds>=minBeds AND beds<=maxBeds)
AND
(baths>=minBaths AND baths<=maxBaths)
AND
(cats_allowed=in_cats_allowed OR in_cats_allowed is NULL)
AND
(dogs_allowed=in_dogs_allowed OR in_dogs_allowed is NULL)
AND
(smoking_allowed=in_smoking_allowed OR in_smoking_allowed is NULL)
AND
(wheelchair_access = in_wheelchair_access OR in_wheelchair_access is NULL)
AND 
(electric_vehicle_charge = in_electric_vehicle_charge OR in_electric_vehicle_charge is NULL)
AND
(comes_furnished = in_comes_furnished OR in_comes_furnished is NULL)
AND 
(lat>=minLat AND lat<=maxLat)
AND 
(`long`>=minLong AND `long`<=maxLong)
GROUP BY `Type Category` ORDER BY `index` ASC;

END$$
DELIMITER ;