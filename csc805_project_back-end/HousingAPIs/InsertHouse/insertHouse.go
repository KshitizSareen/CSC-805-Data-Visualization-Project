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

	var myRequest Housingstructs.House
	json.Unmarshal([]byte(req.Body), &myRequest)
	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL InsertHouse(%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%f,%f,%s,%s,%s,%s,%s,%s,%s);",
		myRequest.Price, myRequest.Type, myRequest.SqFeet, myRequest.Beds, myRequest.Baths, myRequest.CatsAllowed, myRequest.DogsAllowed,
		myRequest.SmokingAllowed, myRequest.WheelchairAccess, myRequest.ElectricVehicleCharge, myRequest.ComesFurnished, myRequest.Lat, myRequest.Long, myRequest.Neighbourhood,
		myRequest.City, myRequest.County, myRequest.State, myRequest.Address, myRequest.Type_Category, myRequest.Email)
	query, err := db.Query(queryString)
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var houseID int
	for query.Next() {
		query.Scan(&houseID)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var HeaderBody map[string]string = make(map[string]string)
	HeaderBody["Access-Control-Allow-Headers"] = "Content-Type"
	HeaderBody["Access-Control-Allow-Origin"] = "*"
	HeaderBody["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,ANY"
	return events.APIGatewayProxyResponse{Body: fmt.Sprintf("%d", houseID), Headers: HeaderBody, StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
