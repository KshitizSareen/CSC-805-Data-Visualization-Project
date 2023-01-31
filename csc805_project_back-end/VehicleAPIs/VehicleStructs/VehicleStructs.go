package VehicleStructs

type VehicleFilters struct {
	Manufacturers string  `json:"manufacturers"`
	MinPrice      int     `json:"minPrice"`
	MaxPrice      int     `json:"maxPrice"`
	MinYear       int     `json:"minYear"`
	MaxYear       int     `json:"maxYear"`
	MinMileage    int     `json:"minMileage"`
	MaxMileage    int     `json:"maxMileage"`
	FuelTypes     string  `json:"fuelTypes"`
	VehicleTypes  string  `json:"vehicleTypes"`
	MinLat        float64 `json:"minLat"`
	MaxLat        float64 `json:"maxLat"`
	MinLong       float64 `json:"minLong"`
	MaxLong       float64 `json:"maxLong"`
}

type Vehicle struct {
	Index                 int
	Price                 int    `json:"Price"`
	Year                  int    `json:"Year"`
	Manufacturer          string `json:"Manufacturer"`
	Model                 string
	Condition             string
	Cylinders             string
	Fuel                  string `json:"Fuel"`
	Odometer              int    `json:"Odometer"`
	Title_Status          string
	Transmission          string
	Drive                 string
	Type                  string `json:"Type"`
	Image_URL             string
	Description           string
	Lat                   float64 `json:"Lat"`
	Long                  float64 `json:"Long"`
	Manufacturer_Category int     `json:"Manufacturer_Category"`
	Model_Category        int
	Condition_Category    int
	Cylinders_Category    int
	Fuel_Category         int `json:"Fuel_Category"`
	Title_Status_Category int
	Transmission_Category int
	Drive_Category        int
	Type_Category         int    `json:"Type_Category"`
	Neighbourhood         string `json:"Neighbourhood"`
	City                  string `json:"City"`
	County                string `json:"County"`
	State                 string `json:"State"`
	Address               string `json:"Address"`
	Email                 string `json:"Email"`
}

type VehicleGroup struct {
	AvgPrice float64
	MinPrice int
	MaxPrice int
	Count    int
	Category string
}
