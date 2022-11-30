import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import HomeFilters from './FIlters/HomeFilters';

export default function FiltersComponent({chartsDispatch}){

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Homes', value: '1' },
        { name: 'Vehicles', value: '2' },
      ];



    return(
        <div  id="filters" style={{
            width: 0.3*window.parent.innerWidth,
            height: window.parent.innerHeight,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            flexDirection: 'column',
            left: 0.7*window.parent.innerWidth,
            top:0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            overflow: 'hidden'
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
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {
        radioValue === '1' ?
        <HomeFilters chartsDispatch={chartsDispatch}/> : 
        ""
      }
        </div>
    )
}