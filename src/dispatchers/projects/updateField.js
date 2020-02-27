import axios from 'axios'
import https from 'https'

// TODO: Implement API endpoint

export default function(identityToken, fieldDetails) {

  console.log(fieldDetails)

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

    instance.post(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/project/update-field.json`, fieldDetails)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
