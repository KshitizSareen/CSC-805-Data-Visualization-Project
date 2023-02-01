export const ValidateMultipleSelectOption = (value) => value.length === 0 ? false : true
export const ValidateSelectOption = (value) => value === null ? false : true
export const ValidateAddressOption = (value) => value === null ? false : true
export const ValidateEmail = (value) => value.toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

export const validateOptions = (options, setErrors, errors) => {
    let foundErrors = false;
    const newOptionErrors = { ...errors };
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const { validatorFunction, error, value, name } = option;
        if (validatorFunction !== undefined && !validatorFunction(value)) {
            foundErrors = true;
            newOptionErrors[name] = error;
        }
    }
    setErrors(newOptionErrors);
    return foundErrors;
}

export const validationErrors = {
    multipleSelectError: 'Please select atleast one option',
    selectError: 'Please select an option',
    addressError: 'Please select an Address',
    emailError: 'Please enter a valid email'
}