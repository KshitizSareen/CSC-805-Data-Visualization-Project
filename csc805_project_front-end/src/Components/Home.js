import React, {useEffect, useReducer } from "react";
import MapComponent from "./MapComponent";
import FiltersComponent from "./FiltersComponent";
import ChartsComponent from "./ChartsComponent";
import ContentComponent from "./ContentComponent";
import { ChartsReducer, initialChartsState } from "../State/ChartsState";

// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

function Home() {


  const [chartsState,chartsDispatch] = useReducer(ChartsReducer,initialChartsState)


  useEffect(()=>{
    document.querySelector('#scrollable').addEventListener('wheel', preventScroll, {passive: false});
    document.addEventListener('keydown', preventKeyBoardScroll, false);
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
        }}>
        <MapComponent/>
        <FiltersComponent chartsDispatch={chartsDispatch}/>
        <ChartsComponent chartsState={chartsState}/>
        <ContentComponent/>
       </div>
    )
}

export default Home;