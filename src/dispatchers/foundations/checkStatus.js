import axios from 'axios'
import https from 'https'

export default function( values ) {

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    instance.post(`${process.env.REACT_APP_FOUNDATIONS_CHECK_STATUS}`, values)
    .then(res => {
      //console.log("success")
      //console.log(res)
      resolve(res)
    })
    .catch((error) => {
      //console.log("error")
      //console.error(error)
      reject(error)
    })
  })
}
