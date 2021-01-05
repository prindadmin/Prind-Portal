
/*
This dispatcher uses AWS Amplify's Auth class to log the user in using the
details provided.
*/

import { Auth } from 'aws-amplify';

export default function () {

  return new Promise((resolve, reject) => {
    try {
      Auth.currentAuthenticatedUser().then(function(cognitoUser) {
        resolve(cognitoUser)
      })
    } catch (e) {
      console.log('Unable to refresh Token', e);
      reject(e)
    }
  })

}
