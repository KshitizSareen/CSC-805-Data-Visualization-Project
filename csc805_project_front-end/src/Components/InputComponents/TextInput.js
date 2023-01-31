import TextField from '@mui/material/TextField';
import parse from 'html-react-parser';


export const TextInput = ({error,label,value,onChange,disabled}) =>{
    return(
        <div style={{
            marginBottom: '1%',
            width: '90%',
            display: 'flex',
            flexDirection: 'column'
        }}>
      <TextField id="outlined-basic" label={label} variant="outlined" value={value} onChange={(event)=>{
        onChange(event.target.value);
      }}           InputProps={{
        readOnly: disabled ? true : false,
      }}/>
      <label style={{
                    color: 'red',
                    alignSelf: 'flex-start'
                }}>{error}</label>
        </div>
    )
}