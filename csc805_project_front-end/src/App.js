import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { useEffect, useReducer } from 'react';
import MapReducer, { initialMapState, initialViewState } from "./State/MapState";
import ResultsReducer, { initialResultsState } from "./State/ResultsState";
import AppContext from './Context/AppContext';
import { GetMinMaxCoordinates, SetMapData } from './utils/MapUtils';
import HomeFiltersReducer, { initialHomeFilters } from './State/HomeFiltersState';
import CarFiltersReducer, { initialCarFilters } from './State/CarFiltersState';

function App() {
  const [mapState, mapDispatch] = useReducer(MapReducer, initialMapState)
  const [resultsState, resultsDispatch] = useReducer(ResultsReducer, initialResultsState)
  const [homeFiltersState, homeFiltersDispatch] = useReducer(HomeFiltersReducer, initialHomeFilters)
  const [carFiltersState, carFiltersDispatch] = useReducer(CarFiltersReducer, initialCarFilters);


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
    <AppContext.Provider value={{
      mapState,
      mapDispatch,
      resultsState,
      resultsDispatch,
      homeFiltersState,
      homeFiltersDispatch,
      carFiltersState,
      carFiltersDispatch
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
