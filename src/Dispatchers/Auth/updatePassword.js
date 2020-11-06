
/*
This dispatcher uses AWS Amplify's Auth class to send a password reset code
*/

import { Auth } from 'aws-amplify';

export default function (username, oldPassword, newPassword) {

  return new Promise((resolve, reject) => {
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(username, oldPassword, newPassword);
    })
    .then(data => {
      console.log(data)
      resolve(data)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    });
  })
}
