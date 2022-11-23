import React, { useState, useCallback } from "react";
import DeckGL from "deck.gl";
import { Map } from "react-map-gl";
import Button from 'react-bootstrap/Button';
import {FlyToInterpolator} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';

// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

const statesGeoJSONData = require("../Data/usa_state_long_lat.json");
const countiesGeoJSONData = require("../Data/us_county_latlng.json");
const citiesGeoJSONData = require("../Data/uscities.json");


function Home() {

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
        zoomToCounties(info.object)
        setLayer(countyLayers)
      }
    }
    )
  ];
  
  const countyLayers = [
    // only needed when using shadows - a plane for shadows to drop on
    new IconLayer(
      {
      id: 'text-layer-counties',
      data: countiesGeoJSONData,
      pickable: true,
      getPosition: d => [d.lng,d.lat],
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 15,
      getColor: [255,255,255],
      onClick : (info)=>{
        zoomToCities(info.object)
        setLayer(cityLayers)
      }
    }
    )
  ];

  const cityLayers = [
    // only needed when using shadows - a plane for shadows to drop on
    new IconLayer(
      {
      id: 'text-layer-cities',
      data: citiesGeoJSONData,
      pickable: true,
      getPosition: d => [d.lng,d.lat],
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 15,
      getColor: [255,255,255],
      onClick : (info)=>{
        zoomToCity(info.object)
        setLayer([])
      }
    }
    )
  ];



  const [currentLayer,setLayer]=useState(
    stateLayers
  )

  const [viewState,setViewState]=useState( {

        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
    })



      const zoomToCounties = useCallback((state) => {
        setViewState({
          longitude: state.longitude,
          latitude: state.latitude,
          zoom: 5,
          pitch: 0,
          bearing: 0,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator()
        })
      }, []);

      const zoomToCities = useCallback((county) => {
        setViewState({
          longitude: county.lng,
          latitude: county.lat,
          zoom: 7,
          pitch: 0,
          bearing: 0,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator()
        })
      }, []);

      const zoomToCity = useCallback((city) => {
        setViewState({
          longitude: city.lng,
          latitude: city.lat,
          zoom: 9.5,
          pitch: 0,
          bearing: 0,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator()
        })
      }, []);


    

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: window.parent.innerHeight
        }}>
        <DeckGL
        layers={currentLayer}
         initialViewState={viewState}
         height="100%"
         width="70%"
         controller={true}// allows the user to move the map around
         getTooltip={({object}) => object && `${object.state ? object.state : object.name ? object.name : object.city}\n${1932}`} 
         onViewStateChange={({viewState})=>{
          if(viewState.zoom<=3.5)
          {
            setLayer(stateLayers);
          }
          else if(viewState.zoom<=5)
          {
            setLayer(countyLayers);
          }
          else if(viewState.zoom<=7)
          {
            setLayer(cityLayers);
          }
          else
          {
            setLayer([]);
          }
         }}
        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={'pk.eyJ1Ijoia3NoaXRpejA3IiwiYSI6ImNsYXJrYWZ3NjAwejQ0MW1zYXQ1ZnN5OXYifQ.PnLABlEn-j7hpuGftiJ-LQ'}
           />
        </DeckGL>
        <div style={{
                width: '30%',
                height: '100%',
                backgroundColor: 'whitesmoke',
                display: 'flex',
                flexDirection: 'column',
                left: 0.7*window.parent.innerWidth,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button as="a" variant="primary" >
                    Transition Back
                </Button>
            </div>
       </div>
    )
}

export default Home;