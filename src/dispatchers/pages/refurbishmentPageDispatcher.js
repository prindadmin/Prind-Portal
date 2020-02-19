import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID) {

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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/page/refurbishment`)
    .then(res => {
      //console.log(res)

      // TODO: Do something with this error handling
      if (res.data.errorMessage !== undefined) {
        reject(res.data)
        return
      }

      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
