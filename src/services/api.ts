/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apilink = "https://fakestoreapi.com/"

function callapi(data : any){
    return new Promise((resolve, reject) => {
        axios({
            method: data?.method,
            url: apilink + data?.url,
            data: data?.data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err);
        })
    })
}

export default {
    install: (app : any) => {
        app.config.globalProperties.$api = {
            procapi: function(data : object){
                return callapi(data);
            }
        }
    }
}