
 export const HomeOptions = [
    {
      name: "CatsAllowed",
      label: "Cats Allowed",
    },
    {
      name: "DogsAllowed",
      label: "Dogs Allowed",
    },
    {
      name: "SmokingAllowed",
      label: "Smoking Allowed",
    },
    {
      name: "WheelchairAccess",
      label: "Wheelchair Access",
    },
    {
      name: "ElectricVehicleCharge",
      label: "Electric Vehicle Charge",
    },
    {
      name: "ComesFurnished",
      label: "Comes Furnished",
    }
  ]

 export const HousingTypeValues = [
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
  
  export const setAddHomeDataState = (value,property,dispatchFunction)=>{
    dispatchFunction({
        type: 'changeAddHomeDataState',
        data:{
            [property]: value
        }
    })
}

export const homeErrors=        {
  selectHousing:"",
  address:"",
  email: "",
}