import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export const ChartHeaderComponent = ({xAxisValue,yAxisValue,chartCategory,setChartCategory}) =>{
    
      const radios = [
        { name: 'Location Vs Price', value: '1' },
        { name: 'Category Vs Price', value: '2' },
        { name: 'Listings', value: '3' },
      ];
    return(
        <>
        <div>
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
            checked={chartCategory === radio.value}
            onChange={(e) => setChartCategory(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
        </div>
        <div>X-Axis Value: {xAxisValue}</div>
        <div>Y-Axis Value: {yAxisValue}</div>
        </>

    )
}