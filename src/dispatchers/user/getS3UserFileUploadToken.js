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

      // If the status code is correct, then resolve and return
      if (res.data.statusCode == 200) {
        resolve(res)
        return
      }

      // If the status code is wrong, reject
      reject(res)

    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
