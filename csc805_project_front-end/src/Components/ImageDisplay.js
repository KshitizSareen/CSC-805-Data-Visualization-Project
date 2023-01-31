import { FaCamera, FaImage } from "react-icons/fa"

export const ImageDisplay = ({width,height,imageURL}) =>{
    const displayImage = ()=>{
        window.open(imageURL,'_blank')
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
            display: 'flex'
        }}>
            {
                imageURL !== "" ?
                <img src={imageURL} style={{
                    width: '100%',
                    height: '100%',
                }} alt="" onClick={displayImage}/>
                :
            <FaCamera size={1.5*Math.max(width,height)} color="#fce6c2"/>
            }
        </div>
        </>
    )
} 