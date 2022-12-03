package main

import (
	env "csc805_project_back-end/Env"
	"csc805_project_back-end/HousingAPIs/Housingstructs"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

func HandleLambdaEvent(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var myRequest Housingstructs.HouseFilters
	json.Unmarshal([]byte(req.Body), &myRequest)

	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL SearchHouses(%d,%d,%s, %d, %d, %d, %d,%d, %d,%s,%s, %s, %s, %s, %s, %f, %f,%f, %f);",
		myRequest.MinPrice, myRequest.MaxPrice, myRequest.HousingTypes, myRequest.MinSqFeet, myRequest.MaxSqFeet, myRequest.MinBeds, myRequest.MaxBeds,
		myRequest.MinBaths, myRequest.MaxBaths, myRequest.CatsAllowed, myRequest.DogsAllowed, myRequest.SmokingAllowed, myRequest.WheelchairAccess, myRequest.ElectricVehicleCharge,
		myRequest.ComesFurnished, myRequest.MinLat, myRequest.MaxLat, myRequest.MinLong, myRequest.MaxLong)
	query, err := db.Query(queryString)
	var house Housingstructs.House
	var houses []Housingstructs.House
	for query.Next() {
		query.Scan(&house.Index, &house.Price, &house.Type, &house.SqFeet, &house.Beds, &house.Baths, &house.CatsAllowed, &house.DogsAllowed, &house.SmokingAllowed, &house.WheelchairAccess, &house.ElectricVehicleCharge, &house.ComesFurnished, &house.LaundryOptions, &house.ParkingOptions, &house.Image_URL, &house.Description, &house.Lat, &house.Long, &house.Neighbourhood, &house.City, &house.County, &house.State, &house.Address, &house.Type_Category)
		houses = append(houses, house)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var resp []byte
	if houses == nil {
		resp, err = json.Marshal(make([]Housingstructs.House, 0, 0))
	} else {
		resp, err = json.Marshal(houses)
	}
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	return events.APIGatewayProxyResponse{Body: string(resp), StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
