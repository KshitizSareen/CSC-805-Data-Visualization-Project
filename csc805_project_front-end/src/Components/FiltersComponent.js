import React, { useContext, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import CarFilters from './FIlters/CarFilters';
import HomeFilters from './FIlters/HomeFilters';
import { InputButton } from './InputComponents/Buttons';


export default function FiltersComponent() {

  const {
    initialCategory,
    setInitialCategory
  } = useContext(AppContext);

  const navigate = useNavigate();

  const radios = [
    { name: 'Homes', value: '1' },
    { name: 'Vehicles', value: '2' },
  ];

  const navigateToCharts = () =>{
    navigate("/charts");
  }

  return (
    <div id="filters" style={{
      width: 0.3 * window.parent.innerWidth,
      height: window.parent.innerHeight,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      flexDirection: 'column',
      left: 0.7 * window.parent.innerWidth,
      top: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <ButtonGroup style={{
        marginBottom: '5%'
      }}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="radio"
            value={radio.value}
            checked={initialCategory === radio.value}
            onChange={(e) => setInitialCategory(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {
        initialCategory === '1' ?
          <HomeFilters /> :
          <CarFilters />
      }
      <InputButton label={"Visualize Charts"} style={{
        marginTop: '3%'
      }} onClick={navigateToCharts}/>
    </div>
  )
}