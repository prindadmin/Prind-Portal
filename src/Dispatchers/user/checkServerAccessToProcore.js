import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

async function CheckServerAccessToProcore() {

  // Removed so that procore uses real function
  /*
  if (process.env.REACT_APP_IS_PROCORE) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  */

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
      return credentials.idToken.jwtToken
    })

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME
  const path = `/user/checkprocoreaccess`
  const myInit = {
    headers: { Authorization: identityToken },
    response: false,
  }

  return new Promise((resolve, reject) => {
    // Send the request
    API.get(apiName, path, myInit)
      .then(response => {
        //console.log(response)
        if (response.Error) {
          reject(response)
          return;
        }
        resolve(response)
      })
      .catch(error => {
        //console.log(error);
        reject(error)
     })
   })
}

export default CheckServerAccessToProcore
