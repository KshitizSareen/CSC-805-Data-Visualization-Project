import pandas as pd
import requests

housingDataFrame=pd.read_csv("./Data/housing.csv")

cleanedHousingDataFrame = housingDataFrame.dropna(subset=['id', 'url','price','type','sqfeet','beds','baths','lat','long']).drop(columns=['id','url','region','region_url', 'state'])

housingTypes=cleanedHousingDataFrame.type.unique()


HousingTypeMap={}

cleanedHousingDataFrame['type'] = cleanedHousingDataFrame['type'].replace(['apartment','condo','house','duplex','townhouse','loft','manufactured','cottage/cabin','flat','in-law','land','assisted living'], [i for i in range(len(housingTypes))])

cleanedHousingDataFrame=cleanedHousingDataFrame.drop_duplicates(subset=['lat', 'long'], keep='first')


cleanedHousingDataFrame = cleanedHousingDataFrame.iloc[::4,:]




neighbourhoods=[]
cities=[]
counties=[]
states=[]
addresses=[]



for ind in cleanedHousingDataFrame.index:
    address = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+str(cleanedHousingDataFrame['lat'][ind])+','+str(cleanedHousingDataFrame['long'][ind])+'+&key=AIzaSyBrJrhdPowQtFEeLiX_cdXjc8E9C4IVtyw')
    jsonAddress=address.json()
    if len(jsonAddress["results"])>0:
        addressComponents=jsonAddress["results"][0]["address_components"]
        foundNeighbourhood=False
        foundNeighbourhoodIndex=0
        foundCity=False
        foundCityIndex=0
        foundCounty=False
        foundCountyIndex=0
        foundState=False
        foundStateIndex=0
        for i in range(len(addressComponents)):
            if addressComponents[i]['types'][0]=='locality':
                foundCity=True
                foundCityIndex=i
                if i-1>=0:
                    foundNeighbourhood=True
                    foundNeighbourhoodIndex=i-1
            if addressComponents[i]['types'][0]=='administrative_area_level_2':
                foundCounty=True
                foundCountyIndex=i
            if addressComponents[i]['types'][0]=='administrative_area_level_1':
                foundState=True
                foundStateIndex=i
        
        if foundNeighbourhood and foundCity and foundCounty and foundState:
            neighbourhoods.append(addressComponents[foundNeighbourhoodIndex]["long_name"])
            cities.append(addressComponents[foundCityIndex]["long_name"])
            counties.append(addressComponents[foundCountyIndex]["long_name"])
            states.append(addressComponents[foundStateIndex]["long_name"])
            addresses.append(jsonAddress["results"][0]["formatted_address"])
        else:
            addresses.append(None)
            neighbourhoods.append(None)
            cities.append(None)
            counties.append(None)
            states.append(None)
    else:
        addresses.append(None)
        neighbourhoods.append(None)
        cities.append(None)
        counties.append(None)
        states.append(None)
    

cleanedHousingDataFrame['neighbourhood'] = neighbourhoods
cleanedHousingDataFrame['city'] = cities
cleanedHousingDataFrame['county'] = counties
cleanedHousingDataFrame['state'] = states
cleanedHousingDataFrame['address']=addresses

cleanedHousingDataFrame=cleanedHousingDataFrame.dropna(subset=['neighbourhood','city','county','state','address'])

cleanedHousingDataFrame.to_csv('./Data/CleanedHousingData.csv')




