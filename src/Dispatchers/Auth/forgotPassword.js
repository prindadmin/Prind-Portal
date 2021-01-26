
/*
This dispatcher uses AWS Amplify's Auth class to send a password reset code
*/

import { Auth } from 'aws-amplify';

function ForgotPassword(username) {
  return Auth.forgotPassword(username)
}

export default ForgotPassword
