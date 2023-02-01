import axios from "axios";

export const SetChartData = (filters, setState, endPoint) => {
    axios.post(process.env.REACT_APP_API_URL + endPoint, filters).then(res => {
        setState(res.data);
    }).catch(() => {
        alert("Please Narrow Down Your Search")
    })
}