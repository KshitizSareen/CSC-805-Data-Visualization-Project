import { CategoryHeadersComponent } from './CategoryHeadersComponent';

export const ChartHeaderComponent = ({ xAxisValue, yAxisValue, chartCategory, setChartCategory }) => {

  const radios = [
    { name: 'Location Vs Price', value: '1' },
    { name: 'Category Vs Price', value: '2' },
    { name: 'Listings', value: '3' },
  ];
  return (
    <>
      <div>
        <CategoryHeadersComponent radios={radios} Category={chartCategory} SetCategory={setChartCategory} />
      </div>
      <div>X-Axis Value: {xAxisValue}</div>
      <div>Y-Axis Value: {yAxisValue}</div>
    </>

  )
}