import * as d3 from 'd3';
import React, { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";

export const LineChart = ({setXAxisValue,setYAxisValue,svgWidth,svgHeight,width,height,margin}) =>{
    const lineChartRef = React.useRef(null);
    const lineXScale = d3.scaleLinear().range([0, width]);
const lineYScale = d3.scaleLinear().range([height, 0]);
    const lineXAxis = d3.axisBottom(lineXScale);
    const lineYAxis = d3.axisLeft(lineYScale);
    const [Category,setCategory] = useState('1');
    const circleRadius = 3;
    const {
        resultsState,
        mapState
      } = useContext(AppContext);

    const initializeLineChart = useCallback(()=> {
        const lineChartElem = d3.select(lineChartRef.current);
        lineChartElem.selectAll('*').remove();
        const lineSvg = lineChartElem.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        lineSvg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + height + ")");
        lineSvg.append("g").attr("class", "yAxis");
    
        lineSvg.append('g').attr('class', 'lines');
    
        lineChartElem.append("text")
          .attr("x", width / 2)
          .attr("y", 35)
          .text("Listing Data")
    
        lineSvg.append("text")
          .attr("y", height + 40)
          .attr("x", width / 2)
          .attr("text-anchor", "middle")
          .text("Listing ID");
    
        lineSvg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -(height / 2))
          .attr("y", -60)
          .attr("text-anchor", "middle")
          .text("Value");
      },[height, margin.left, margin.top, width]);

      const setLineChart = useCallback(()=>{
        const t = d3.transition()
        .duration(750)
        const lineChartElem = d3.select(lineChartRef.current);
        const lineSvg = lineChartElem.select("g");
    
        let minY = Infinity
        let maxY = 0
        let minX = Infinity
        let maxX = 0
        let data = [];
        let priceData = [];
        let valueData = [];
        for (let i = 0; i < resultsState.length; i++) {
          const categoryElem = resultsState[i];
          if(categoryElem.Lat>=mapState.minLat && categoryElem.Lat<=mapState.maxLat && categoryElem.Long>=mapState.minLong && categoryElem.Long<=mapState.maxLong)
          {
          if (categoryElem.Odometer != null) {
            maxY = Math.max(maxY, categoryElem.Price, categoryElem.Odometer)
            minY = Math.min(minY, categoryElem.Price, categoryElem.Odometer)
            valueData.push({
              'value': categoryElem.Odometer,
              'index': categoryElem.Index,
              'Label': 'Miles'
            })
            setCategory('2');
          }
          else {
            maxY = Math.max(maxY, categoryElem.Price, categoryElem.SqFeet)
            minY = Math.min(minY, categoryElem.Price, categoryElem.SqFeet)
            valueData.push({
              'value': categoryElem.SqFeet,
              'index': categoryElem.Index,
              'Label': 'SqFeet'
            })
            setCategory('1');
          }
          minX = Math.min(minX, categoryElem.Index)
          maxX = Math.max(maxX, categoryElem.Index)
          priceData.push({
            'value': categoryElem.Price,
            'index': categoryElem.Index,
            'Label': '$'
          })
        }
        }
        data = [priceData, valueData]
        const circleData = priceData.concat(valueData)
        lineXScale.domain([minX, maxX]);
        lineYScale.domain([minY, maxY]);
    
        lineSvg.selectAll('.xAxis').transition(t).call(lineXAxis);
        lineSvg.selectAll('.yAxis').transition(t).call(lineYAxis);
    
        const color = d3.scaleOrdinal([0, 1, 2, 3, 4])
          .range(['#e41a1c', '#377eb8'])
    
        const lines = lineSvg.selectAll(".line")
          .data(data)
    
        lines.enter().append("path")
          .attr("class", "line")
          .merge(lines)
          .transition(t)
          .attr("fill", "none")
          .attr("stroke", function (d, index) { return color(index) })
          .attr("stroke-width", 1.5)
          .transition(t)
          .attr("d", function (d) {
            return d3.line().x(function (d) {
              return lineXScale(d['index']);
            })
              .y(function (d) {
                return lineYScale(d['value']);
              })(d)
          })
    
        const circles = lineSvg.selectAll(".circle").data(circleData)
    
        circles.enter().append("circle").on('mouseover', (e, d) => {
          setXAxisValue("Listing ID " + d.index);
          if (d.Label === "$") {
            setYAxisValue(d.Label + d.value);
          }
          else {
            setYAxisValue(d.value + " " + d.Label);
          }
        }).on('mouseout', () => {
          setXAxisValue();
          setYAxisValue()
        })
          .attr("class", "circle")
          .merge(circles)
          .transition(t)
          .attr("fill", "red")
          .attr("cx", d => lineXScale(d.index))
          .attr("cy", d => lineYScale(d.value))
          .attr("r", circleRadius)
    
        circles.exit().remove();
    
        lines.exit().remove();
      },[lineXAxis, lineXScale, lineYAxis, lineYScale, mapState.maxLat, mapState.maxLong, mapState.minLat, mapState.minLong, resultsState, setXAxisValue, setYAxisValue]);

      useEffect(()=>{
        initializeLineChart()
      },[initializeLineChart]);
    
      useEffect(()=>{
        setLineChart();
      },[setLineChart]);


      return(   
         <>
        <div>
          <svg ref={lineChartRef} width={svgWidth} height={svgHeight} />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '20%',
        }}>
          <div style={{
            width: 200,
            height: 2,
            backgroundColor: '#e41a1c',
            alignSelf: 'center',
            marginBottom: '5%'
          }} />
          <p>Price</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '20%',
        }}>
          <div style={{
            width: 200,
            height: 2,
            backgroundColor: '#377eb8',
            alignSelf: 'center',
            marginBottom: '5%'
          }} />
          <p>{Category === '1' ? 'Sq. Feet' : 'Mileage'}</p>
        </div>
        </>
        )
}