import { useContext, useState } from "react"
import UploadContext from "../../Context/UploadContext"
import { fuelTypes, Manufacturers, setAddVehicleDataState, vehicleTypes } from "../../utils/CarUtils"
import { HomeOptions, HousingTypeValues, setAddHomeDataState } from "../../utils/HomeUtils"
import { ValidateAddressOption, ValidateMultipleSelectOption, validateOptions, ValidateSelectOption, validationErrors } from "../../utils/ValidatorFunctions"
import { Form } from "../Form"

export const AddListingForVehicles = () =>{
    const {            addVehicleDataState,
        addVehicleDataStateDispatch} = useContext(UploadContext);

    const setPrice = (value)=>{
        setAddVehicleDataState(value,'price',addVehicleDataStateDispatch)
    }

    const setYear = (value)=>{
        setAddVehicleDataState(value,'year',addVehicleDataStateDispatch)
    }

    const setMileage = (value)=>{
        setAddVehicleDataState(value,'mileage',addVehicleDataStateDispatch)
    }

    const setVehicleManufacturers = (value)=>{
        setAddVehicleDataState(value,'vehicleManufacturer',addVehicleDataStateDispatch)
    }

    const setFuelTypes = (value)=>{
        setAddVehicleDataState(value,'fuelType',addVehicleDataStateDispatch)
    }

    const setVehicleTypes = (value)=>{
        setAddVehicleDataState(value,'vehicleType',addVehicleDataStateDispatch)
    }

    const setAddress = (value)=>{
        setAddVehicleDataState(value,'address',addVehicleDataStateDispatch)
    }


    const [optionErrors,setOptionErrors] = useState(["","","",""])

    const submitOptions = () =>{
        const foundErrors= validateOptions(options,setOptionErrors);
        if(!foundErrors)
        {
            console.log(addVehicleDataState);
        }

    }

    const options=[
        {
            inputType: 'select',
            options: Manufacturers,
            label: 'Manufacturer',
            value: addVehicleDataState.vehicleManufacturer,
            onChange: setVehicleManufacturers,
            error: validationErrors.selectError,
            errorToDisplay: optionErrors[0],
            validatorFunction: ValidateSelectOption
        },
        {
            inputType: 'select',
            options: fuelTypes,
            label: 'Fuel Type',
            value: addVehicleDataState.fuelType,
            onChange: setFuelTypes,
            error: validationErrors.selectError,
            errorToDisplay: optionErrors[1],
            validatorFunction: ValidateSelectOption
        },
        {
            inputType: 'select',
            options: vehicleTypes,
            label: 'Vehicle Type',
            value: addVehicleDataState.vehicleType,
            onChange: setVehicleTypes,
            error: validationErrors.selectError,
            errorToDisplay: optionErrors[2],
            validatorFunction: ValidateSelectOption
        },
        {
            inputType: 'mapsAutocomplete',
            label: 'Address',
            value: addVehicleDataState.address,
            onChange: setAddress,
            error: validationErrors.addressError,
            errorToDisplay: optionErrors[3],
            validatorFunction: ValidateAddressOption
        },
        {
            inputType: 'slider',
            label: '<label>Price ($)</label>',
            value: addVehicleDataState.price,
            onChange: setPrice,
            minValue: 0,
            maxValue: 100000
        },
        {
            inputType: 'slider',
            label: '<label>Year</label>',
            value: addVehicleDataState.year,
            onChange: setYear,
            minValue: 1950,
            maxValue: 2023
        },
        {
            inputType: 'slider',
            label: '<label>Mileage (mi)</label>',
            value: addVehicleDataState.mileage,
            onChange: setMileage,
            minValue: 0,
            maxValue: 100000
        },
        {
            inputType: 'button',
            label: 'Add Vehicle',
            onClick: submitOptions
          }
    ]


    return(
        <Form options={options}/>
    )
}