import pandas as pd

cleanedCarData = pd.read_csv("./Data/CleanedCarData.csv")


cleanedCarData = cleanedCarData.drop_duplicates(subset=['address'], keep='first')

cleanedCarData['index'] = [i for i in range(len(cleanedCarData))]

cleanedCarData.to_csv('./Data/FormattedCarData.csv')