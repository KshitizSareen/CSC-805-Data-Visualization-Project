import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function HomeFilters({chartsDispatch})
{

    const HousingTypesArray=[['Apartment','Condo','Manufactured','Duplex'],['Townhouse','Loft','House','Cottage/Cabin'],['Flat','In-law','Land','Assisted Living']]
    const HousingTypeValues={
      'Apartment': false,
      'Condo': false,
      'Manufactured': false,
      'Duplex': false,
      'Townhouse': false,
      'Loft': false,
      'House': false,
      'Cottage/Cabin': false,
      'Flat': false,
      'In-law': false,
      'Land': false,
      'Assisted Living': false,
    }
    const booleanFilters=[["Cats Allowed","Dogs Allowed","Smoking Allowed"],["Wheelchair Access","Electric Vehicle Charge","Comes Furnished"]]
    const booleanFilterValues={
      'Cats Allowed': '0',
      'Dogs Allowed': '0',
      'Smoking Allowed': '0',
      'Wheelchair Access': '0',
      'Electric Vehicle Charge': '0',
      'Comes Furnished': '0',
    }

    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(100000);
    const [minSquareFeet,setMinSquareFeet]=useState(0);
    const [maxSquareFeet,setMaxSquareFeet]=useState(100000);
    const [minBeds,setMinBeds]=useState(0);
    const [maxBeds,setMaxBeds]=useState(5);
    const [minBaths,setMinBaths]=useState(0);
    const [maxBaths,setMaxBaths]=useState(5);

    function getHousingTypes(){
      let HousingTypeArray=[];
      if(HousingTypeValues['Apartment']===true)
      {
        HousingTypeArray.push('0')
      }
      if(HousingTypeValues['Condo']===true)
      {
        HousingTypeArray.push('1')
      }
      if(HousingTypeValues['House']===true)
      {
        HousingTypeArray.push('2')
      }
      if(HousingTypeValues['Duplex']===true)
      {
        HousingTypeArray.push('3')
      }
      if(HousingTypeValues['Townhouse']===true)
      {
        HousingTypeArray.push('4')
      }
      if(HousingTypeValues['Loft']===true)
      {
        HousingTypeArray.push('5')
      }
      if(HousingTypeValues['Manufactured']===true)
      {
        HousingTypeArray.push('6')
      }
      if(HousingTypeValues['Cottage/Cabin']===true)
      {
        HousingTypeArray.push('7')
      }
      if(HousingTypeValues['Flat']===true)
      {
        HousingTypeArray.push('8')
      }
      if(HousingTypeValues['In-law']===true)
      {
        HousingTypeArray.push('9')
      }
      if(HousingTypeValues['Land']===true)
      {
        HousingTypeArray.push('10')
      }
      if(HousingTypeValues['Assisted Living']===true)
      {
        HousingTypeArray.push('11')
      }

      const housing = HousingTypeArray.join(',')
      return housing;
    }
    

    return(
        <div style={{
          height: '90%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
                           <p style={{
              alignSelf: 'center',
              marginBottom: '1%'
             }}>Housing Types</p>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              HousingTypesArray.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        onChange={(event)=>{
                          HousingTypeValues[type] = event.target.checked;
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
             }}>Square Feet</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinSquareFeet(0);
              }
              else{
                setMinSquareFeet(value);
              }
             }} value={minSquareFeet}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxSquareFeet(0);
              }
              else{
                setMaxSquareFeet(value);
              }
             }} value={maxSquareFeet}/>
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
             }}>No. of Beds</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinBeds(0);
              }
              else{
                setMinBeds(value);
              }
             }} value={minBeds}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxBeds(0);
              }
              else{
                setMaxBeds(value);
              }
             }} value={maxBeds}/>
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
             }}>No. of Baths</p>
             <div style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'space-evenly'
             }}>
             <Form.Control type="number" placeholder="Minimum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMinBaths(0);
              }
              else{
                setMinBaths(value);
              }
             }} value={minBaths}/>
             <Form.Control type="number" placeholder="Maximum"  style={{
              width: '30%'
             }} onChange={(event)=>{
              const value = event.target.valueAsNumber;
              if(isNaN(value))
              {
                setMaxBaths(0);
              }
              else{
                setMaxBaths(value);
              }
             }} value={maxBaths}/>
             </div>
          </div>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '3%',
            width: 0.3*window.parent.innerWidth,
            justifyContent: 'space-evenly'
          }}>
            {
              booleanFilters.map(typeArray=>{
                return(
                  <Form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {
                    typeArray.map(type=>{
                      return(
                        <Form.Check
                        label={type}
                        name="group1"
                        type={"checkbox"}
                        onChange={(event)=>{
                          if(event.target.checked)
                          {
                          booleanFilterValues[type] = '1';
                          }
                          else
                          {
                          booleanFilterValues[type] = '0';
                          }
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
        <Button style={{
          alignSelf: 'center'
        }} as="a" variant="primary" onClick={()=>{
          const housing = getHousingTypes()
                  /*window.scrollTo(0,window.parent.innerHeight)
                  chartsDispatch({
                    type: 'changeChartText'
                  })*/

                }} >
                    Search Homes
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