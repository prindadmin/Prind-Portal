import axios from 'axios'
import https from 'https'

export default function(jwtToken) {

  return new Promise((resolve, reject) => {

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken,
      }
    });

    instance.get(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/user/get-details`)
    .then(res => {
      console.log(res)
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
