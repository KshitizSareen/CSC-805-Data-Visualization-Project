import React, { useContext } from "react";
import DeckGL from "deck.gl";
import { Map } from "react-map-gl";
import { IconLayer } from '@deck.gl/layers';
import AppContext from '../Context/AppContext';
import { initialViewState } from "../State/MapState";
import { GetMinMaxCoordinates } from "../utils/MapUtils";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export default function MapComponent() {
  const {
    mapDispatch,
    resultsState,
    homeFiltersDispatch,
    carFiltersDispatch,
    carFiltersState
  } = useContext(AppContext);


  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new IconLayer(
      {
        id: 'icon-layer',
        data: resultsState,
        pickable: true,
        getPosition: d => [d.Long, d.Lat],
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: d => 'marker',
        sizeScale: 15,
        getColor: [255, 255, 255],
        onClick: (info) => {

        }
      }
    )
  ];

  const renderDataComponent = (record) => {
    if (record == null) {
      return null;
    }
    return "Address: " + record.Address
  }

  const setViewPort = (viewState) => {
    const minMaxCoordinates = GetMinMaxCoordinates(viewState);
    mapDispatch({
      type: 'changeMapState',
      zoom: viewState.zoom,
      minLat: minMaxCoordinates.minLat,
      maxLat: minMaxCoordinates.maxLat,
      minLong: minMaxCoordinates.minLong,
      maxLong: minMaxCoordinates.maxLong
    })
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: minMaxCoordinates
    })
    carFiltersDispatch({
      type: 'changeCarFiltersState',
      data: minMaxCoordinates
    })

    console.log(carFiltersState);
  }


  return (
    <DeckGL
      layers={layers}
      initialViewState={initialViewState}
      height={window.parent.innerHeight}
      width={0.7 * window.parent.innerWidth}
      controller={true}// allows the user to move the map around
      getTooltip={({ object }) => renderDataComponent(object)}
      onViewStateChange={({ viewState }) => {
        setViewPort(viewState);
      }}
      style={{
        position: 'absolute'
      }}
    >
      <Map
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={'pk.eyJ1Ijoia3NoaXRpejA3IiwiYSI6ImNsYmFrbnF0ajBhaDgzd3BpMnk0Nm84ZGsifQ.uI_5eWkQ7GsYY1J4cDNU1w'}
      />
    </DeckGL>
  )
}