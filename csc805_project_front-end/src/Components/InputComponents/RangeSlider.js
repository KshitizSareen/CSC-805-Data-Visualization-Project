import { Slider } from "@mui/material"
import parse from 'html-react-parser';

export const RangeSlider = ({ value, label, onChange, minValue, maxValue }) => {
    const handleChange = (event, newValue) => {
        onChange(newValue[0], newValue[1]);
    };

    return (
        <div className='inputComponent'>
            {parse(label)}
            <Slider value={value} valueLabelDisplay="auto"
                onChange={handleChange} disableSwap min={minValue} max={maxValue} />
        </div>
    )
}