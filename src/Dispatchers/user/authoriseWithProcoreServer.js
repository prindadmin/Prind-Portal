import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

async function AuthoriseWithProcoreServer(parameters) {

  console.log(parameters)

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
      return credentials.idToken.jwtToken
    })

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME
  const path = "/user/authoriseprocore"
  const myInit = {
    headers: { Authorization: identityToken },
    body: parameters,
    response: false,
  }

  return new Promise((resolve, reject) => {
    // Send the request
    API.post(apiName, path, myInit)
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

export default AuthoriseWithProcoreServer
