import axios from 'axios'
import https from 'https'

// TODO: Implement API endpoint

export default function(identityToken, projectID, pageName, fieldID, fieldDetails) {

  console.log(identityToken)
  console.log(projectID)
  console.log(pageName)
  console.log(fieldID)
  console.log(fieldDetails)

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

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/page/${pageName}/field/${fieldID}`, fieldDetails)
    .then(res => {
      console.log(res)

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        resolve(res)
        return
      }

      reject(res)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    })
  })
}
