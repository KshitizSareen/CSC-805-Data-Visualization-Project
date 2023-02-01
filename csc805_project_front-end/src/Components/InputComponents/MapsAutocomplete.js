import GooglePlacesAutocomplete from 'react-google-places-autocomplete';





export const MapsAutocomplete = ({ label, value, onChange, error }) => {
  return (
    <div className='inputComponent'>
      <label>{label}</label>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_MAP_KEY}
        selectProps={{
          value: value,
          onChange: (value) => {
            onChange(value);
          },
        }}
      />
      <label className='error'>{error}</label>
    </div>
  )
}