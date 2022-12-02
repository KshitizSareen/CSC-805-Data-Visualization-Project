package main

import (
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

	db, err := sql.Open("mysql", "root:Ks0756454835@tcp(csc805-datavis-project-database.cbwqxjvaa6sv.us-west-1.rds.amazonaws.com:3306)/DataVis_Project_Database")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	fmt.Println("Success!")

	resp, err := json.Marshal(myRequest)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	return events.APIGatewayProxyResponse{Body: string(resp), StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
