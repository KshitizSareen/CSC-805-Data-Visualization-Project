import { useContext, useState } from "react";
import UploadContext from "../Context/UploadContext";
import { AddListingForHomes } from "./AddListingForms/AddListingForHomes";
import { AddListingForVehicles } from "./AddListingForms/AddListingForVehicles";
import { CategoryHeadersComponent } from "./CategoryHeadersComponent";

export const AddListingForms = () =>{

    const [
        initialCategory,
        setInitialCategory
    ]= useState('1')

    const {
        hideForm
    } = useContext(UploadContext);
    
      const radios = [
        { name: 'Homes', value: '1' },
        { name: 'Vehicles', value: '2' },
      ];
    return(
        <div style={{
            width: '50vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: hideForm ?  'flex': 'none',
            flexDirection: 'column',
        }}>
            <CategoryHeadersComponent radios={radios} Category={initialCategory} SetCategory={setInitialCategory}/>
            {
                initialCategory === '1' ?
                <AddListingForHomes/>
                : 
                <AddListingForVehicles/>
            }
        </div>
    )
}