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
	CatsAllowed           int     `json:"catsAllowed"`
	DogsAllowed           int     `json:"dogsAllowed"`
	SmokingAllowed        int     `json:"smokingAllowed"`
	WheelchairAccess      int     `json:"wheelchairAccess"`
	ElectricVehicleCharge int     `json:"electricVehicleCharge"`
	ComesFurnished        int     `json:"comesFurnished"`
	MinLat                float64 `json:"minLat"`
	MaxLat                float64 `json:"maxLat"`
	MinLong               float64 `json:"minLong"`
	MaxLong               float64 `json:"maxLong"`
}

type House struct {
	Index                 int
	Price                 int
	Type                  int
	SqFeet                int
	Beds                  int
	Baths                 int
	CatsAllowed           int
	DogsAllowed           int
	SmokingAllowed        int
	WheelchairAccess      int
	ElectricVehicleCharge int
	ComesFurnished        int
	LaundryOptions        string
	ParkingOptions        string
	Image_URL             string
	Description           string
	Lat                   float64
	Long                  float64
	Neighbourhood         string
	City                  string
	County                string
	State                 string
	Address               string
	Type_Category         string
}

type HouseGroup struct {
	AvgPrice float64
	MinPrice int
	MaxPrice int
	Count    int
	Category string
}
