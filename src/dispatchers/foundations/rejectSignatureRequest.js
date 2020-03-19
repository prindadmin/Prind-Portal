import axios from 'axios'
import https from 'https'

export default function(identityToken, requestDetails) {

  const body = {
    accepted: false,
  }

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

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/document/${requestDetails.projectID}/${requestDetails.pageName}/${requestDetails.fieldID}/sign-on-foundations`, body)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
