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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/page/tender`)
    .then(res => {
      //console.log(res)

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        resolve(res)
        return
      }

      reject(res.data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
