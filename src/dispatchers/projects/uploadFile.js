import axios from 'axios'
import https from 'https'

export default function(identityToken, projectID, pageName, fieldID, fileDetails) {

  console.log(identityToken)
  console.log(projectID)
  console.log(pageName)
  console.log(fieldID)
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

    var body = {
      fieldData: {
        filename: fileDetails.userFileName,
        tags: []
      },
      type: "file"
    }


    instance.post(`${process.env.REACT_APP_API_ENDPOINT}/project/${projectID}/page/${pageName}/field/${fieldID}`, body)
    .then(res => {

      // If the status code is correct, then resolve and return
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
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
