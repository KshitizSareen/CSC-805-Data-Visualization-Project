import { InputButton } from "./InputComponents/Buttons";
import { MultipleSelect } from "./InputComponents/MultipleSelect"
import { RangeSlider } from "./InputComponents/RangeSlider";

const getComponent = (inputType) => {
    const components = {
        'multipleSelect': MultipleSelect,
        'range': RangeSlider,
        'button': InputButton
    }
    return components[inputType];
}

export const Form = ({ options }) => {
    return (
        <>
            {
                options.map((option) => {
                    const { inputType, options, label, placeHolder, onChange, value,SuperSricpt,minValue,maxValue,onClick} = option;
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
                    onClick={onClick}/>
                })
            }
        </>
    )
}