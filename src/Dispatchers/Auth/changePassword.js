
/*
This dispatcher uses AWS Amplify's Auth class to update the users password if
they have forgotten it and requested a reset code
*/

import { Auth } from 'aws-amplify';

export default function (username, code, new_password) {

  return new Promise((resolve, reject) => {
    try {
      Auth.forgotPasswordSubmit(username, code, new_password).then(data => {
        resolve(data)
      })
    } catch (e) {
      console.log('Unable to send new code', e);
      reject(e)
    }
  })
}
