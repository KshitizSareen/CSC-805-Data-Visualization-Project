import React, { useState } from "react";
import DeckGL from "deck.gl";
import { Map } from "react-map-gl";
import {IconLayer} from '@deck.gl/layers';
import {WebMercatorViewport} from '@deck.gl/core';


const statesGeoJSONData = require("../Data/usa_state_long_lat.json");
const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function MapComponent()
{


    const viewState = {

        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
    }

  const stateLayers = [
    // only needed when using shadows - a plane for shadows to drop on
    new IconLayer(
      {
      id: 'icon-layer-states',
      data: statesGeoJSONData,
      pickable: true,
      getPosition: d => [d.longitude,d.latitude],
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 15,
      getColor: [255,255,255],
      onClick : (info)=>{
        // zoomToCounties(info.object)
        //setLayer(countyLayers)
      }
    }
    )
  ];

    const [currentLayer,setLayer]=useState(
        stateLayers
      )
    return(
        <DeckGL
        layers={currentLayer}
         initialViewState={viewState}
         height={window.parent.innerHeight}
         width={0.7*window.parent.innerWidth}
         controller={true}// allows the user to move the map around
         getTooltip={({object}) => object && `${object.state ? object.state : object.name ? object.name : object.city}\n${1932}`} 
         onViewStateChange={({viewState})=>{
          const viewport = new WebMercatorViewport(viewState);
          console.log(viewport.unproject([0,0]));
          console.log(viewport.unproject([viewState.width,viewState.height]));
          if(viewState.zoom<=5)
          {
            setLayer(stateLayers);
          }
          else
          {
            setLayer([]);
          }
         }}
         style={{
          position: 'absolute'
         }}
        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={'pk.eyJ1Ijoia3NoaXRpejA3IiwiYSI6ImNsYXJrYWZ3NjAwejQ0MW1zYXQ1ZnN5OXYifQ.PnLABlEn-j7hpuGftiJ-LQ'}
           />
        </DeckGL>
    )
}