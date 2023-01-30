export const initialAddVehicleDataState ={
    vehicleManufacturer: null,
    fuelType: null,
    vehicleType: null,
    price: 20000,
    year: 2000,
    mileage: 20000,
    address: null
}

export const AddVehiclesDataStateReducer = (state,action) =>{
    switch (action.type){
        case 'changeAddVehicleDataState': {
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