import { Auth } from 'aws-amplify';
import API from '@aws-amplify/api';

async function CreateNewProject(newProjectDetails) {

  // Get the current session and the identity jwtToken
  const identityToken = await Auth.currentSession()
    .then(credentials => {
        return credentials.idToken.jwtToken
      })

  // Fixed values for the API request
  const apiName = process.env.REACT_APP_API_NAME
  const path = `/project/create`
  const myInit = {
    headers: {  Authorization: identityToken },
    body: newProjectDetails,
    response: false,
  }

  return new Promise((resolve, reject) => {

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

export default CreateNewProject
