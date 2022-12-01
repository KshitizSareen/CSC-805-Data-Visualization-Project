import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const Manufacturers= require('../../Data/carManufacturers.json');


export default function CarFilters({chartsDispatch})
{
    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(100000);
    const [minYear,setMinYear]=useState(0);
    const [maxYear,setMaxYear]=useState(2022);
    const [minMileage,setMinMileage]=useState(0);
    const [maxMileage,setMaxMileage]=useState(100000);
    const [selectedManufacturers,setSelectedManufacturers]=useState([]);
    const fuelTypes=[['Gas','Diesel','Hybrid'],['Electric','Other']]
    const fuelValues={
      'Gas': false,
      'Diesel': false,
      'Hybrid': false,
      'Electric': false,
      'Other': false
    }
    const vehicleTypes=[['Truck','Pickup','Bus','Coupe','Mini-van'],['SUV','Sedan','Offroad','Van','Convertible'],['Hatchback','Wagon','Other']]
    const vehicleValues={
      'Truck': false,
      'Pickup': false,
      'Bus': false,
      'Coupe': false,
      'Mini-van': false,
      'SUV': false,
      'Sedan': false,
      'Offroad': false,
      'Van': false,
      'Convertible': false,
      'Hatchback': false,
      'Wagon': false,
      'Other': false
    }

    function getFuelTypes(){
      let fuelTypeArray=[];
      if(fuelValues['Gas']===true)
      {
        fuelTypeArray.push('0')
      }
      if(fuelValues['Diesel']===true)
      {
        fuelTypeArray.push('1')
      }
      if(fuelValues['Other']===true)
      {
        fuelTypeArray.push('2')
      }
      if(fuelValues['Hybrid']===true)
      {
        fuelTypeArray.push('3')
      }
      if(fuelValues['Electric']===true)
      {
        fuelTypeArray.push('4')
      }
      return fuelTypeArray.join(',')
    }


    function getVehicleTypes(){
      let vehicleTypeArray=[];
      if(vehicleValues['Truck']===true)
      {
        vehicleTypeArray.push('0')
      }
      if(vehicleValues['Pickup']===true)
      {
        vehicleTypeArray.push('1')
      }
      if(vehicleValues['Other']===true)
      {
        vehicleTypeArray.push('2')
      }
      if(vehicleValues['Coupe']===true)
      {
        vehicleTypeArray.push('3')
      }
      if(vehicleValues['Mini-van']===true)
      {
        vehicleTypeArray.push('4')
      }
      if(vehicleValues['SUV']===true)
      {
        vehicleTypeArray.push('5')
      }
      if(vehicleValues['Sedan']===true)
      {
        vehicleTypeArray.push('6')
      }
      if(vehicleValues['Offroad']===true)
      {
        vehicleTypeArray.push('7')
      }
      if(vehicleValues['Van']===true)
      {
        vehicleTypeArray.push('8')
      }
      if(vehicleValues['Convertible']===true)
      {
        vehicleTypeArray.push('9')
      }
      if(vehicleValues['Hatchback']===true)
      {
        vehicleTypeArray.push('10')
      }
      if(vehicleValues['Wagon']===true)
      {
        vehicleTypeArray.push('11')
      }
      if(vehicleValues['Bus']===true)
      {
        vehicleTypeArray.push('12')
      }
      return vehicleTypeArray.join(',')

    }


    function getManufacturers()
    {
      return selectedManufacturers.map(manufacturer=>manufacturer.id).join(',');

    }
    return(
        <div style={{
            height: '90%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Price</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinPrice(0);
              }
              else{
                setMinPrice(value);
              }
             }} value={minPrice}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxPrice(0);
              }
              else{
                setMaxPrice(value);
              }
             }} value={maxPrice}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Year</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinYear(0);
              }
              else{
                setMinYear(value);
              }
             }} value={minYear}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxYear(0);
              }
              else{
                setMaxYear(value);
              }
             }} value={maxYear}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                 <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Mileage</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinMileage(0);
              }
              else{
                setMinMileage(value);
              }
             }} value={minMileage}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxMileage(0);
              }
              else{
                setMaxMileage(value);
              }
             }} value={maxMileage}/>
             </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
            width: '100%'
          }}>
          <Autocomplete
      multiple
      limitTags={10}
      id="checkboxes-tags-demo"
      options={Manufacturers}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: '90%', alignSelf: 'center'}}
      renderInput={(params) => (
        <TextField {...params} label="Manufacturers" placeholder="Manufacturers"/>
      )}
      onChange={(event,value)=>{
        if(value.length>10)
        {
            alert("You cannot select more than 10 items")
            value.pop();
        }
        setSelectedManufacturers(value)
      }}
      value={selectedManufacturers}
      size='small'
    />
    </div>
              <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
                               <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Fuel Types</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              fuelTypes.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        onChange={(event)=>{
                          fuelValues[type] = event.target.checked;
                        }}
                      />
                      )
                    })
                  }
                  </Form>
                )
              })
            }
            </div>
            </div>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3%',
          }}>
            <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Vehicle Types</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              vehicleTypes.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        onChange={(event)=>{
                          vehicleValues[type] = event.target.checked;
                        }}
                      />
                      )
                    })
                  }
                  </Form>
                )
              })
            }
            </div>
            </div>
        <Button style={{
          marginBottom: '3%'
        }} as="a" variant="primary" onClick={()=>{
                  /*window.scrollTo(0,window.parent.innerHeight)
                  chartsDispatch({
                    type: 'changeChartText'
                  })*/
                  const fuelTypes = getFuelTypes();
                  const vehicleTypes = getVehicleTypes();
                  const manufacturers = getManufacturers();
                }} >
                    Search Cars
                </Button>
                <Button as="a" variant="primary" onClick={()=>{
                  window.scrollTo(window.parent.innerWidth,0)
                  chartsDispatch({
                    type: 'changeChartText'
                  })
                }} >
                    Visualize Charts
                </Button>
                </div>
    )
}