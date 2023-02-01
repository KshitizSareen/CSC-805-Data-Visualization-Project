import { useState } from "react";
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from 'react-easy-crop';
import { InputButton } from "./InputComponents/Buttons";
import '../styles/cropper.css';

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

export const getCroppedImg = async (imageSrc, crop, width, height) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')



    /* setting canvas width & height allows us to 
    resize from the original image resolution */
    canvas.width = width
    canvas.height = height

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

export const CropComponent = ({ imgUrl, width, height, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState();

    return (
        <div className="cropContainer">
            <div className="cropCanvas">
                <Cropper
                    image={imgUrl}
                    crop={crop}
                    onCropChange={setCrop}
                    onCropComplete={(_, croppedAreaPixels) => {
                        setCroppedAreaPixels(croppedAreaPixels);
                    }}
                    cropSize={{
                        width: width,
                        height: height
                    }}
                />
            </div>
            <div className="cropButton">
                <InputButton label="Crop Image" onClick={() => {
                    onCropComplete(croppedAreaPixels);
                }} />
            </div>
        </div>
    )
}