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
	queryString := fmt.Sprintf("CALL GroupHousesByType(%d,%d,%s, %d, %d, %d, %d,%d, %d,%s,%s, %s, %s, %s, %s, %f, %f,%f, %f);",
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
	var HeaderBody map[string]string = make(map[string]string)
	HeaderBody["Access-Control-Allow-Headers"] = "Content-Type"
	HeaderBody["Access-Control-Allow-Origin"] = "*"
	HeaderBody["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,ANY"
	return events.APIGatewayProxyResponse{Body: string(resp), Headers: HeaderBody, StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
