
/*
This dispatcher uses AWS Amplify's Auth class to send a password reset code
*/

import { Auth } from 'aws-amplify';

export default function (username) {

  return new Promise((resolve, reject) => {
    try {
      Auth.forgotPassword(username).then(data => {
        resolve(data)
      })
    } catch (e) {
      console.log('Unable to send new code', e);
      reject(e)
    }
  })
}
