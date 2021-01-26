
/*
This dispatcher uses AWS Amplify's Auth class to log the user out
*/

import { Auth } from 'aws-amplify';

export function SignOut() {
  return Auth.signOut();
}

export default SignOut
