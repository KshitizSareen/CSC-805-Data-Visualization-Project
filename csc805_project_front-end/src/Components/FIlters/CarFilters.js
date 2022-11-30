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
    const [selectedManufacturers,setSelectedManufacturers]=useState([]);
    const fuelTypes=[['Gas','Diesel','Hybrid'],['Electric','Other']]
    const vehicleTypes=[['Truck','Pickup','Bus','Coupe','Mini-van'],['SUV','Sedan','Offroad','Van','Convertible'],['Hatchback','Wagon','Other']]

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
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
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
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
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
             }} />
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} />
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
                  window.scrollTo(0,window.parent.innerHeight)
                  chartsDispatch({
                    type: 'changeChartText'
                  })
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