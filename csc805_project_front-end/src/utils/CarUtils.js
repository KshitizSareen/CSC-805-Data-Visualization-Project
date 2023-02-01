export const setAddVehicleDataState = (value, property, dispatchFunction) => {
  dispatchFunction({
    type: 'changeAddVehicleDataState',
    data: {
      [property]: value
    }
  })
}

export const Manufacturers = require('../Data/carManufacturers.json');

export const fuelTypes = [
  {
    label: 'Gas',
    value: 0,
  },
  {
    label: 'Diesel',
    value: 1,
  },
  {
    label: 'Other',
    value: 2,
  },
  {
    label: 'Hybrid',
    value: 3,
  },
  {
    label: 'Electric',
    value: 4,
  },
]

export const vehicleTypes = [
  {
    label: 'Truck',
    value: 0,
  },
  {
    label: 'Pickup',
    value: 1,
  },
  {
    label: 'Other',
    value: 2,
  },
  {
    label: 'Coupe',
    value: 3,
  },
  {
    label: 'Mini-van',
    value: 4,
  },
  {
    label: 'SUV',
    value: 5,
  },
  {
    label: 'Sedan',
    value: 6,
  },
  {
    label: 'Offroad',
    value: 7,
  },
  {
    label: 'Van',
    value: 8,
  },
  {
    label: 'Convertible',
    value: 9,
  },
  {
    label: 'Hatchback',
    value: 10,
  },
  {
    label: 'Wagon',
    value: 11,
  },
  {
    label: 'Bus',
    value: 12,
  }

]

export const vehicleErrors = {
  manufacturers: "",
  fuelTypes: "",
  vehicleType: "",
  address: "",
  email: ""
}