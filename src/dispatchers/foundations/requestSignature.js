import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, pageName, fieldID, fieldDetails, members) {

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

    const values = {
      projectID,
      pageName,
      fieldID,
      fieldDetails, 
      members
    }

    console.log(values)

    instance.post(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/foundations/request-signature.json`, values)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
