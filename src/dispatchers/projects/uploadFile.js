import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

async function UploadFile(payload) {

  // Build path for request
  const path = `/project/${payload.projectID}/${payload.pageName}/${payload.fieldID}`

  console.log(`Uploading file to S3 @: ${path}`)

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  const { fileDetails } = payload

  return new Promise((resolve, reject) => {

    const mergedFileDetails = {
      tags: [],
      ...fileDetails
    }

    // Create the header for the request
    const myInit = {
        headers: {
          Authorization: identityToken
        },
        body: {
          fieldDetails: mergedFileDetails,
          type: payload.fieldType
        },
        response: false,
    }

    console.log(myInit)

    // Send the request
    API.post(apiName, path, myInit)
      .then(response => {
        console.log(response)

        if (response.errorMessage) {
          reject(response)
          return;
        }

        resolve(response)
      })
      .catch(error => {
        console.log(error.response);
        reject(error)
     })
   })
}

export default UploadFile
