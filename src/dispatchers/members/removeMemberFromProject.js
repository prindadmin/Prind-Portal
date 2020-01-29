import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, memberDetails) {

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

    let values = {
      projectID,
      memberDetails,
    }

    instance.get(`${process.env.PUBLIC_URL}/testResults/removeMember.json`, values)
    .then(res => {
      //console.log(res)

      // DELAY added for testing
      setTimeout(() => {
          resolve(res)
        }, 1000)

      //resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
