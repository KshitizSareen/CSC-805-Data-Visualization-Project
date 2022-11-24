import pandas as pd

cleanedHousingData = pd.read_csv("./Data/CleanedHousingData.csv")


cleanedHousingData = cleanedHousingData.drop_duplicates(subset=['address'], keep='first')

housingTypes=cleanedHousingData.type.unique()

cleanedHousingData['Type Category'] = cleanedHousingData['type'].replace([i for i in range(len(housingTypes))], ['apartment','condo','house','duplex','townhouse','loft','manufactured','cottage/cabin','flat','in-law','land'])

cleanedHousingData['index'] = [i for i in range(len(cleanedHousingData))]



cleanedHousingData.to_csv('./Data/FormattedHousingData.csv')