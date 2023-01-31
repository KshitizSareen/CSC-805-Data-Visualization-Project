import { HomeOptions } from "../../utils/HomeUtils";
import {Form} from '../Form';

export const DisplayHome = ({listing}) =>{
    console.log(listing);
    const options=[
        {
            inputType: 'textInput',
            label: 'Home Type',
            value: listing.Type_Category.split(" ").map(value=>value[0].toUpperCase() + value.slice(1, value.length)).join(),
            disabled: true
        },
        {
            inputType: 'textInput',
            label: "Amentities",
            value: HomeOptions.filter(option=>listing[option.name]===1).map(option=>option.label).join(', '),
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
            label: "SqFeet",
            value: listing.SqFeet,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "No. of Beds",
            value: listing.Beds,
            disabled: true,
        },
        {
            inputType: 'textInput',
            label: "No. of Baths",
            value: listing.Baths,
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