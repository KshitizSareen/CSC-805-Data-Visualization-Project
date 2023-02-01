import TextField from '@mui/material/TextField';


export const TextInput = ({ error, label, value, onChange, disabled }) => {
    return (
        <div className='inputComponent'>
            <TextField id="outlined-basic" label={label} variant="outlined" value={value} onChange={(event) => {
                onChange(event.target.value);
            }} InputProps={{
                readOnly: disabled ? true : false,
            }} />
            <label className='error'>{error}</label>
        </div>
    )
}