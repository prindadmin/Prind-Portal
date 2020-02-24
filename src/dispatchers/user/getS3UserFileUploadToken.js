import axios from 'axios'
import https from 'https'

export default function(identityToken, fileType) {

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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/user/get-sts/${fileType}`)
    .then(res => {
      console.log(res)
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
