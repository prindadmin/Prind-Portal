import axios from 'axios'
import https from 'https'

export default function(userName) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}user/getsts`)
    .then(res => {
      console.log(res)
      resolve(res)
    })
    .catch((error) => {
      console.log(error.response)
    })
  })
}
