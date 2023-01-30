import { ImageSelector } from "./InputComponents/ImageSelector"

export const ImageCards = ({imageUrls}) =>{
    const {data,isArray,style,width,height,image,position,key} = imageUrls;
    if(!isArray)
    {
        return(
            <ImageSelector key={key} width={width} height={height} index={key}/>
        )
    }
    else
    {
        return(
            <div style={{
                ...style
            }}>
            {
                data.map((elem)=>{
                    return(
                        <ImageCards imageUrls={elem} />
                    )
                })
            }
            </div>
        )
    }
}