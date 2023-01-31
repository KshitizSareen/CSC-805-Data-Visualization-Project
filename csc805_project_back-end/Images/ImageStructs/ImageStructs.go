package ImageStructs

type ImageObject struct {
	Type      string `json:"type"`
	ListingID int    `json:"listingID"`
	ImageURL  string `json:"imageURL"`
	Position  int    `json:"position"`
}

type ImageFilters struct {
	Type      string `json:"category"`
	ListingID int    `json:"listingID"`
}
