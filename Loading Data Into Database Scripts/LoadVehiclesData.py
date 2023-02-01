import pandas as pd
import numpy as np
import pymysql


carData = pd.read_csv('./Data/FormattedCarData.csv')


conn = pymysql.connect(host="csc805-datavis-project-database.cbwqxjvaa6sv.us-west-1.rds.amazonaws.com",
                       port=3306,
                       user="root",
                       password="Ks0756454835",
                       db="DataVis_Project_Database",
                       charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor)


mycursor = conn.cursor()


def isNaN(num):
    return num != num


k = 1
for ind in carData.index:
    values = ()
    for column in carData:
        if column == 'index':
            values += (k,)
            k += 1
        else:
            if isinstance(carData[column][ind], np.int64):
                if np.isnan(carData[column][ind]):
                    values += ('0',)
                else:
                    values += (str(carData[column][ind]),)
            elif isinstance(carData[column][ind], np.float64):
                if np.isnan(carData[column][ind]):
                    values += ('0',)
                else:
                    values += (str(carData[column][ind]),)
            else:
                if isNaN(carData[column][ind]):
                    values += ('',)
                else:
                    values += (carData[column][ind],)
    print(values)
    sql = "INSERT INTO Vehicle_Data VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

    # print(len(values))
    mycursor.execute(sql, values)
    conn.commit()

print(mycursor.rowcount, "record inserted.")
