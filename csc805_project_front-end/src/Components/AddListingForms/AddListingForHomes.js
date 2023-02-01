import { useContext, useState } from "react"
import UploadContext from "../../Context/UploadContext"
import { homeErrors, HomeOptions, HousingTypeValues, setAddHomeDataState } from "../../utils/HomeUtils"
import { UploadHomeData, UploadImage } from "../../utils/UploadUtils"
import { ValidateAddressOption, ValidateEmail, validateOptions, ValidateSelectOption, validationErrors } from "../../utils/ValidatorFunctions"
import { Form } from "../Form"

export const AddListingForHomes = () => {
    const { addHomeDataState, addHomeDataStateDispatch, imagePositions } = useContext(UploadContext);

    const setPrice = (value) => {
        setAddHomeDataState(value, 'price', addHomeDataStateDispatch)
    }

    const setArea = (value) => {
        setAddHomeDataState(value, 'sqFeet', addHomeDataStateDispatch)
    }

    const setNoOfBeds = (value) => {
        setAddHomeDataState(value, 'noOfBeds', addHomeDataStateDispatch)
    }

    const setNoOfBaths = (value) => {
        setAddHomeDataState(value, 'noOfBaths', addHomeDataStateDispatch)
    }

    const setHousingType = (value) => {
        setAddHomeDataState(value, 'housingTypes', addHomeDataStateDispatch)
    }

    const setHousingOptions = (value) => {
        setAddHomeDataState(value, 'housingOptions', addHomeDataStateDispatch)
    }

    const setAddress = (value) => {
        setAddHomeDataState(value, 'address', addHomeDataStateDispatch)
    }

    const setEmail = (value) => {
        setAddHomeDataState(value, 'email', addHomeDataStateDispatch)
    }


    const [optionErrors, setOptionErrors] = useState(homeErrors)

    const submitOptions = () => {
        const foundErrors = validateOptions(options, setOptionErrors, homeErrors);
        if (!foundErrors) {
            const imageURLs = UploadImage(imagePositions);
            imageURLs.then(data => {
                UploadHomeData(addHomeDataState, "insert-house", data).then(res => {
                    alert(res);
                })
            })
        }
    }

    const options = [
        {
            inputType: 'select',
            options: HousingTypeValues,
            label: 'Home Type',
            value: addHomeDataState.housingTypes,
            onChange: setHousingType,
            error: validationErrors.selectError,
            errorToDisplay: optionErrors.selectHousing,
            validatorFunction: ValidateSelectOption,
            name: 'selectHousing'
        },
        {
            inputType: 'multipleSelect',
            options: HomeOptions,
            label: 'Home Options',
            value: addHomeDataState.housingOptions,
            onChange: setHousingOptions,
        },
        {
            inputType: 'mapsAutocomplete',
            label: 'Address',
            value: addHomeDataState.address,
            onChange: setAddress,
            error: validationErrors.addressError,
            errorToDisplay: optionErrors.address,
            validatorFunction: ValidateAddressOption,
            name: 'address'
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
            inputType: 'textInput',
            label: 'Email',
            value: addHomeDataState.email,
            onChange: setEmail,
            error: validationErrors.emailError,
            errorToDisplay: optionErrors.email,
            validatorFunction: ValidateEmail,
            name: 'email'
        },
        {
            inputType: 'button',
            label: 'Add Home',
            onClick: submitOptions
        }
    ]


    return (
        <Form options={options} />
    )
}