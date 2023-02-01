import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';
import { CategoryHeadersComponent } from './CategoryHeadersComponent';
import CarFilters from './FIlters/CarFilters';
import HomeFilters from './FIlters/HomeFilters';
import '../styles/filters.css';

export default function FiltersComponent() {

  const {
    initialCategory,
    setInitialCategory
  } = useContext(AppContext);

  const radios = [
    { name: 'Homes', value: '1' },
    { name: 'Vehicles', value: '2' },
  ];

  return (
    <div id="filters">
      <CategoryHeadersComponent radios={radios} Category={initialCategory} SetCategory={setInitialCategory} />
      {
        initialCategory === '1' ?
          <HomeFilters /> :
          <CarFilters />
      }
    </div>
  )
}