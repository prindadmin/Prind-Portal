import axios from 'axios'
import https from 'https'

import * as endpoint from './endpoints.js'

export default function( values ) {

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '9284a74c-4382-4a25-91be-9b9534464389'
      }
    });

    instance.post(`${endpoint.notifyPhone}`, values)
    .then(res => {
      //console.log("success")
      //console.log(res)
      resolve(res)
    })
    .catch((error) => {
      //console.log("error")
      //console.log(error)
      reject(error)
    })
  })
}
