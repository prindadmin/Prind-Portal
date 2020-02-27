import axios from 'axios'
import https from 'https'

// TODO: Implement API endpoint

export default function(identityToken, fieldDetails) {

  return new Promise((resolve, reject) => {

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': identityToken,
      }
    });

    instance.get(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/foundations/self-sign.json`, fieldDetails)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
