export const initialCarFilters = {
    "manufacturers": "NULL",
    "minPrice": 0,
    "maxPrice": 100000,
    "minYear": 1990,
    "maxYear": 2023,
    "minMileage": 0,
    "maxMileage": 100000,
    "fuelTypes": "NULL",
    "vehicleTypes": "NULL",
    minLat: 0,
    maxLat: 0,
    minLong: 0,
    maxLong: 0,
    "manufacturersArray":[],
    "fuelTypesArray":[],
    "vehicleTypesArray":[],
}

export default function CarFiltersReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'changeCarFiltersState': {
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

