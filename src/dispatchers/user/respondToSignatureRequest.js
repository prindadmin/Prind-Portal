import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, pageName, fieldID, response) {

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

    const body = {
    	accepted: response
    }

    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/${pageName}/${fieldID}/sign`, body)
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
