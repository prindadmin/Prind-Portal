import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

async function UploadFile(payload) {
  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME
  const path = `/project/${payload.projectID}/${payload.pageName}/${payload.fieldID}`
  const mergedFileDetails = {
    tags: [],
    ...payload.fileDetails
  }
  // Create the header for the request
  const myInit = {
    headers: { Authorization: identityToken },
    body: {
      fieldDetails: mergedFileDetails,
      type: payload.fieldType
    },
    response: false,
  }

  return new Promise((resolve, reject) => {
    // Send the request
    API.post(apiName, path, myInit)
      .then(response => {
        console.log(response)
        if (response.Error) {
          reject(response)
          return;
        }
        resolve(response)
      })
      .catch(error => {
        console.log(error)
        reject(error)
     })
   })
}

export default UploadFile
