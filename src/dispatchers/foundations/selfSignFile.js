// import { Auth } from 'aws-amplify';
// import API from '@aws-amplify/api';

// async function SelfSignFile(projectId, pageName, fieldID) {

//   // Fixed values for the API request
//   const apiName = process.env.REACT_APP_API_NAME

//   // Build path for request
//   const path = `/document/${projectId}/${pageName}/${fieldID}/sign-on-foundations`

//   // Get the current session and the identity jwtToken
//   const identityToken = await Auth.currentSession()
//     .then(credentials => {
//         return credentials.idToken.jwtToken
//       })

//   return new Promise((resolve, reject) => {

//     // Create the header for the request
//     const myInit = {
//       headers: {
//         Authorization: identityToken
//       },
//       response: false,
//     }

//     // Send the request
//     API.post(apiName, path, myInit)
//       .then(response => {
//         if (response.Error) {
//           reject(response)
//           return;
//         }
//         resolve(response)
//       })
//       .catch(error => {
//         reject(error)
//      })
//    })
// }

// export default SelfSignFile
