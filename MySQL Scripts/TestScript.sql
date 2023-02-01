/*
CALL `DataVis_Project_Database`.`GroupHousesByState`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, NULL);
 
 CALL `DataVis_Project_Database`.`GroupHousesByCounty`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, NULL);

 CALL `DataVis_Project_Database`.`GroupHousesByCity`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, 'San Francisco,New York');

 CALL `DataVis_Project_Database`.`GroupHousesByNeighborhood`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, 'San Francisco,New York');
 
 CALL `DataVis_Project_Database`.`GroupVehiclesByState`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, NULL);
 
CALL `DataVis_Project_Database`.`GroupVehiclesByCounty`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 'San Francisco County,New York County');
 
CALL `DataVis_Project_Database`.`GroupVehiclesByCity`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 'San Francisco,New York');
 
CALL `DataVis_Project_Database`.`GroupVehiclesByNeighborhood`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 'San Francisco,New York');
 
 CALL `DataVis_Project_Database`.`GroupHousesByType`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL,NULL);
 
 CALL `DataVis_Project_Database`.`GroupVehiclesByManufacturer`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, NULL,NULL,NULL);
 */

/*
CALL `DataVis_Project_Database`.`SearchHouses`(0, 2147483647,'0', 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, 0, 35,-120, -118);
 */

/*
CALL `DataVis_Project_Database`.`GroupHousesByType`(0, 2147483647,'0,3,6', 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, 0, 35,-120, -118);
 
CALL `DataVis_Project_Database`.`SearchVehicles`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, '0,2', NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 0, 35,-120, -118);
 
CALL `DataVis_Project_Database`.`GroupVehiclesByCity`(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, '0,2', NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 0, 35,-120, -118);
 
 CALL `DataVis_Project_Database`.`GroupVehiclesByManufacturer`(0, 2147483647,0, 2147483647,'38,0,39,1', 
 NULL,NULL, NULL, NULL, NULL, NULL, NULL,NULL, 0, 2147483647, 0, 35,-120, -118);
 */

/*
 CALL `DataVis_Project_Database`.`GroupHousesByType`(0, 2147483647,NULL, 0, 2147483647, 0, 2147483647,0, 2147483647,
 NULL,NULL, NULL, NULL, NULL, NULL, -100, 100,-130, 120);
 */

CALL
`DataVis_Project_Database`.`GroupVehiclesByNeighborhood`
(0, 2147483647,0, 2147483647, NULL, 
 NULL,NULL, '0,2', NULL, NULL, NULL, NULL,NULL, '0', '2147483647', '0', '35','-120', '-115')
 
 