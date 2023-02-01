import React, { useCallback, useContext, useEffect } from "react";
import * as d3 from 'd3';
import { getLocation } from "../ChartsComponent";
import AppContext from "../../Context/AppContext";
import { LabelComponent } from "./LabelsComponents";


export const BarComponent = ({ setXAxisValue, setYAxisValue, svgWidth, svgHeight, width, height, margin }) => {
  const horizontalBarChartRef = React.useRef(null);
  const horizontalbarChartXScale = d3.scaleBand().range([0, width]).padding(0.1);
  const horizontalbarChartYScale = d3.scaleLinear().range([height, 0]);

  const horizontalbarChartXAxis = d3.axisBottom(horizontalbarChartXScale)
  const horizontalbarChartYAxis = d3.axisLeft(horizontalbarChartYScale);

  const {
    resultsState,
    mapState
  } = useContext(AppContext);
  const initializeHorizontalBarChart = useCallback(() => {
    const horizontalBarChartElem = d3.select(horizontalBarChartRef.current);
    horizontalBarChartElem.selectAll('*').remove();
    const horizontalBarChartSvg = horizontalBarChartElem.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    horizontalBarChartSvg.append("g").attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")

    horizontalBarChartSvg.append("text")
      .attr("y", height + 40)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .text("Location");

    horizontalBarChartSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height / 2))
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .text("Price");

    horizontalBarChartSvg.append("g")
      .attr("class", "yAxis")

    horizontalBarChartElem.append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .text("Location VS Price")

  }, [height, margin.left, margin.top, width]);

  const setHorizontalBarChartData = useCallback(() => {
    const t = d3.transition()
      .duration(750)
    let xDomain = []
    let yMax = 0;
    let xDomainSet = new Set()
    let priceData = {

    }
    let data = [];
    for (let i = 0; i < resultsState.length; i++) {
      let chartElem = resultsState[i];
      if (chartElem.Lat >= mapState.minLat && chartElem.Lat <= mapState.maxLat && chartElem.Long >= mapState.minLong && chartElem.Long <= mapState.maxLong) {
        let location = getLocation(mapState.zoom);
        let xValue = chartElem[location];
        let splitXValue = xValue.split(" ");
        let newXValue = [];
        for (let j = 0; j < splitXValue.length; j++) {
          let value = splitXValue[j];
          if (value !== "") {
            newXValue.push(value[0].toUpperCase() + value.slice(1, value.length));
          }
        }
        let newXValueString = newXValue.join(' ');
        if (!xDomainSet.has(newXValueString)) {
          xDomainSet.add(newXValueString)
          xDomain.push(newXValueString)
          priceData[newXValueString] = {
            minPrice: chartElem.Price,
            avgPrice: [chartElem.Price],
            maxPrice: chartElem.Price,
          }
        }
        else {
          priceData[newXValueString] = {
            minPrice: Math.min(priceData[newXValueString].minPrice, chartElem.Price),
            avgPrice: priceData[newXValueString].avgPrice.concat(chartElem.Price),
            maxPrice: Math.max(priceData[newXValueString].maxPrice, chartElem.Price),
          }
        }
        yMax = Math.max(yMax, chartElem.Price)
      }
    }
    for (const [key, value] of Object.entries(priceData)) {
      data.push({
        value: value.minPrice,
        category: key,
        key: 'MinPrice'
      })
      data.push({
        value: value.avgPrice.reduce((a, b) => a + b, 0) / value.avgPrice.length || 0,
        category: key,
        key: 'AvgPrice'
      })
      data.push({
        value: value.maxPrice,
        category: key,
        key: 'MaxPrice'
      })
    }
    horizontalbarChartXScale.domain(xDomain)
    horizontalbarChartYScale.domain([0, yMax])
    const svgEl = d3.select(horizontalBarChartRef.current);

    const svg = svgEl.select("g");
    svg.selectAll('.xAxis').transition(t).call(horizontalbarChartXAxis);
    svg.selectAll('.yAxis').transition(t).call(horizontalbarChartYAxis);

    const subgroups = ['MinPrice', 'AvgPrice', 'MaxPrice']

    const xzScale = d3.scaleBand().range([0, horizontalbarChartXScale.bandwidth()]).padding(0.05);
    xzScale.domain(subgroups)
    const zScale = d3.scaleOrdinal(subgroups, ['#e41a1c', '#377eb8', '#4daf4a']);


    const categoryElems = svg.selectAll("rect")
      .data(data)

    categoryElems
      .enter()
      .append("rect").on('mouseover', (e, d) => {
        setXAxisValue(d.category);
        setYAxisValue('$' + d.value);
      }).on('mouseout', () => {
        setXAxisValue();
        setYAxisValue()
      })
      .merge(categoryElems)
      .transition(t)
      .attr("x", function (d) {
        if (d.key === "MinPrice") {
          return horizontalbarChartXScale(d.category)
        }
        else if (d.key === "AvgPrice") {
          return horizontalbarChartXScale(d.category) + horizontalbarChartXScale.bandwidth() / 3
        }
        else {
          return horizontalbarChartXScale(d.category) + (2 * horizontalbarChartXScale.bandwidth()) / 3
        }
      })
      .attr("y", function (d) { return horizontalbarChartYScale(d.value); })
      .attr("width", horizontalbarChartXScale.bandwidth() * 0.33)
      .attr("height", function (d) { return height - horizontalbarChartYScale(d.value); })
      .attr("fill", function (d) { return zScale(d.key) });

    categoryElems.exit().remove();



  }, [height, horizontalbarChartXAxis, horizontalbarChartXScale, horizontalbarChartYAxis, horizontalbarChartYScale, mapState, resultsState, setXAxisValue, setYAxisValue])

  useEffect(() => {
    initializeHorizontalBarChart();
  }, [initializeHorizontalBarChart]);

  useEffect(() => {
    setHorizontalBarChartData();
  }, [setHorizontalBarChartData]);

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
        <svg ref={horizontalBarChartRef} width={svgWidth} height={svgHeight} />
      </div>
      <LabelComponent labels={labels} />
    </>
  )
}