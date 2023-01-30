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
	Price                 int    `json:"price"`
	Year                  int    `json:"year"`
	Manufacturer          string `json:"manufacturer"`
	Model                 string
	Condition             string
	Cylinders             string
	Fuel                  string `json:"fuelType"`
	Odometer              int    `json:"mileage"`
	Title_Status          string
	Transmission          string
	Drive                 string
	Type                  string `json:"vehicleType"`
	Image_URL             string
	Description           string
	Lat                   float64 `json:"lat"`
	Long                  float64 `json:"long"`
	Manufacturer_Category int     `json:"manufacturerCategory"`
	Model_Category        int
	Condition_Category    int
	Cylinders_Category    int
	Fuel_Category         int `json:"fuelCategory"`
	Title_Status_Category int
	Transmission_Category int
	Drive_Category        int
	Type_Category         int    `json:"typeCategory"`
	Neighbourhood         string `json:"neighbourhood"`
	City                  string `json:"city"`
	County                string `json:"county"`
	State                 string `json:"state"`
	Address               string `json:"address"`
	Email                 string `json:"email"`
}

type VehicleGroup struct {
	AvgPrice float64
	MinPrice int
	MaxPrice int
	Count    int
	Category string
}
