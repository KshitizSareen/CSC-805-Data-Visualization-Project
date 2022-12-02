package VehicleStructs

type VehicleFilters struct {
	Manufacturers string `json:"manufacturers"`
	MinPrice      int    `json:"minPrice"`
	MaxPrice      int    `json:"maxPrice"`
	MinYear       int    `json:"minYear"`
	MaxYear       int    `json:"maxYear"`
	MinMileage    int    `json:"minMileage"`
	MaxMileage    int    `json:"maxMileage"`
	FuelTypes     string `json:"fuelTypes"`
	VehicleTypes  string `json:"vehicleTypes"`
}
