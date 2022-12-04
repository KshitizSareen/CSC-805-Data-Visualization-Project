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
	var myRequest VehicleStructs.VehicleFilters
	json.Unmarshal([]byte(req.Body), &myRequest)

	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL GroupVehiclesByManufacturer(%d,%d,%d,%d,%s,NULL,NULL,NULL,%s,NULL,NULL,NULL,%s,'%d','%d','%f','%f','%f','%f');", myRequest.MinPrice, myRequest.MaxPrice, myRequest.MinYear, myRequest.MaxYear, myRequest.Manufacturers, myRequest.FuelTypes, myRequest.VehicleTypes, myRequest.MinMileage, myRequest.MaxMileage, myRequest.MinLat, myRequest.MaxLat, myRequest.MinLong, myRequest.MaxLong)
	query, err := db.Query(queryString)
	var vehicleGroup VehicleStructs.VehicleGroup
	var vehicleGroups []VehicleStructs.VehicleGroup
	for query.Next() {
		query.Scan(&vehicleGroup.AvgPrice, &vehicleGroup.MinPrice, &vehicleGroup.MaxPrice, &vehicleGroup.Count, &vehicleGroup.Category)
		vehicleGroups = append(vehicleGroups, vehicleGroup)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var resp []byte
	if vehicleGroups == nil {
		resp, err = json.Marshal(make([]VehicleStructs.VehicleGroup, 0, 0))
	} else {
		resp, err = json.Marshal(vehicleGroups)
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
