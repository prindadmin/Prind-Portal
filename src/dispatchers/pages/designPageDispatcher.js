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

    instance.get(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/pageData/designPage.json`, projectID)
    .then(res => {
      //console.log(res)

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
