import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { ImageCards } from "./ImageCards"
import imageURLsStateReducer, { imageURLSState, initialImagePositions } from "../State/ImageURLsState";
import axios from "axios";
import { getImages } from "../utils/UploadUtils";
import { FaCamera } from "react-icons/fa";
import { ImageDisplay } from "./ImageDisplay";
import { DisplayHome } from "./DisplayListings/DisplayHome";
import { DisplayVehicle } from "./DisplayListings/DisplayVehicle";


export const DisplayListing = () =>{
    const location = useLocation();
    const {listing,resImages} = location.state;
    console.log(resImages);
    return(
        <div style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            width: '100vw',
            height: '100vh',
        }}>
            <ImageCards imageUrls={imageURLSState} Component={ImageDisplay} imagePositions={resImages}/>
            <div style={{
            width: '50vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {
                listing.SqFeet!== undefined ?
            <DisplayHome listing={listing}/>
            :
            <DisplayVehicle listing={listing}/>
}
            </div>
        </div>
    )
}