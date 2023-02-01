import S3 from 'react-aws-s3';
import uuid from 'react-uuid';
import axios from 'axios';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAP_KEY);

const config = {
    bucketName: 'csc805-data-storage-bucket',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
}

const ReactS3Client = new S3(config);
window.Buffer = window.Buffer || require("buffer").Buffer;


export const UploadImage = async (images) => {
    // here image is url/location of image
    const imageURLS = [];
    for (const image of images) {
        if (image !== "") {
            let blob = await fetch(image).then(r => r.blob());
            const imageData = await ReactS3Client.uploadFile(blob, uuid() + '.png');
            imageURLS.push(imageData.location);
        }
        else {
            imageURLS.push("");
        }
    }
    return imageURLS;
}

export const UploadHomeData = async (homeData, endPoint, images) => {
    let filters = {
        "Price": homeData.price,
        "Type": homeData.housingTypes.value,
        "SqFeet": homeData.sqFeet,
        "Beds": homeData.noOfBeds,
        "Baths": homeData.noOfBaths,
        "CatsAllowed": 0,
        "DogsAllowed": 0,
        "SmokingAllowed": 0,
        "WheelchairAccess": 0,
        "ElectricVehicleCharge": 0,
        "ComesFurnished": 0,
        "Type_Category": "'" + homeData.housingTypes.label + "'",
        "Email": "'" + homeData.email + "'"
    }
    const { housingOptions } = homeData;
    housingOptions.forEach(option => {
        const { name } = option;
        filters[name] = 1;
    })
    const address = await getAddressComponents(homeData.address);
    filters = {
        ...filters,
        ...address
    }
    const res = await axios.post(process.env.REACT_APP_API_URL + endPoint, filters);
    const listingIndex = res.data;
    const uploadRes = await uploadImagePositionsToDatabase(images, "upload-image", "Home", listingIndex);
    return uploadRes;
}

export const UploadVehicleData = async (vehicleData, endPoint, images) => {
    let filters = {
        "Price": vehicleData.price,
        "Year": vehicleData.year,
        "Manufacturer": "'" + vehicleData.vehicleManufacturer.label + "'",
        "Fuel": "'" + vehicleData.fuelType.label + "'",
        "Odometer": vehicleData.mileage,
        "Type": "'" + vehicleData.vehicleType.label + "'",
        "Manufacturer_Category": vehicleData.vehicleManufacturer.id,
        "Fuel_Category": vehicleData.fuelType.value,
        "Type_Category": vehicleData.vehicleType.value,
        "Email": "'" + vehicleData.email + "'"
    }
    const address = await getAddressComponents(vehicleData.address);
    filters = {
        ...filters,
        ...address
    }
    const res = await axios.post(process.env.REACT_APP_API_URL + endPoint, filters);
    const listingIndex = res.data;
    const uploadRes = await uploadImagePositionsToDatabase(images, "upload-image", "Vehicle", listingIndex);
    return uploadRes;
}

const getAddressComponents = async (address) => {
    const { label } = address;
    const addressResponse = await Geocode.fromAddress(label);
    const { results } = addressResponse;
    const addressComponent = {
        "Neighbourhood": "''",
        "City": "''",
        "County": "''",
        "State": "''",
        "Address": "''",
        "Lat": 0,
        "Long": 0,
    }

    if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        addressComponent["Lat"] = lat;
        addressComponent["Long"] = lng;
        const addressComponents = results[0]["address_components"]
        let foundNeighbourhood = false
        let foundNeighbourhoodIndex = 0
        let foundCity = false
        let foundCityIndex = 0
        let foundCounty = false
        let foundCountyIndex = 0
        let foundState = false
        let foundStateIndex = 0
        for (let i = 0; i < addressComponents.length; i++) {
            if (addressComponents[i]['types'][0] === 'locality') {
                foundCity = true
                foundCityIndex = i
                if (i - 1 >= 0) {
                    foundNeighbourhood = true
                    foundNeighbourhoodIndex = i - 1
                }
            }
            if (addressComponents[i]['types'][0] === 'administrative_area_level_2') {
                foundCounty = true
                foundCountyIndex = i
            }
            if (addressComponents[i]['types'][0] === 'administrative_area_level_1') {
                foundState = true
                foundStateIndex = i
            }
        }

        if (foundNeighbourhood && foundCity && foundCounty && foundState) {
            addressComponent["Neighbourhood"] = "'" + addressComponents[foundNeighbourhoodIndex]["long_name"] + "'"
            addressComponent["City"] = "'" + addressComponents[foundCityIndex]["long_name"] + "'"
            addressComponent["County"] = "'" + addressComponents[foundCountyIndex]["long_name"] + "'"
            addressComponent["State"] = "'" + addressComponents[foundStateIndex]["long_name"] + "'"
            addressComponent["Address"] = "'" + label + "'"
        }
    }
    return addressComponent;
}

const uploadImagePositionsToDatabase = async (images, endPoint, type, listingID) => {
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await axios.post(process.env.REACT_APP_API_URL + endPoint,
            {
                "type": "'" + type + "'",
                "listingID": listingID,
                "imageURL": "'" + image + "'",
                "position": i
            })
    }
    return "Upload Succesfull"
}

export const getImages = async (type, listingID, endpoint, setImages) => {
    const res = await axios.post(process.env.REACT_APP_API_URL + endpoint, {
        Category: "'" + type + "'",
        listingID: listingID
    })
    return res.data;
}