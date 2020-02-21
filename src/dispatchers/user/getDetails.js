import axios from 'axios'
import https from 'https'

// TODO: Remove delay and connect to real API

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

      // DELAY added for testing
      setTimeout(() => {
          resolve(res)
        }, 1000)


      //resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
