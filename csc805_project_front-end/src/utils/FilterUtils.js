export const changeRangeValue = (minProp,maxProp,minValue,maxValue,dipatchFunction) =>{
    dipatchFunction({
      type: 'changeHomeFiltersState',
      data: {
        [minProp]: minValue,
        [maxProp]: maxValue
      }
    })
  }