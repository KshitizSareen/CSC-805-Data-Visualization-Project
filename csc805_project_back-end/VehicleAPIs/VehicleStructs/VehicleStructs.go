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
	Price                 int
	Year                  int
	Manufacturer          string
	Model                 string
	Condition             string
	Cylinders             string
	Fuel                  string
	Odometer              int
	Title_Status          string
	Transmission          string
	Drive                 string
	Type                  string
	Image_URL             string
	Description           string
	Lat                   float64
	Long                  float64
	Manufacturer_Category int
	Model_Category        int
	Condition_Category    int
	Cylinders_Category    int
	Fuel_Category         int
	Title_Status_Category int
	Transmission_Category int
	Drive_Category        int
	Type_Category         int
	Neighbourhood         string
	City                  string
	County                string
	State                 string
	Address               string
}

type VehicleGroup struct {
	AvgPrice float64
	MinPrice int
	MaxPrice int
	Count    int
	Category string
}
