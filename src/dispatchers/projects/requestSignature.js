import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

async function RequestSignature(payload) {

  // Build path for request
  const path = `/project/${payload.projectID}/${payload.pageName}/${payload.fieldID}/request-signature`

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
          signingUsernames: payload.members
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
        console.log(error);
        reject(error)
     })
   })
}

export default RequestSignature
