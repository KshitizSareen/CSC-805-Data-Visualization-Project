import GooglePlacesAutocomplete from 'react-google-places-autocomplete';





export const MapsAutocomplete = ({label,value,onChange,error}) =>{
  console.log(process.env.REACT_APP_MAP_KEY);
return(
<div style={{
  width: '90%',
  marginBottom: '1%',
  display: 'flex',
  flexDirection: 'column'
}}> 
<label>{label}</label>
  <GooglePlacesAutocomplete
  apiKey={process.env.REACT_APP_MAP_KEY}
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