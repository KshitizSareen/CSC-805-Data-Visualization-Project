export const initialHomeFilters = {
    "housingTypes": "NULL",
    "minPrice": 500,
    "maxPrice": 1000,
    "minSqFeet": 500,
    "maxSqFeet": 1000,
    "minBeds": 2,
    "maxBeds": 3,
    "minBaths": 2,
    "maxBaths": 3,
    "catsAllowed": "NULL",
    "dogsAllowed": "NULL",
    "smokingAllowed": "NULL",
    "wheelchairAccess": "NULL",
    "electricVehicleCharge": "NULL",
    "comesFurnished": "NULL",
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
            [action.prop] : action.value
        }
      }

      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }

