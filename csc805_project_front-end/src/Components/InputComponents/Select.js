import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Select = ({options,label,onChange,value,error})=>{
    return(
        <div style={{
            marginBottom: '1%',
            width: '90%',
            display: 'flex',
            flexDirection: 'column'
        }} >
        <Autocomplete
        options={options}
        renderInput={(params) => <TextField {...params} label={label}
        />}
        onChange={(_,value)=>{
            onChange(value);
        }} value={value}/>
                <label style={{
                    alignSelf: 'flex-start',
                    color: 'red'
                }}>{error}</label>
        </div>

    )
}