import axios from 'axios'
import https from 'https'

export default function(identityToken, newProjectDetails) {

  console.log(newProjectDetails)

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

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/create`, newProjectDetails)
    .then(res => {
      console.log(res)
      resolve(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
