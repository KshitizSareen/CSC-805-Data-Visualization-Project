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
    if len(jsonAddress["results"])>0 and len(jsonAddress["results"][0]["address_components"])>5:
        addresses.append(jsonAddress["results"][0]["formatted_address"])
        neighbourhoods.append(jsonAddress["results"][0]["address_components"][2]["long_name"])
        cities.append(jsonAddress["results"][0]["address_components"][3]["long_name"])
        counties.append(jsonAddress["results"][0]["address_components"][4]["long_name"])
        states.append(jsonAddress["results"][0]["address_components"][5]["long_name"])
    else:
        addresses.append(None)
        neighbourhoods.append(None)
        cities.append(None)
        counties.append(None)
        states.append(None)
    print(addresses[-1])

cleanedHousingDataFrame['neighbourhood'] = neighbourhoods
cleanedHousingDataFrame['city'] = cities
cleanedHousingDataFrame['county'] = counties
cleanedHousingDataFrame['state'] = states
cleanedHousingDataFrame['address']=addresses

cleanedHousingDataFrame=cleanedHousingDataFrame.dropna(subset=['neighbourhood','city','county','state','address'])

cleanedHousingDataFrame.to_csv('./Data/CleanedHousingData.csv')




