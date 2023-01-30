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
	var myRequest ImageStructs.ImageFilters
	json.Unmarshal([]byte(req.Body), &myRequest)
	db, err := sql.Open("mysql", "root:"+env.DBPassword+"@tcp("+env.DBHost+")/"+env.DBName)
	defer db.Close()
	queryString := fmt.Sprintf("CALL GetImage(%s,%d);",
		myRequest.Type, myRequest.ListingID)
	query, err := db.Query(queryString)
	defer query.Close()
	if err != nil {
		panic(err.Error())
	}
	var image ImageStructs.ImageObject
	var images []ImageStructs.ImageObject
	for query.Next() {
		query.Scan(&image.Position, &image.ImageURL)
		images = append(images, image)
	}
	var resp []byte
	if images == nil {
		resp, err = json.Marshal(make([]ImageStructs.ImageObject, 0, 0))
	} else {
		resp, err = json.Marshal(images)
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
