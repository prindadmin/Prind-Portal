import axios from 'axios'
import https from 'https'

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

    instance.post(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/project/create-field.json`, fieldDetails)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
