package main

import (
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

	db, err := sql.Open("mysql", "root:Ks0756454835@tcp(csc805-datavis-project-database.cbwqxjvaa6sv.us-west-1.rds.amazonaws.com:3306)/DataVis_Project_Database")
	defer db.Close()
	queryString := fmt.Sprintf("CALL GroupHousesByCity(%d,%d,'%s', %d, %d, %d, %d,%d, %d,%d,%d, %d, %d, %d, %d, %f, %f,%f, %f);",
		myRequest.MinPrice, myRequest.MaxPrice, myRequest.HousingTypes, myRequest.MinSqFeet, myRequest.MaxSqFeet, myRequest.MinBeds, myRequest.MaxBeds,
		myRequest.MinBaths, myRequest.MaxBaths, myRequest.CatsAllowed, myRequest.DogsAllowed, myRequest.SmokingAllowed, myRequest.WheelchairAccess, myRequest.ElectricVehicleCharge,
		myRequest.ComesFurnished, myRequest.MinLat, myRequest.MaxLat, myRequest.MinLong, myRequest.MaxLong)
	query, err := db.Query(queryString)
	var houseGroup Housingstructs.HouseGroup
	var houseGroups []Housingstructs.HouseGroup
	for query.Next() {
		query.Scan(&houseGroup.AvgPrice, &houseGroup.MinPrice, &houseGroup.MaxPrice, &houseGroup.Count, &houseGroup.Category)
		houseGroups = append(houseGroups, houseGroup)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var resp []byte
	if houseGroups == nil {
		resp, err = json.Marshal(make([]Housingstructs.HouseGroup, 0, 0))
	} else {
		resp, err = json.Marshal(houseGroups)
	}
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	return events.APIGatewayProxyResponse{Body: string(resp), StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
