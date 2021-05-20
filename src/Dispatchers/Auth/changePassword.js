
/*
This dispatcher uses AWS Amplify's Auth class to update the users password if
they have forgotten it and requested a reset code
*/

import { Auth } from 'aws-amplify';

function ChangePassword(payload) {
  const { user_name, confirmation_code, password } = payload
  return Auth.forgotPasswordSubmit(user_name, confirmation_code, password)
}

export default ChangePassword
