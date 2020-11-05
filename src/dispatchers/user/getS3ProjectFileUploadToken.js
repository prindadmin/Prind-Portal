import axios from 'axios'
import https from 'https'

import { Auth } from 'aws-amplify';

export default function(project_id, pageName) {

  console.log("Getting S3 token")

  return new Promise((resolve, reject) => {

    // Get the current session and the identity jwtToken
    const identityToken = Auth.currentSession()
      .then(credentials => {
          return credentials.idToken.jwtToken
        })

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': identityToken,
      }
    });

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/project/${project_id}/page/${pageName}/get-sts`)
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
