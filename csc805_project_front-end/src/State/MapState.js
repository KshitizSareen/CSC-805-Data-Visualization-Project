
export const initialViewState = {
  "width": 0.7 * window.parent.innerWidth,
  "height": window.parent.innerHeight,
  "latitude": 37.0902,
  "longitude": -95.7129,
  "zoom": 3.5,
  "bearing": 0,
  "pitch": 0,
  "altitude": 1.5,
  "maxZoom": 20,
  "minZoom": 0,
  "maxPitch": 60,
  "minPitch": 0,
  "normalize": true,
  "position": [
    0,
    0,
    0
  ]
}

export const initialMapState = {
  zoom: 3.5,
  minLat: 0,
  maxLat: 0,
  minLong: 0,
  maxLong: 0
}

export default function MapReducer(state, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'changeMapState': {
      return {
        ...state,
        zoom: action.zoom,
        minLat: action.minLat,
        maxLat: action.maxLat,
        minLong: action.minLong,
        maxLong: action.maxLong
      }
    }

    case 'changeViewState': {
      return {
        ...state,
        ...action.viewState
      }
    }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}