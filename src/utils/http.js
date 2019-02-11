import axios from 'axios'
export default ({method, url, params,headers,data,body})=>{
    return axios({
        method,
        url,
        params,
        headers,
        data,
        body
    })
    .then(result =>{
        return result.data
        console.log(result.data)
    })
}
