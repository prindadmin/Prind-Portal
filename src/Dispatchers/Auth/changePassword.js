
/*
This dispatcher uses AWS Amplify's Auth class to update the users password if
they have forgotten it and requested a reset code
*/

import { Auth } from 'aws-amplify';

function ChangePassword(payload) {
  const { user_name, confirmation_code, password } = payload
  return new Promise((resolve, reject) => {
    try {
      Auth.forgotPasswordSubmit(user_name, confirmation_code, password).then(data => {
        resolve(data)
      })
    } catch (e) {
      console.log('Unable to send new code', e);
      reject(e)
    }
  })
}

export default ChangePassword
