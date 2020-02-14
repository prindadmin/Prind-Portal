import axios from 'axios'
import https from 'https'

// TODO: Replace this with the real return
const fakeResponse = {
  data: {
    body: {
      url: "https://portal-dev.prind.tech/images/download.png"
    }
  }
}


export default function(identityToken, projectID, pageName, fieldID, version) {

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


    instance.get(`${process.env.REACT_APP_API_LOCAL_ENDPOINT}/project/file.json`)
    .then(res => {
      resolve(fakeResponse)
      //resolve(res)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
