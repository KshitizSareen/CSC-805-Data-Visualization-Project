import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { useEffect, useReducer, useState } from 'react';
import MapReducer, { initialMapState, initialViewState } from "./State/MapState";
import ResultsReducer, { initialResultsState } from "./State/ResultsState";
import AppContext from './Context/AppContext';
import { GetMinMaxCoordinates, SetMapData } from './utils/MapUtils';
import HomeFiltersReducer, { initialHomeFilters } from './State/HomeFiltersState';
import CarFiltersReducer, { initialCarFilters } from './State/CarFiltersState';
import ChartsComponent from './Components/ChartsComponent';

function App() {
  
  const [viewState,viewDispatch] = useReducer(MapReducer,initialViewState);
  const [mapState, mapDispatch] = useReducer(MapReducer, initialMapState)
  const [resultsState, resultsDispatch] = useReducer(ResultsReducer, initialResultsState)
  const [homeFiltersState, homeFiltersDispatch] = useReducer(HomeFiltersReducer, initialHomeFilters)
  const [carFiltersState, carFiltersDispatch] = useReducer(CarFiltersReducer, initialCarFilters);
  const [initialCategory,setInitialCategory] = useState("1");


  const setInitialMapData = () => {
    const minMaxCoordinates = GetMinMaxCoordinates(initialViewState);
    const initialFilters = {
      ...initialHomeFilters,
      ...minMaxCoordinates
    }
    SetMapData(initialFilters, resultsDispatch,"search-houses");
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: minMaxCoordinates
    })
    carFiltersDispatch({
      type: 'changeCarFiltersState',
      data: minMaxCoordinates
    })
  };

  useEffect(() => {
    setInitialMapData();
  }, []);


  return (
    <div className='App'>
    <AppContext.Provider value={{
      mapState,
      mapDispatch,
      resultsState,
      resultsDispatch,
      homeFiltersState,
      homeFiltersDispatch,
      carFiltersState,
      carFiltersDispatch,
      initialCategory,
      setInitialCategory,
      viewState,
      viewDispatch
    }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts/" element={<ChartsComponent/>} />
        </Routes>
    </AppContext.Provider>
    </div>
  );
}

export default App;
