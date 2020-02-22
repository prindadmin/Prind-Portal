import axios from 'axios'
import https from 'https'

// TODO: Connect to saga and reducer

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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/user/get-signature-requests`)
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
