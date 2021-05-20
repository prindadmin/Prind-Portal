
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

async function CreateField(payload) {

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME

  // Build path for request
  const path = `/project/${payload.projectID}/page/${payload.pageName}/create-field`

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  return new Promise((resolve, reject) => {

    // Create the header for the request
    const myInit = {
        headers: { Authorization: identityToken },
        body: payload.fieldDetails,
        response: false,
    }

    // Send the request
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.Error) {
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

export default CreateField
