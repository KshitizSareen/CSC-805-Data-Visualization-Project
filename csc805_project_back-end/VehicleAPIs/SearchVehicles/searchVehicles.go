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
	queryString := fmt.Sprintf("CALL SearchVehicles(%d,%d,%d,%d,%s,NULL,NULL,NULL,%s,NULL,NULL,NULL,%s,'%d','%d','%f','%f','%f','%f');", myRequest.MinPrice, myRequest.MaxPrice, myRequest.MinYear, myRequest.MaxYear, myRequest.Manufacturers, myRequest.FuelTypes, myRequest.VehicleTypes, myRequest.MinMileage, myRequest.MaxMileage, myRequest.MinLat, myRequest.MaxLat, myRequest.MinLong, myRequest.MaxLong)
	query, err := db.Query(queryString)
	var vehicle VehicleStructs.Vehicle
	var vehicles []VehicleStructs.Vehicle
	for query.Next() {
		query.Scan(&vehicle.Index, &vehicle.Price, &vehicle.Year, &vehicle.Manufacturer, &vehicle.Model, &vehicle.Condition, &vehicle.Cylinders, &vehicle.Fuel, &vehicle.Odometer, &vehicle.Title_Status, &vehicle.Transmission, &vehicle.Drive, &vehicle.Type, &vehicle.Image_URL, &vehicle.Description, &vehicle.Lat, &vehicle.Long, &vehicle.Manufacturer_Category, &vehicle.Model_Category, &vehicle.Condition_Category, &vehicle.Cylinders_Category, &vehicle.Fuel_Category, &vehicle.Title_Status_Category, &vehicle.Transmission_Category, &vehicle.Drive_Category, &vehicle.Type_Category, &vehicle.Neighbourhood, &vehicle.City, &vehicle.County, &vehicle.State, &vehicle.Address, &vehicle.Email)
		vehicles = append(vehicles, vehicle)
	}
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var resp []byte
	if vehicles == nil {
		resp, err = json.Marshal(make([]VehicleStructs.Vehicle, 0, 0))
	} else {
		resp, err = json.Marshal(vehicles)
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
