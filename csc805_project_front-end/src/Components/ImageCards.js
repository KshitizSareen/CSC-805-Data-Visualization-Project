export const ImageCards = ({ imageUrls, Component, imagePositions }) => {
    const { data, isArray, style, width, height, image, key } = imageUrls;
    if (!isArray) {
        return (
            <Component key={key} width={width} height={height} index={key} image={image} imageURL={imagePositions !== undefined && key < imagePositions.length ? imagePositions[key].imageURL : ""} />
        )
    }
    else {
        return (
            <div style={{
                ...style
            }}>
                {
                    data.map((elem, index) => {
                        return (
                            <ImageCards key={index} imageUrls={elem} Component={Component} imagePositions={imagePositions} />
                        )
                    })
                }
            </div>
        )
    }
}