import axios from "axios"
import { WebMercatorViewport } from '@deck.gl/core';

export const GetMinMaxCoordinates = (mapState) => {

    const viewport = new WebMercatorViewport(mapState);
    let topLeft = viewport.unproject([0, 0]);
    let bottomRight = viewport.unproject([0.7 * window.parent.innerWidth, window.parent.innerHeight]);

    return {
        minLat: bottomRight[1],
        maxLat: topLeft[1],
        minLong: topLeft[0],
        maxLong: bottomRight[0]
    }
}

const SetMapData = (filters, dispatchFunction, endPoint) => {
    axios.post(process.env.REACT_APP_API_URL + endPoint, filters).then(res => {

        dispatchFunction({
            type: 'changeResultsState', results: res.data
        })
    }).catch(() => {
        alert("Please Narrow Down Your Search")
    })
}

export { SetMapData };