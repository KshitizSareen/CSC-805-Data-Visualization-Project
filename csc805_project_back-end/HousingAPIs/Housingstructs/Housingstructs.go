package Housingstructs

type HouseFilters struct {
	HousingTypes          string  `json:"housingTypes"`
	MinPrice              int     `json:"minPrice"`
	MaxPrice              int     `json:"maxPrice"`
	MinSqFeet             int     `json:"minSqFeet"`
	MaxSqFeet             int     `json:"maxSqFeet"`
	MinBeds               int     `json:"minBeds"`
	MaxBeds               int     `json:"maxBeds"`
	MinBaths              int     `json:"minBaths"`
	MaxBaths              int     `json:"maxBaths"`
	CatsAllowed           string  `json:"catsAllowed"`
	DogsAllowed           string  `json:"dogsAllowed"`
	SmokingAllowed        string  `json:"smokingAllowed"`
	WheelchairAccess      string  `json:"wheelchairAccess"`
	ElectricVehicleCharge string  `json:"electricVehicleCharge"`
	ComesFurnished        string  `json:"comesFurnished"`
	MinLat                float64 `json:"minLat"`
	MaxLat                float64 `json:"maxLat"`
	MinLong               float64 `json:"minLong"`
	MaxLong               float64 `json:"maxLong"`
}

type House struct {
	Index                 int
	Price                 int `json:"Price"`
	Type                  int `json:"Type"`
	SqFeet                int `json:"SqFeet"`
	Beds                  int `json:"Beds"`
	Baths                 int `json:"Baths"`
	CatsAllowed           int `json:"CatsAllowed"`
	DogsAllowed           int `json:"DogsAllowed"`
	SmokingAllowed        int `json:"SmokingAllowed"`
	WheelchairAccess      int `json:"WheelchairAccess"`
	ElectricVehicleCharge int `json:"ElectricVehicleCharge"`
	ComesFurnished        int `json:"ComesFurnished"`
	LaundryOptions        string
	ParkingOptions        string
	Image_URL             string
	Description           string
	Lat                   float64 `json:"Lat"`
	Long                  float64 `json:"Long"`
	Neighbourhood         string  `json:"Neighbourhood"`
	City                  string  `json:"City"`
	County                string  `json:"County"`
	State                 string  `json:"State"`
	Address               string  `json:"Address"`
	Type_Category         string  `json:"Type_Category"`
	Email                 string  `json:"Email"`
}

type HouseGroup struct {
	AvgPrice float64
	MinPrice int
	MaxPrice int
	Count    int
	Category string
}
