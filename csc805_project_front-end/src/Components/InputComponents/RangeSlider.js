import { Slider } from "@mui/material"
import parse from 'html-react-parser';

export const RangeSlider = ({ value, label, onChange ,minValue,maxValue}) => {
    const handleChange = (event, newValue) => {
        onChange(newValue[0],newValue[1]);
    };

    return (
        <div style={{
            width: '90%',
            marginBottom: '1%'
        }}>
            {parse(label)}
            <Slider value={value} valueLabelDisplay="auto"
                onChange={handleChange} disableSwap min={minValue} max={maxValue}/>
        </div>
    )
}