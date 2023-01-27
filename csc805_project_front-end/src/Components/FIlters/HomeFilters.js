import { useContext } from "react"
import AppContext from "../../Context/AppContext"
import { changeRangeValue } from "../../utils/FilterUtils"
import { SetMapData } from "../../utils/MapUtils"
import { Form } from "../Form"

const HousingTypeValues = [
  {
    label: 'Apartment',
    value: 0,
  },
  {
    label: 'Condo',
    value: 1,
  },
  {
    label: 'House',
    value: 2,
  },
  {
    label: 'Duplex',
    value: 3,
  },
  {
    label: 'Townhouse',
    value: 4,
  },
  {
    label: 'Loft',
    value: 5,
  },
  {
    label: 'Manufactured',
    value: 6,
  },
  {
    label: 'Cottage/Cabin',
    value: 7,
  },
  {
    label: 'Flat',
    value: 8
  },
  {
    label: 'In-law',
    value: 9
  },
  {
    label: 'Land',
    value: 10
  },
  {
    label: 'Assisted Living',
    value: 11
  }
]

const HomeOptions = [
  {
    name: "catsAllowed",
    label: "Cats Allowed",
  },
  {
    name: "dogsAllowed",
    label: "Dogs Allowed",
  },
  {
    name: "smokingAllowed",
    label: "Smoking Allowed",
  },
  {
    name: "wheelchairAccess",
    label: "Wheelchair Access",
  },
  {
    name: "electricVehicleCharge",
    label: "Electric Vehicle Charge",
  },
  {
    name: "comesFurnished",
    label: "Comes Furnished",
  }
]


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
    const housingValues = [];
    for (const housingType of housingTypes) {
      const { value } = housingType;
      housingValues.push(value);
    }
    const housingValuesString = housingValues.join(',');
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: {
        'housingTypes': housingValuesString.length === 0 ? "NULL" : "'" + housingValuesString + "'",
      }
    })
  }

  const setHousingAmeneties = (amenities) => {
    let amenityValues = {};
    changeAmentityValues(HomeOptions, "0", amenityValues);
    changeAmentityValues(amenities, "NULL", amenityValues);
    homeFiltersDispatch({
      type: 'changeHomeFiltersState',
      data: amenityValues
    })
  }

  const setHousingPrice = (value) => {
    changeRangeValue('minPrice','maxPrice',value[0],value[1],homeFiltersDispatch)
  }

  const setHousingSpace = (value) => {
    changeRangeValue('minSqFeet','maxSqFeet',value[0],value[1],homeFiltersDispatch)
  }

  const setHousingBeds = (value) => {
    changeRangeValue('minBeds','maxBeds',value[0],value[1],homeFiltersDispatch)
  }

  const setHousingBaths = (value) => {
    changeRangeValue('minBaths','maxBaths',value[0],value[1],homeFiltersDispatch)
  }

  const searchHousing = ()=>{
    SetMapData(homeFiltersState,resultsDispatch)
  }

  const getSuperScriptComponent = (SuperSricpt)=>{
    return <sup>{SuperSricpt}</sup>
  }

  const options = [
    {
      inputType: 'multipleSelect',
      options: HousingTypeValues,
      label: 'Housing Types',
      placeHolder: 'Housing Types',
      onChange: setHousingTypes
    },
    {
      inputType: 'multipleSelect',
      options: HomeOptions,
      label: 'Housing Options',
      placeHolder: 'Housing Options',
      onChange: setHousingAmeneties
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