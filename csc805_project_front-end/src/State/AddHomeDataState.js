export const initialAddHomeDataState = {
    housingTypes: null,
    housingOptions: [],
    price: 2000,
    sqFeet: 2000,
    noOfBeds: 2,
    noOfBaths: 2,
    address: null,
    email: "",
}

export const AddHomesDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'changeAddHomeDataState': {
            return {
                ...state,
                ...action.data
            }
        }

        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}