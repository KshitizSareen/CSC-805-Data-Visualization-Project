import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Select = ({ options, label, onChange, value, error }) => {
    return (
        <div className='inputComponent'>
            <Autocomplete
                options={options}
                renderInput={(params) => <TextField {...params} label={label}
                />}
                onChange={(_, value) => {
                    onChange(value);
                }} value={value} />
            <label className='error'>{error}</label>
        </div>

    )
}