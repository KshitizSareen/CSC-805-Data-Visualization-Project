package main

import (
	env "csc805_project_back-end/Env"
	"csc805_project_back-end/Images/ImageStructs"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

func HandleLambdaEvent(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var myRequest ImageStructs.ImageObject
	json.Unmarshal([]byte(req.Body), &myRequest)
	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL InsertImage(%s,%d,%s,%d);",
		myRequest.Type, myRequest.ListingID, myRequest.ImageURL, myRequest.Position)
	query, err := db.Query(queryString)
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var HeaderBody map[string]string = make(map[string]string)
	HeaderBody["Access-Control-Allow-Headers"] = "Content-Type"
	HeaderBody["Access-Control-Allow-Origin"] = "*"
	HeaderBody["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,ANY"
	return events.APIGatewayProxyResponse{Body: "Image Inserted Succesfully", Headers: HeaderBody, StatusCode: 200}, nil

}

func main() {
	lambda.Start(HandleLambdaEvent)
}
