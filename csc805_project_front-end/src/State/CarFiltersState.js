export const initialCarFilters = {
    "manufacturers": "NULL",
    "minPrice": 0,
    "maxPrice": 10000,
    "minYear": 0,
    "maxYear": 2022,
    "minMileage": 0,
    "maxMileage": 10000,
    "fuelTypes": "NULL",
    "vehicleTypes": "NULL",
    minLat: 0,
    maxLat: 0,
    minLong: 0,
    maxLong: 0
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

