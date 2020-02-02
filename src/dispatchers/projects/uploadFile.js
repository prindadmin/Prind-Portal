import axios from 'axios'
import https from 'https'

export default function(identityToken, fileDetails) {

  console.log(fileDetails)

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


    instance.post(`${process.env.PUBLIC_URL}/project/file.js`, fileDetails)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
