import axios from 'axios'
import https from 'https'

export default function(identityToken, projectId) {

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

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectId}/delete`)
    .then(res => {
      console.log(res)

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        resolve(res)
        return
      }

      console.error(res)
      reject(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
