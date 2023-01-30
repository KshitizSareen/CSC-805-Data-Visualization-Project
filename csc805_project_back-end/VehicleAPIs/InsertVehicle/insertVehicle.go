package main

import (
	env "csc805_project_back-end/Env"
	"csc805_project_back-end/VehicleAPIs/VehicleStructs"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

func HandleLambdaEvent(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var myRequest VehicleStructs.Vehicle
	json.Unmarshal([]byte(req.Body), &myRequest)
	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL InsertVehicle(%d,%d,%s,%s,%d,%s,%f,%f,%d,%d,%d,%s,%s,%s,%s,%s,%s);",
		myRequest.Price, myRequest.Year, myRequest.Manufacturer, myRequest.Fuel, myRequest.Odometer, myRequest.Type,
		myRequest.Lat, myRequest.Long, myRequest.Manufacturer_Category, myRequest.Fuel_Category, myRequest.Type_Category,
		myRequest.Neighbourhood, myRequest.City, myRequest.County, myRequest.State, myRequest.Address, myRequest.Email)
	query, err := db.Query(queryString)
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var vehicleID int
	for query.Next() {
		query.Scan(&vehicleID)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var HeaderBody map[string]string = make(map[string]string)
	HeaderBody["Access-Control-Allow-Headers"] = "Content-Type"
	HeaderBody["Access-Control-Allow-Origin"] = "*"
	HeaderBody["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,ANY"
	return events.APIGatewayProxyResponse{Body: fmt.Sprintf("%d", vehicleID), Headers: HeaderBody, StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
