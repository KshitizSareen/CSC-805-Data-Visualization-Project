import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { useEffect, useReducer ,useCallback} from 'react';
import MapReducer, { initialMapState } from "./State/MapState";
import ResultsReducer, { initialResultsState } from "./State/ResultsState";
import AppContext from './Context/AppContext';
import { SetMapData } from './utils/MapUtils';
import { initialHomeFilters } from './State/HomeFiltersState';
import {WebMercatorViewport} from '@deck.gl/core';

function App() {
  const [mapState,mapDispatch] = useReducer(MapReducer,initialMapState)
  const [resultsState,resultsDispatch] = useReducer(ResultsReducer,initialResultsState)

  const setInitialMapData = useCallback(() =>{
    const viewport = new WebMercatorViewport(mapState);
    let topLeft=viewport.unproject([0,0]);
    let bottomRight = viewport.unproject([0.7*window.parent.innerWidth,window.parent.innerHeight]);
    
    const initialFilters = {
      ...initialHomeFilters,
      minLat: bottomRight[1],
      maxLat: topLeft[1],
      minLong: topLeft[0],
      maxLong: bottomRight[0]
    }

    SetMapData(initialFilters,resultsDispatch);
  },[mapState]);

  useEffect(()=>{
    setInitialMapData();
  },[setInitialMapData]);

  return (
    <AppContext.Provider value={{
      mapState,
      mapDispatch,
      resultsState,
      resultsDispatch
    }}>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
