import { InputButton } from "./InputComponents/Buttons";
import { MapsAutocomplete } from "./InputComponents/MapsAutocomplete";
import { MultipleSelect } from "./InputComponents/MultipleSelect"
import { RangeSlider } from "./InputComponents/RangeSlider";
import { Select } from "./InputComponents/Select";
import { InputSlider } from "./InputComponents/Slider";
import { TextInput } from "./InputComponents/TextInput";

const getComponent = (inputType) => {
    const components = {
        'multipleSelect': MultipleSelect,
        'range': RangeSlider,
        'button': InputButton,
        'mapsAutocomplete' : MapsAutocomplete,
        'select': Select,
        'slider': InputSlider,
        'textInput': TextInput
    }
    return components[inputType];
}

export const Form = ({ options }) => {
    return (
        <>
            {
                options.map((option) => {
                    const { inputType, options, label, placeHolder, 
                        onChange, value,SuperSricpt,
                        minValue,maxValue,onClick,
                        errorToDisplay} = option;
                    const Component = getComponent(inputType);
                    return <Component 
                    options={options} 
                    value={value} 
                    label={label} 
                    placeholder={placeHolder} 
                    onChange={onChange} 
                    SuperSricpt={SuperSricpt} 
                    minValue={minValue}
                    maxValue={maxValue}
                    onClick={onClick}
                    error={errorToDisplay}/>
                })
            }
        </>
    )
}