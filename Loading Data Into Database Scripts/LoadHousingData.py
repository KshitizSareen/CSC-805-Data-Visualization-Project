import mysql.connector
import pandas as pd
import numpy as np
import pymysql
import math


housingData = pd.read_csv('./Data/FormattedHousingData.csv')


conn = pymysql.connect(host="csc805-datavis-project-database.cbwqxjvaa6sv.us-west-1.rds.amazonaws.com",
                        port=3306,
                        user="root",
                        password="Ks0756454835",
                        db="DataVis_Project_Database",
                        charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor)


mycursor = conn.cursor()

def isNaN(num):
    return num != num

k=1
for ind in housingData.index:
    values=()
    for column in housingData:
        if column=='index':
            values+=(k,)
            k+=1
        else:
            if isinstance(housingData[column][ind],np.int64) :
                if np.isnan(housingData[column][ind]):
                    values+=('0',)
                else:
                    values+=(str(housingData[column][ind]),) 
            elif isinstance(housingData[column][ind],np.float64) :
                if np.isnan(housingData[column][ind]):
                    values+=('0',)
                else:
                    values+=(str(housingData[column][ind]),) 
            else:
                if isNaN(housingData[column][ind]):
                    values+=('',)
                else:
                    values+=(housingData[column][ind],) 
    print(values)
    sql = "INSERT INTO Housing_Data VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

    #print(len(values))
    mycursor.execute(sql, values)
    conn.commit()

print(mycursor.rowcount, "record inserted.")

