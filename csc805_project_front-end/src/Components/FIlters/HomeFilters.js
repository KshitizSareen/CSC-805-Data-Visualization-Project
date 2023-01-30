import { useContext } from "react"
import AppContext from "../../Context/AppContext"
import { changeMultipleOptionsValue, changeRangeValue, changeTypeValue } from "../../utils/FilterUtils"
import { HomeOptions, HousingTypeValues } from "../../utils/HomeUtils"
import { SetMapData } from "../../utils/MapUtils"
import { Form } from "../Form"


const changeAmentityValues = (amenities, value, amenityValues) => {
  for (const amenity of amenities) {
    const { name } = amenity;
    amenityValues[name] = value;
  }
}

export default function HomeFilters() {
  const {
    homeFiltersState,
    homeFiltersDispatch,
    resultsDispatch
  } = useContext(AppContext);

  const setHousingTypes = (housingTypes) => {
    changeMultipleOptionsValue(housingTypes,'value',homeFiltersDispatch,'changeHomeFiltersState','housingTypes',"housingTypesArray")
  }

  const setHousingAmeneties = (amenities) => {
    let amenityValues = {};
    changeAmentityValues(HomeOptions, "0", amenityValues);
    changeAmentityValues(amenities, "NULL", amenityValues);
    amenityValues["amenitiesArray"] = amenities;
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: amenityValues
    })
  }

  const setHousingPrice = (minValue,maxValue) => {
    changeRangeValue('minPrice','maxPrice',minValue,maxValue,homeFiltersDispatch,'changeHomeFiltersState')
  }

  const setHousingSpace = (minValue,maxValue) => {
    changeRangeValue('minSqFeet','maxSqFeet',minValue,maxValue,homeFiltersDispatch,'changeHomeFiltersState')
  }

  const setHousingBeds = (minValue,maxValue) => {
    changeRangeValue('minBeds','maxBeds',minValue,maxValue,homeFiltersDispatch,'changeHomeFiltersState')
  }

  const setHousingBaths = (minValue,maxValue) => {
    changeRangeValue('minBaths','maxBaths',minValue,maxValue,homeFiltersDispatch,'changeHomeFiltersState')
  }

  const searchHousing = ()=>{
    SetMapData(homeFiltersState,resultsDispatch,"search-houses");
  }

  const options = [
    {
      inputType: 'multipleSelect',
      options: HousingTypeValues,
      label: 'Housing Types',
      placeHolder: 'Housing Types',
      onChange: setHousingTypes,
      value: homeFiltersState.housingTypesArray
    },
    {
      inputType: 'multipleSelect',
      options: HomeOptions,
      label: 'Housing Options',
      placeHolder: 'Housing Options',
      onChange: setHousingAmeneties,
      value: homeFiltersState.amenitiesArray
    },
    {
      inputType: 'range',
      label: '<label>Price ($)<label>',
      value: [homeFiltersState.minPrice, homeFiltersState.maxPrice],
      onChange: setHousingPrice,
      minValue: 0,
      maxValue: 10000
    },
    {
      inputType: 'range',
      label: '<label>Sq.Feet (m<sup>2</sup>)</label>',
      value: [homeFiltersState.minSqFeet, homeFiltersState.maxSqFeet],
      onChange: setHousingSpace,
      minValue: 0,
      maxValue: 10000
    },
    {
      inputType: 'range',
      label: '<label>No.of Beds</label>',
      value: [homeFiltersState.minBeds, homeFiltersState.maxBeds],
      onChange: setHousingBeds,
      minValue: 0,
      maxValue: 10
    },
    {
      inputType: 'range',
      label: '<label>No.of Baths</label>',
      value: [homeFiltersState.minBaths, homeFiltersState.maxBaths],
      onChange: setHousingBaths,
      minValue: 0,
      maxValue: 10
    },
    {
      inputType: 'button',
      label: 'Search Homes',
      onClick: searchHousing
    }
  ]
  return (
    <Form options={options} />
  )
}