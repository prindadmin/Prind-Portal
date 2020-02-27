import axios from 'axios'
import https from 'https'

export default function(identityToken, project_id, pageName) {

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

    instance.get(`${process.env.REACT_APP_API_ENDPOINT}/project/${project_id}/page/${pageName}/get-sts`)
    .then(res => {

      // If the status code is correct, then resolve and return
      if (res.data.statusCode === 200) {
        resolve(res)
        return
      }

      // If the status code is wrong, reject
      reject(res)

    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
