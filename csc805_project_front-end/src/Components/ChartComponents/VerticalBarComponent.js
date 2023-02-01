import * as d3 from 'd3';
import React, { useCallback, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { LabelComponent } from './LabelsComponents';

export const VerticalBarComponent = ({ setXAxisValue, setYAxisValue, svgWidth, svgHeight, width, height, margin }) => {
  const verticalBarChartRef = React.useRef(null);
  const verticalBarChartXScale = d3.scaleLinear().range([0, width])
  const verticalBarChartYScale = d3.scaleBand().range([height, 0]).padding(0.1);

  const verticalbarChartXAxis = d3.axisBottom(verticalBarChartXScale)
  const verticalbarChartYAxis = d3.axisLeft(verticalBarChartYScale)

  const {
    resultsState,
    mapState,
  } = useContext(AppContext);

  const initializeVerticalBarChart = useCallback(() => {
    const verticalBarChartElem = d3.select(verticalBarChartRef.current);
    verticalBarChartElem.selectAll('*').remove();
    const verticalBarChartSvg = verticalBarChartElem.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    verticalBarChartSvg.append("g").attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")");

    verticalBarChartSvg.append("g")
      .attr("class", "yAxis")

    verticalBarChartElem.append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .text("Price VS Category")

    verticalBarChartSvg.append("text")
      .attr("y", height + 40)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .text("Price");

    verticalBarChartSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -80)
      .attr("text-anchor", "middle")
      .text("Category");
  }, [height, margin.left, margin.top, width]);

  const setVerticalBarChartData = useCallback(() => {
    const t = d3.transition()
      .duration(750)
    let yDomain = []
    let xMax = 0;
    let yDomainSet = new Set()
    let priceData = {

    }
    let data = [];
    for (let i = 0; i < resultsState.length; i++) {
      let chartElem = resultsState[i];
      if (chartElem.Lat >= mapState.minLat && chartElem.Lat <= mapState.maxLat && chartElem.Long >= mapState.minLong && chartElem.Long <= mapState.maxLong) {
        let Category = "Odometer" in chartElem ? "Manufacturer" : "Type_Category"
        let yValue = chartElem[Category];
        let splitYValue = yValue.split(" ");
        let newYValue = [];
        for (let j = 0; j < splitYValue.length; j++) {
          let value = splitYValue[j];
          if (value !== "") {
            newYValue.push(value[0].toUpperCase() + value.slice(1, value.length));
          }
        }
        let newYValueString = newYValue.join(' ');
        if (!yDomainSet.has(newYValueString)) {
          yDomainSet.add(newYValueString)
          yDomain.push(newYValueString)
          priceData[newYValueString] = {
            minPrice: chartElem.Price,
            avgPrice: [chartElem.Price],
            maxPrice: chartElem.Price,
          }
        }
        else {
          priceData[newYValueString] = {
            minPrice: Math.min(priceData[newYValueString].minPrice, chartElem.Price),
            avgPrice: priceData[newYValueString].avgPrice.concat(chartElem.Price),
            maxPrice: Math.max(priceData[newYValueString].maxPrice, chartElem.Price),
          }
        }
        xMax = Math.max(xMax, chartElem.Price)
      }
    }
    for (const [key, value] of Object.entries(priceData)) {
      data.push({
        value: value.maxPrice,
        category: key,
        key: 'MaxPrice'
      })
      data.push({
        value: value.avgPrice.reduce((a, b) => a + b, 0) / value.avgPrice.length || 0,
        category: key,
        key: 'AvgPrice'
      })
      data.push({
        value: value.minPrice,
        category: key,
        key: 'MinPrice'
      })
    }
    verticalBarChartXScale.domain([0, xMax])
    verticalBarChartYScale.domain(yDomain)
    const svgEl = d3.select(verticalBarChartRef.current);

    const svg = svgEl.select("g");
    svg.selectAll('.xAxis').transition(t).call(verticalbarChartXAxis);
    svg.selectAll('.yAxis').transition(t).call(verticalbarChartYAxis);

    const subgroups = ['MinPrice', 'AvgPrice', 'MaxPrice']

    const zScale = d3.scaleOrdinal(subgroups, ['#e41a1c', '#377eb8', '#4daf4a']);


    const categoryElems = svg.selectAll("rect")
      .data(data)

    categoryElems
      .enter()
      .append("rect").on('mouseover', (e, d) => {
        setXAxisValue('$' + d.value);
        setYAxisValue(d.category);
      }).on('mouseout', () => {
        setXAxisValue();
        setYAxisValue()
      })
      .merge(categoryElems)
      .transition(t)
      .attr("x", 0)
      .attr("y", function (d) { return verticalBarChartYScale(d.category) })
      .attr("width", d => verticalBarChartXScale(d.value))
      .attr("height", verticalBarChartYScale.bandwidth())
      .attr("fill", function (d) { return zScale(d.key) })

    categoryElems.exit().remove();
  }, [mapState.maxLat, mapState.maxLong, mapState.minLat, mapState.minLong, resultsState, setXAxisValue, setYAxisValue, verticalBarChartXScale, verticalBarChartYScale, verticalbarChartXAxis, verticalbarChartYAxis]);

  useEffect(() => {
    initializeVerticalBarChart()
  }, [initializeVerticalBarChart]);

  useEffect(() => {
    setVerticalBarChartData();
  }, [setVerticalBarChartData]);

  const labels = [{
    label: 'Min Price',
    className: 'redline',
  }, {
    label: 'Avg Price',
    className: 'blueline',
  }, {
    label: 'Max Price',
    className: 'greenline',
  }]

  return (
    <>
      <div>
        <svg ref={verticalBarChartRef} width={svgWidth} height={svgHeight} />
      </div>
      <LabelComponent labels={labels} />
    </>
  )
}