import { useReducer, useState } from "react"
import UploadContext from "../Context/UploadContext"
import { AddHomesDataStateReducer, initialAddHomeDataState } from "../State/AddHomeDataState"
import { AddVehiclesDataStateReducer, initialAddVehicleDataState } from "../State/AddVehicleDataState"
import { imageURLSState, initialImagePositions } from "../State/ImageURLsState"
import { AddListingForms} from "./AddListingForms"
import { ImageCards } from "./ImageCards"


export const UploadListing = () => {

    const [addHomeDataState,addHomeDataStateDispatch] = useReducer(AddHomesDataStateReducer,initialAddHomeDataState);
    const [addVehicleDataState,addVehicleDataStateDispatch] = useReducer(AddVehiclesDataStateReducer,initialAddVehicleDataState);
    const [imagePositions,setImagePositions] = useState(initialImagePositions);
    const [hideForm,showHideForm] = useState(true);

    return(
        <UploadContext.Provider value={{
            addHomeDataState,
            addHomeDataStateDispatch,
            hideForm,
            showHideForm,
            imagePositions,
            setImagePositions,
            addVehicleDataState,
            addVehicleDataStateDispatch
        }}>
    <div style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        width: '100vw',
        height: '100vh',
    }}>
        <ImageCards imageUrls={imageURLSState}/>
        <AddListingForms/>
    </div>
    </UploadContext.Provider>
    )
}
