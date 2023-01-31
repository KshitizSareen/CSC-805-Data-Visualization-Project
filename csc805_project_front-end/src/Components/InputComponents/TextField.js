import TextField from '@mui/material/TextField';
import parse from 'html-react-parser';


export const FormTextField = ({error,label,value,onChange}) =>{
    return(
        <div style={{
            marginBottom: '1%',
            width: '90%',
            display: 'flex',
            flexDirection: 'column'
        }}>
        <TextField
          label={label}
          defaultValue={value}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          id="outlined-basic"
        />
      <label style={{
                    color: 'red',
                    alignSelf: 'flex-start'
                }}>{error}</label>
        </div>
    )
}