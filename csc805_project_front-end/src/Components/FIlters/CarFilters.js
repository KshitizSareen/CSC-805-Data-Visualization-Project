import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { changeMultipleOptionsValue, changeRangeValue } from "../../utils/FilterUtils";
import { SetMapData } from "../../utils/MapUtils";
import { Form } from "../Form"
const Manufacturers = require('../../Data/carManufacturers.json');

const fuelTypes = [
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

const vehicleTypes = [
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

export default function CarFilters() {
  const {
    carFiltersState,
    carFiltersDispatch,
    resultsDispatch
  } = useContext(AppContext);


  const setManufacturers = (Manufacturers) => {
    changeMultipleOptionsValue(Manufacturers,'id',carFiltersDispatch,'changeCarFiltersState','manufacturers','manufacturersArray')
  }

  const setFuelTypes = (fuelTypes) =>{
    changeMultipleOptionsValue(fuelTypes,'value',carFiltersDispatch,'changeCarFiltersState','fuelTypes','fuelTypesArray')
  }

  const setVehicleTypes = (vehicleTypes) =>{
    changeMultipleOptionsValue(vehicleTypes,'value',carFiltersDispatch,'changeCarFiltersState','vehicleTypes','vehicleTypesArray')
  }

  const setCarsPrice = (minValue,maxValue) => {
    changeRangeValue('minPrice','maxPrice',minValue,maxValue,carFiltersDispatch,'changeCarFiltersState')
  }

  const setCarsYear = (minValue,maxValue) => {
    changeRangeValue('minYear','maxYear',minValue,maxValue,carFiltersDispatch,'changeCarFiltersState')
  }

  const setCarsMileage = (minValue,maxValue) => {
    changeRangeValue('minMileage','maxMileage',minValue,maxValue,carFiltersDispatch,'changeCarFiltersState')
  }

  const searchVehicles = ()=>{
    SetMapData(carFiltersState,resultsDispatch,"search-vehicles");
  }


  const options = [
    {
      inputType: 'multipleSelect',
      options: Manufacturers,
      label: 'Manufacturers',
      placeHolder: 'Manufacturers',
      onChange: setManufacturers,
      value: carFiltersState.manufacturersArray
    },
    {
      inputType: 'multipleSelect',
      options: fuelTypes,
      label: 'Fuel Types',
      placeHolder: 'Fuel Types',
      onChange: setFuelTypes,
      value: carFiltersState.fuelTypesArray
    },
    {
      inputType: 'multipleSelect',
      options: vehicleTypes,
      label: 'Vehicle Types',
      placeHolder: 'Vehicle Types',
      onChange: setVehicleTypes,
      value: carFiltersState.vehicleTypesArray
    },
    {
      inputType: 'range',
      label: '<label>Price ($)<label>',
      value: [carFiltersState.minPrice, carFiltersState.maxPrice],
      onChange: setCarsPrice,
      minValue: 0,
      maxValue: 100000
    },
    {
      inputType: 'range',
      label: '<label>Year<label>',
      value: [carFiltersState.minYear, carFiltersState.maxYear],
      onChange: setCarsYear,
      minValue: 1990,
      maxValue: 2023
    },
    {
      inputType: 'range',
      label: '<label>Mileage (mi)<label>',
      value: [carFiltersState.minMileage, carFiltersState.maxMileage],
      onChange: setCarsMileage,
      minValue: 0,
      maxValue: 100000
    },
    {
      inputType: 'button',
      label: 'Search Vehicles',
      onClick: searchVehicles
    }

  ]
  return (
    <Form options={options}/>
  )
}