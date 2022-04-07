import axios from "axios";
import { getBaseUrl } from "./appConfig";


export const httpRequest = (url, method, body, token) => {
    return new Promise(async function (resolve, reject) {
        let callUrl = getBaseUrl() + url
        axios({
            method: method,
            url: callUrl,
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                authorization: `Bearer ${token}`,
            },
            data: body,
            // params:body,
            // timeout: 100000,
        })
        .then(res => {
                console.log("api response", url, body, res);
                if (res.status == 200)
                    return resolve(res.data);
        })
        .catch(error => {
            console.log("api response error",token,error,callUrl,body);
               return reject(error.response !== undefined ? error.response.data.message : error);
        })
    });
};



var CancelToken = axios.CancelToken;
var cancel;
export const useHttpAuto = async (url, method, body, token) => {
 return new Promise(async function (resolve, reject) {
   if (cancel != undefined) {
     cancel();
    }
    let callUrl = getBaseUrl() + url
   axios({
     method: method,
     url: callUrl,
     headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
    },
     data: body,
     cancelToken: new CancelToken(function executor(c) {
       // An executor function receives a cancel function as a parameter
       cancel = c;
   }),
   })
   .then(res => {
    console.log("api response cancel", url, body, res);
    if (res.status == 200)
        return resolve(res.data);
})
     .catch(error => {
        console.log("api response error cancel", callUrl, body, error);
           return reject(error.response !== undefined ? error.response.data.message : error);
    })
 });
};


