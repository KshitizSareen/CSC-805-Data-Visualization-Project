import React, { useContext } from "react";
import DeckGL from "deck.gl";
import { Map } from "react-map-gl";
import { IconLayer } from '@deck.gl/layers';
import AppContext from '../Context/AppContext';
import { GetMinMaxCoordinates } from "../utils/MapUtils";
import { InputButton } from "./InputComponents/Buttons";
import { FaChartBar, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { getImages } from "../utils/UploadUtils";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export default function MapComponent() {
  const {
    mapDispatch,
    resultsState,
    homeFiltersDispatch,
    carFiltersDispatch,
    viewState,
    viewDispatch
  } = useContext(AppContext);


  const navigate = useNavigate();

  const navigateToCharts = () => {
    navigate("/charts");
  }

  const navigateToUploadComponent = () => {
    navigate("/uploadlisting");
  }

  const navigateToDisplayComponent = async (listing) => {
    let resImages = [];
    if (listing.SqFeet !== undefined) {
      resImages = await getImages("Home", listing.Index, "search-images");
    }
    else {
      resImages = await getImages("Vehicle", listing.Index, "search-images");
    }
    navigate("/displaylisting", {
      state: {
        listing,
        resImages
      }
    });
  }


  const layers = [
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
          navigateToDisplayComponent(info.object);
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
    viewDispatch({
      type: 'changeViewState',
      viewState
    })
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: minMaxCoordinates
    })
    carFiltersDispatch({
      type: 'changeCarFiltersState',
      data: minMaxCoordinates
    })

  }


  return (
    <DeckGL
      layers={layers}
      initialViewState={viewState}
      height={window.parent.innerHeight}
      width={0.7 * window.parent.innerWidth}
      controller={true}// allows the user to move the map around
      getTooltip={({ object }) => renderDataComponent(object)}
      onViewStateChange={({ viewState }) => {
        setViewPort(viewState);
      }}
      class="Map"
    >
      <Map
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      />
      <InputButton style={{
        position: 'absolute',
        left: 30,
        top: 30,
        alignSelf: 'flex-start'
      }} onClick={navigateToCharts}><FaChartBar color="darkblue" size={25} /></InputButton>
      <InputButton style={{
        position: 'absolute',
        left: 30,
        top: 100,
        alignSelf: 'flex-start'
      }} onClick={navigateToUploadComponent}><FaPlus color="darkblue" size={25} /></InputButton>
    </DeckGL>
  )
}