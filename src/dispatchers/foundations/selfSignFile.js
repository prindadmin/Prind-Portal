import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, pageName, fieldID) {

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

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/document/${projectID}/${pageName}/${fieldID}/sign-on-foundations`)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
