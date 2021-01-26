
/*
This dispatcher uses AWS Amplify's Auth class to register the user using the
details provided.
*/

import { Auth } from 'aws-amplify';

function ConfirmUser(payload) {
  return Auth.confirmSignUp(payload.user_name, payload.confirmation_code)
}

export default ConfirmUser
