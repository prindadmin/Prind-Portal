import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

async function UploadFile(projectId, pageName, fieldId, fileDetails, fieldType) {

  // Build path for request
  const path = `/project/${projectId}/${pageName}/${fieldId}`

  console.log(`Uploading file to S3 @: ${path}`)

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  return new Promise((resolve, reject) => {

    // Create the header for the request
    const myInit = {
        headers: {
          Authorization: identityToken
        },
        body: {
          fieldDetails: {
            filename: fileDetails.userFileName,
            tags: []
          },
          type: fieldType
        },
        response: false,
    }

    // Send the request
    API.post(apiName, path, myInit)
      .then(response => {
        console.log(response)
        resolve(response)
      })
      .catch(error => {
        console.log(error.response);
        reject(error)
     })
   })
}

export default UploadFile
