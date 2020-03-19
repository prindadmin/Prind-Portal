import axios from 'axios'
import https from 'https'

// TODO: Stop this throwing CORS errors

export default function(userParameters) {

  return new Promise((resolve, reject) => {

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(`confirming user: ${process.env.REACT_APP_USER_AUTHORISATION_URL}${userParameters}`)

    instance.get(`${process.env.REACT_APP_USER_AUTHORISATION_URL}${userParameters}`)
    .then(res => {
      console.log(res)
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
