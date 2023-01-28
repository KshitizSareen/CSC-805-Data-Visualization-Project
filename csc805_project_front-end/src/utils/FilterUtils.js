export const changeRangeValue = (minProp,maxProp,minValue,maxValue,dipatchFunction,actionType) =>{
    dipatchFunction({
      type: actionType,
      data: {
        [minProp]: minValue,
        [maxProp]: maxValue
      }
    })
  }

  export const changeMultipleOptionsValue = (Types,inputProperty,dispatchFunction,actionType,functionProperty) =>{
    const TypeValuesString = Types.map(type=>type[inputProperty]).join(",");
    dispatchFunction({
      type: actionType,
      data: {
        [functionProperty]: TypeValuesString.length === 0 ? "NULL" : "'" + TypeValuesString + "'",
      }
    })
  }