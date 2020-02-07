import axios from 'axios'
import https from 'https'

// The returned data should include at least two fields:
//    id
//    name

export default function(identityToken, newProjectDetails) {

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

    instance.post(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/createdProject.json`, newProjectDetails)
    .then(res => {
      resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
