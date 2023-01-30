import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCvu1jFUG-Kyy33CHp0lKuVy2mU_zDX3zc");



export const MapsAutocomplete = ({label,value,onChange,error}) =>{

return(
<div style={{
  width: '90%',
  marginBottom: '5%',
  display: 'flex',
  flexDirection: 'column'
}}> 
<label style={{
  alignSelf: 'flex-start'
}}>{label}</label>
  <GooglePlacesAutocomplete
  apiKey="AIzaSyCvu1jFUG-Kyy33CHp0lKuVy2mU_zDX3zc"
  selectProps={{
    value: value,
    onChange: (value)=>{
      onChange(value);
    },
  }}
/>
<label style={{
                    alignSelf: 'flex-start',
                    color: 'red'
                }}>{error}</label>
</div>
    )
}