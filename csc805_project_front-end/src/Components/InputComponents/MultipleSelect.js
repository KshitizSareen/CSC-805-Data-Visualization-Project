import { Autocomplete } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const MultipleSelect = ({ options, label, placeholder, onChange, value, error, disabled }) => {
    return (
        <div className='inputComponent'>
            <Autocomplete
                multiple
                limitTags={10}
                options={options}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} label={label} placeholder={placeholder} />
                )}
                onChange={(event, value) => {
                    onChange(value);
                }}
                value={value}
                readOnly={disabled ? true : false}
            />
            <label className="error">{error}</label>
        </div>
    )
}
