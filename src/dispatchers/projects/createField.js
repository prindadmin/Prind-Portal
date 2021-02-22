
import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

async function CreateField(projectId, pageName, fieldDetails) {

  // Build path for request
  const path = `/project/${projectId}/page/${pageName}/create-field`

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
        body: fieldDetails,
        response: false,
    }

    // Send the request
    API.post(apiName, path, myInit)
      .then(response => {
        console.log(response)
        if (response.Error !== undefined) {
          reject(response.Error)
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
