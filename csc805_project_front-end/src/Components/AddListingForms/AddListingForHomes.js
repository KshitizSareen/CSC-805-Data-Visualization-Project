import { useContext, useState } from "react"
import UploadContext from "../../Context/UploadContext"
import { HomeOptions, HousingTypeValues, setAddHomeDataState } from "../../utils/HomeUtils"
import { ValidateAddressOption, ValidateMultipleSelectOption, validateOptions, ValidateSelectOption, validationErrors } from "../../utils/ValidatorFunctions"
import { Form } from "../Form"

export const AddListingForHomes = () =>{
    const {addHomeDataState,addHomeDataStateDispatch} = useContext(UploadContext);

    const setPrice = (value)=>{
        setAddHomeDataState(value,'price',addHomeDataStateDispatch)
    }

    const setArea = (value)=>{
        setAddHomeDataState(value,'sqFeet',addHomeDataStateDispatch)
    }

    const setNoOfBeds = (value)=>{
        setAddHomeDataState(value,'noOfBeds',addHomeDataStateDispatch)
    }

    const setNoOfBaths = (value)=>{
        setAddHomeDataState(value,'noOfBaths',addHomeDataStateDispatch)
    }

    const setHousingType = (value)=>{
        setAddHomeDataState(value,'housingTypes',addHomeDataStateDispatch)
    }

    const setHousingOptions = (value)=>{
        setAddHomeDataState(value,'housingOptions',addHomeDataStateDispatch)
    }

    const setAddress = (value)=>{
        console.log(value);
        setAddHomeDataState(value,'address',addHomeDataStateDispatch)
    }


    const [optionErrors,setOptionErrors] = useState(["","",""])

    const submitOptions = () =>{
        const foundErrors= validateOptions(options,setOptionErrors);
        if(!foundErrors)
        {
            console.log("done");
        }

    }

    const options=[
        {
            inputType: 'select',
            options: HousingTypeValues,
            label: 'Home Type',
            value: addHomeDataState.housingTypes,
            onChange: setHousingType,
            error: validationErrors.selectError,
            errorToDisplay: optionErrors[0],
            validatorFunction: ValidateSelectOption
        },
        {
            inputType: 'multipleSelect',
            options: HomeOptions,
            label: 'Home Options',
            value: addHomeDataState.housingOptions,
            onChange: setHousingOptions,
            error: validationErrors.multipleSelectError,
            errorToDisplay: optionErrors[1],
            validatorFunction: ValidateMultipleSelectOption
        },
        {
            inputType: 'mapsAutocomplete',
            label: 'Address',
            value: addHomeDataState.address,
            onChange: setAddress,
            error: validationErrors.addressError,
            errorToDisplay: optionErrors[2],
            validatorFunction: ValidateAddressOption
        },
        {
            inputType: 'slider',
            label: '<label>Price ($)</label>',
            value: addHomeDataState.price,
            onChange: setPrice,
            minValue: 0,
            maxValue: 10000
        },
        {
            inputType: 'slider',
            label: '<label>Sq.Feet (m<sup>2</sup>)</label>',
            value: addHomeDataState.sqFeet,
            onChange: setArea,
            minValue: 0,
            maxValue: 10000
        },
        {
            inputType: 'slider',
            label: '<label>No.of Beds</label>',
            value: addHomeDataState.noOfBeds,
            onChange: setNoOfBeds,
            minValue: 0,
            maxValue: 10
        },
        {
            inputType: 'slider',
            label: '<label>No.of Baths</label>',
            value: addHomeDataState.noOfBaths,
            onChange: setNoOfBaths,
            minValue: 0,
            maxValue: 10
        },
        {
            inputType: 'button',
            label: 'Add Home',
            onClick: submitOptions
          }
    ]


    return(
        <Form options={options}/>
    )
}