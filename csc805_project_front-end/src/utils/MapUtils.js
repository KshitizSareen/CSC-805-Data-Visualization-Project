import axios from "axios"

const SetMapData = (filters,dispatchFunction) =>{
    axios.post("https://4z7a62t8x1.execute-api.us-west-1.amazonaws.com/csc805-datavis-stage/search-houses",filters).then(res=>{
      console.log(res.data);

      dispatchFunction({
        type: 'changeResultsState', results: res.data
      })
    }).catch(()=>{
      alert("Please Narrow Down Your Search")
    })
}

export {SetMapData};