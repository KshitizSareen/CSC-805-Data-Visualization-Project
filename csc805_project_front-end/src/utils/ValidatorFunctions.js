export const ValidateMultipleSelectOption = (value) => value.length === 0 ? false : true
export const ValidateSelectOption = (value) => value === null ? false : true
export const ValidateAddressOption = (value) => value === null ? false : true

export const validateOptions = (options,setErrors) =>{
    let foundErrors=false;
    const newOptionErrors=["","",""];
    for(let i=0;i<options.length;i++)
    {
        const option = options[i];
        const {validatorFunction,error,value} = option;
        if(validatorFunction!==undefined && !validatorFunction(value) )
        {
            foundErrors=true;
            newOptionErrors[i] = error;
        }
    }
    setErrors(newOptionErrors);
    return foundErrors;
}

export const validationErrors={
    multipleSelectError : 'Please select atleast one option',
    selectError : 'Please select an option',
    addressError : 'Please select an Address',
}