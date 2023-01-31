import { HomeOptions } from "../../utils/HomeUtils";
import {Form} from '../Form';

export const DisplayVehicle = ({listing}) =>{
    console.log(listing);
    const options=[
        {
            inputType: 'textInput',
            label: 'Manufacturer',
            value: listing.Manufacturer,
            disabled: true
        },
        {
            inputType: 'textInput',
            label: "Fuel Type",
            value: listing.Fuel,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Vehicle Type",
            value: listing.Type,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Address",
            value: listing.Address,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Price",
            value: '$ '+listing.Price,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Year",
            value: listing.Year,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Mileage",
            value: listing.Odometer,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "Email",
            value: listing.Email,
            disabled: true,
        }
    ]
    return(
        <Form options={options}/>
    )
}