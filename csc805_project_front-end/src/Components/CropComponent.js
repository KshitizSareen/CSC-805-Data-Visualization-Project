import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from 'react-easy-crop';
import { InputButton } from "./InputComponents/Buttons";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

export const getCroppedImg = async (imageSrc, crop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    

    /* setting canvas width & height allows us to 
    resize from the original image resolution */
    canvas.width = 250
    canvas.height = 250

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
    )

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        }, 'image/png')
    })
}

export const CropComponent = ({imgUrl,width,height,onCropComplete}) =>{
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels,setCroppedAreaPixels] = useState();
    
    return(
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'white'
        }}>
        <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '80px',
        }}>
         <Cropper
                image={imgUrl}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={(_,croppedAreaPixels)=>{
                    setCroppedAreaPixels(croppedAreaPixels);
                }}
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
                cropSize={{
                    width: width,
                    height: height
                }}
            />
      </div>
      <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          width: '50%',
          height: '40px',
          display: 'flex',
          alignItems: 'center'
      }}>
      <InputButton label="Crop Image" onClick={()=>{
        onCropComplete(croppedAreaPixels);
      }}/>
      </div>
      </div>
    )
}