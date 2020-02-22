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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectId}`)
    .then(res => {
      console.log(res)

      if (res.data.status !== 200) {
        reject(res)
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
