import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, pageName, fieldID, members) {

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

    const value = {
      members,
    }

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/${pageName}/${fieldID}/request-signature`, value)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
