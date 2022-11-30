import pandas as pd
import json
carDataFrame=pd.read_csv("./Data/vehicles.csv")

cleanedCarDataFrame = carDataFrame.dropna(subset=['id', 'url','price','year','manufacturer','model','condition','cylinders','fuel','odometer','title_status','transmission','drive','type','image_url', 'lat','long']).drop(columns=['id','url','region','region_url', 'state','VIN','county','posting_date','size','paint_color'])


carModels=cleanedCarDataFrame.model.unique()

modelsSet={}
models={}
k=0
for ind in cleanedCarDataFrame.index:
    model=cleanedCarDataFrame['model'][ind]
    splitTemp = model.split(' ')
    newWordArray=[]
    for word in splitTemp:
        if word!="":
            newWordArray.append(word[0].upper()+word[1:])      
    newModel = ' '.join(newWordArray)
    if not modelsSet.get(newModel):
        modelsSet[newModel]=True
        manufacturer = cleanedCarDataFrame['manufacturer'][ind]
        splitTemp = manufacturer.split(' ')
        newWordArray=[]
        for word in splitTemp:
            if word!="":
                newWordArray.append(word[0].upper()+word[1:])      
        newManufacturer = ' '.join(newWordArray)
        if not models.get(newManufacturer):
            models[newManufacturer]=[{'name':newModel,'id':k}]
        else:
            models[newManufacturer].append({'name':newModel,'id':k})
        k+=1

with open("carModels.json", "w") as final:
    json.dump(models, final)


"""
carManufacturers=cleanedCarDataFrame.manufacturer.unique()


DataFrameArray=[]
k=0
for word in carManufacturers:
    splitTemp = word.split(' ')
    newWordArray=[]
    for word in splitTemp:
        if word!="":
            newWordArray.append(word[0].upper()+word[1:])
    DataFrameArray.append({
        'name': ' '.join(newWordArray),
        'id': k
    })
    k+=1
with open("carManufacturers.json", "w") as final:
    json.dump(DataFrameArray, final)


  

carModels=cleanedCarDataFrame.model.unique()

DataFrameArray=[]
k=0
for word in carModels:
    splitTemp = word.split(' ')
    newWordArray=[]
    for word in splitTemp:
        if word!="":
            newWordArray.append(word[0].upper()+word[1:])
    DataFrameArray.append({
        'name': ' '.join(newWordArray),
        'id': k
    })
    k+=1
with open("carModels.json", "w") as final:
    json.dump(DataFrameArray, final)

exit()


carConditions = cleanedCarDataFrame.condition.unique()

carCylinders = cleanedCarDataFrame.cylinders.unique()

"""

"""
carFuelTypes = cleanedCarDataFrame.fuel.unique()



carTitleStatus = cleanedCarDataFrame.title_status.unique()

"""

"""
carTransmissionTypes = cleanedCarDataFrame.transmission.unique()
print(carTransmissionTypes)

exit()



carDriveTypes = cleanedCarDataFrame.drive.unique()
"""

"""
carTypes = cleanedCarDataFrame.type.unique()

print(carTypes)

"""




"""


cleanedCarDataFrame['Manufacturer Category'] = cleanedCarDataFrame['manufacturer'].replace(carManufacturers, [i for i in range(len(carManufacturers))])
cleanedCarDataFrame['Model Category'] = cleanedCarDataFrame['model'].replace(carModels, [i for i in range(len(carModels))])
cleanedCarDataFrame['Condtion Category'] = cleanedCarDataFrame['condition'].replace(carConditions, [i for i in range(len(carConditions))])
cleanedCarDataFrame['Cylinders Category'] = cleanedCarDataFrame['cylinders'].replace(carCylinders, [i for i in range(len(carCylinders))])
cleanedCarDataFrame['Fuel Category'] = cleanedCarDataFrame['fuel'].replace(carFuelTypes, [i for i in range(len(carFuelTypes))])
cleanedCarDataFrame['Title_status Category'] = cleanedCarDataFrame['title_status'].replace(carTitleStatus, [i for i in range(len(carTitleStatus))])
cleanedCarDataFrame['Transmission Category'] = cleanedCarDataFrame['transmission'].replace(carTransmissionTypes, [i for i in range(len(carTransmissionTypes))])
cleanedCarDataFrame['Drive Category'] = cleanedCarDataFrame['drive'].replace(carDriveTypes, [i for i in range(len(carDriveTypes))])
cleanedCarDataFrame['Type Category'] = cleanedCarDataFrame['type'].replace(carTypes, [i for i in range(len(carTypes))])

cleanedCarDataFrame=cleanedCarDataFrame.drop_duplicates(subset=['lat', 'long'], keep='first')


cleanedCarDataFrame = cleanedCarDataFrame.iloc[::2,:]




neighbourhoods=[]
cities=[]
counties=[]
states=[]
addresses=[]



for ind in cleanedCarDataFrame.index:
    address = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+str(cleanedCarDataFrame['lat'][ind])+','+str(cleanedCarDataFrame['long'][ind])+'+&key=AIzaSyBrJrhdPowQtFEeLiX_cdXjc8E9C4IVtyw')
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

cleanedCarDataFrame['neighbourhood'] = neighbourhoods
cleanedCarDataFrame['city'] = cities
cleanedCarDataFrame['county'] = counties
cleanedCarDataFrame['state'] = states
cleanedCarDataFrame['address']=addresses

cleanedCarDataFrame=cleanedCarDataFrame.dropna(subset=['neighbourhood','city','county','state','address'])

cleanedCarDataFrame.to_csv('./Data/CleanedCarData.csv')

"""

