
/*
This dispatcher uses AWS Amplify's Auth class to log the user in using the
details provided.
*/

import { Auth } from 'aws-amplify';

function SignIn(payload) {
  return Auth.signIn(payload.email.toLowerCase(), payload.password);
}

export default SignIn
