import { Slider } from "@mui/material"
import parse from 'html-react-parser';

export const InputSlider = ({value,label,onChange,minValue,maxValue}) =>{
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };
    return(
        <div style={{
            width: '90%',
            marginBottom: '5%'
        }}>
            {parse(label)}
            <Slider value={value} valueLabelDisplay="auto"
                onChange={handleChange} disableSwap min={minValue} max={maxValue}/>
        </div>
    )
}