import React, { useContext, useState } from "react"
import { FaCamera, FaImage } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import UploadContext from "../../Context/UploadContext";
import { CropComponent, getCroppedImg } from "../CropComponent";

export const ImageSelector = ({width,height,index}) =>{
    
    const [imageURL,setImageURL] = useState("");
    const fileInput = React.useRef(null);
    const onInputClick = () =>{
        fileInput.current.click();
    }
    
    const [showCropper,setShowCropper] = useState(false);
    const {
        showHideForm,
        imagePositions,
        setImagePositions
    } = useContext(UploadContext);

    const onCropComplete = async (croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(
            imageURL,
            croppedAreaPixels
        )
        const croppedURL = URL.createObjectURL(croppedImage);
        setImageURL(croppedURL);
        setShowCropper(false);
        showHideForm(true);
        const newImagePositions = [...imagePositions];
        newImagePositions[index] = croppedURL;
        setImagePositions(newImagePositions);
        console.log(newImagePositions);
    }

    const onChange=(event)=>{
        console.log("Test");
        if (event.target.files && event.target.files[0]) {
            setImageURL(URL.createObjectURL(event.target.files[0]));
            setShowCropper(true);
            showHideForm(false);
            document.getElementById('file_input'+index).value = null;
    }
}

    return(
        <>
        <div style={{
            width: width+'vw',
            height: height+'vh',
            borderColor: "#fce6c2",
            border: '5px solid rgba(0, 0, 0, 0.05)', 
            justifyContent: 'center',
            alignItems: 'center',
            display: showCropper ? 'none' : 'flex'
        }} onClick={onInputClick}>
            <input id={"file_input"+index} type="file" ref={fileInput} style={{
                display: 'none'
            }} accept="image/*" onChange={onChange}/>
            {
                imageURL !== "" ?
                <img src={imageURL} style={{
                    width: '100%',
                    height: '100%',
                }} alt=""/>
                :
            <FaCamera size={1.5*Math.max(width,height)} color="#fce6c2"/>
            }
        </div>
        {
                showCropper ? <CropComponent imgUrl={imageURL} 
                setShowCropper={setShowCropper} 
                setImageURL={setImageURL} 
                width={width/100*window.parent.innerWidth} 
                height={height/100*window.parent.innerHeight} 
                showHideForm={showHideForm}
                onCropComplete={onCropComplete}/> :
                null
            }
        </>
    )
} 