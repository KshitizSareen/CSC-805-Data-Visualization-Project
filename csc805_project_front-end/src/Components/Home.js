import React, {useEffect, useReducer } from "react";
import MapComponent from "./MapComponent";
import FiltersComponent from "./FiltersComponent";
import ChartsComponent from "./ChartsComponent";
import ContentComponent from "./ContentComponent";
import { ChartsReducer, initialChartsState } from "../State/ChartsState";
import MapReducer, { initialMapState } from "../State/MapState";
import ResultsReducer, { initialResultsState } from "../State/ResultsState";
// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

function Home() {


  const [chartsState,chartsDispatch] = useReducer(ChartsReducer,initialChartsState)
  const [mapState,mapDispatch] = useReducer(MapReducer,initialMapState)
  const [resultsState,resultsDispatch] = useReducer(ResultsReducer,initialResultsState)


  useEffect(()=>{
    document.addEventListener('wheel', preventScroll, {passive: false});
    document.addEventListener('keydown', preventKeyBoardScroll, false);
    document.addEventListener('mousemove',preventScroll,)
  },[])

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

function preventKeyBoardScroll(e) {
  var keys = [32, 33, 34, 35, 37, 38, 39, 40];
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
    return false;
  }
}

    return (
        <div id = "scrollable"style={{
            width: 2*window.parent.innerWidth,
            height: 2*window.parent.innerHeight,
            overflow: 'hidden'
        }}>
        <MapComponent resultsState={resultsState} mapDispatch={mapDispatch} resultsDispatch={resultsDispatch}/>
        <FiltersComponent mapState={mapState} chartsDispatch={chartsDispatch} resultsDispatch={resultsDispatch}/>
        <ChartsComponent chartsState={chartsState}/>
        <ContentComponent/>
       </div>
    )
}

export default Home;