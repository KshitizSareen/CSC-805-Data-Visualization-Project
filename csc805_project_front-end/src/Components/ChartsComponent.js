import React, { useState } from 'react';
import { BarComponent } from './ChartComponents/BarComponent';
import { LineChart } from './ChartComponents/LineChartComponent';
import { VerticalBarComponent } from './ChartComponents/VerticalBarComponent';
import { ChartHeaderComponent } from './ChartHeaderComponent';



export const getLocation = (zoom)=>{
  if (zoom <= 5) {
    return "State";
  }
  else if (zoom <= 7) {
    return "County";
  }
  else if (zoom <= 9.5) {
    return "City";
  }
  else {
    return "Neighbourhood";
  }
}


export const getCategory = (type)=>  type === '1' ? "Type_Category" : "Manufacturer"


export default function ChartsComponent(){
  

  const margin = { top: 50, right: 100, bottom: 50, left: 100 };
const width = window.parent.innerWidth/1.2;
const height = window.parent.innerHeight/1.75;
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;



  const [xAxisValue, setXAxisValue] = useState();
  const [yAxisValue, setYAxisValue] = useState();
  const [chartCategoryValue,setChartCategoryValue] = useState('1');



  return (
    <div id="charts" style={{
      width: window.parent.innerWidth,
      height: window.parent.innerHeight,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <ChartHeaderComponent xAxisValue={xAxisValue} yAxisValue={yAxisValue} chartCategory={chartCategoryValue} setChartCategory={setChartCategoryValue}/>
      {
        chartCategoryValue === '1' ? 
        <BarComponent setXAxisValue={setXAxisValue} setYAxisValue={setYAxisValue} svgWidth={svgWidth} svgHeight={svgHeight} width={width} height={height} margin={margin}/>
        :
        chartCategoryValue === '2' ?
        <VerticalBarComponent setXAxisValue={setXAxisValue} setYAxisValue={setYAxisValue} svgWidth={svgWidth} svgHeight={svgHeight} width={width} height={height} margin={margin}/>
        :
        <LineChart setXAxisValue={setXAxisValue} setYAxisValue={setYAxisValue} svgWidth={svgWidth} svgHeight={svgHeight} width={width} height={height} margin={margin}/>
      }
    </div>
  )
}