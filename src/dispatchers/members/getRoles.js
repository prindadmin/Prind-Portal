import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

// TODO: FUTURE: Work out why projectId is not being used here

// Fixed values for the API request
const apiName = process.env.REACT_APP_API_NAME

async function GetRoles(projectId) {

  // Build path for request
  const path = '/roles/get-roles'

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
        response: false,
    }

    // Send the request
    API.get(apiName, path, myInit)
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

export default GetRoles
