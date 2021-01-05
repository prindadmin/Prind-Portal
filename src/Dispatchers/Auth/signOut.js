
/*
This dispatcher uses AWS Amplify's Auth class to log the user out
*/

import { Auth } from 'aws-amplify';

export default function () {
  return Auth.signOut();
}
