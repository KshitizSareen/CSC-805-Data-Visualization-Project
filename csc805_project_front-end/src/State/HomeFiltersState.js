export const initialHomeFilters = {
    "housingTypes": "NULL",
    "minPrice": 500,
    "maxPrice": 10000,
    "minSqFeet": 500,
    "maxSqFeet": 10000,
    "minBeds": 2,
    "maxBeds": 5,
    "minBaths": 2,
    "maxBaths": 5,
    "catsAllowed": "0",
    "dogsAllowed": "0",
    "smokingAllowed": "0",
    "wheelchairAccess": "0",
    "electricVehicleCharge": "0",
    "comesFurnished": "0",
    "minLat": 0,
    "maxLat": 0,
    "minLong": 0,
    "maxLong": 0
}

export default function HomeFiltersReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'changeHomeFiltersState': {
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

