import { Slider } from "@mui/material"
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

export const RangeSlider = ({ value, label, onChange ,SuperSricpt,minValue,maxValue}) => {
    useEffect(()=>{
        console.log(value);
    },[])
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    return (
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