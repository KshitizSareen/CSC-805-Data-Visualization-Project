import { ImageSelector } from "./InputComponents/ImageSelector"

export const ImageCards = ({imageUrls,Component,imagePositions}) =>{
    const {data,isArray,style,width,height,image,key} = imageUrls;
    if(!isArray)
    {
        console.log(imagePositions);
        return(
            <Component key={key} width={width} height={height} index={key} image={image} imageURL={imagePositions!==undefined && key < imagePositions.length ? imagePositions[key].imageURL : ""}/>
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
                        <ImageCards imageUrls={elem} Component={Component} imagePositions={imagePositions}/>
                    )
                })
            }
            </div>
        )
    }
}