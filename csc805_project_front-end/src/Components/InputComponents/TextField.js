import TextField from '@mui/material/TextField';


export const FormTextField = ({ error, label, value, onChange }) => {
    return (
        <div className='inputComponent'>
            <TextField
                label={label}
                defaultValue={value}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                id="outlined-basic"
            />
            <label className='error'>{error}</label>
        </div>
    )
}