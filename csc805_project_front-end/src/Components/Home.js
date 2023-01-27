import React, {useContext, useReducer} from "react";
import MapComponent from "./MapComponent";
import FiltersComponent from "./FiltersComponent";
import ChartsComponent from "./ChartsComponent";
import { ChartsReducer} from "../State/ChartsState";
import MapReducer, { initialMapState } from "../State/MapState";
import ResultsReducer, { initialResultsState } from "../State/ResultsState";
import AppContext from '../Context/AppContext';
// Set your mapbox access token here

// Viewport settings

// Data to be used by the LineLayer

function Home() {

  const {
    mapState,
    mapDispatch,
    resultsState,
    resultsDispatch
  } = useContext(AppContext);

  const [chartsByLocation,chartsLocationDispatch] = useReducer(ChartsReducer,[])
  const [chartsByCategory,chartsCategoryDispatch] = useReducer(ChartsReducer,[])
  const [chartsByListing,chartsListingDispatch] = useReducer(ResultsReducer,[])


    return (
        <div>
        <MapComponent resultsState={resultsState} mapDispatch={mapDispatch} resultsDispatch={resultsDispatch}/>
        <FiltersComponent mapState={mapState} chartsLocationDispatch={chartsLocationDispatch}  
        chartsCategoryDispatch={chartsCategoryDispatch} resultsDispatch={resultsDispatch} chartsListingDispatch={chartsListingDispatch}/>
       </div>
    )
}

export default Home;