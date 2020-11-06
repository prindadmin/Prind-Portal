import API from '@aws-amplify/api';

// Fixed values for the API request
const apiName = process.env.REACT_APP_USER_AUTHORISATION_URL

// TODO: Stop this throwing CORS errors

export default async function(userParameters) {

  // Build path for request
  const path = `/${userParameters}`

  return new Promise((resolve, reject) => {

    // Create the header for the request
    const myInit = {
        headers: {},
        response: false,
    }

    // Send the request
    API.get(apiName, path, myInit)
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
