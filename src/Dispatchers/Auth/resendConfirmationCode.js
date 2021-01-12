
/*
This dispatcher uses AWS Amplify's Auth class to send the user their confirmation
code again if there is an issue receiving it the first time.
*/

// TODO: Implement this (2 hours)

import { Auth } from 'aws-amplify';

export function ResendConfirmationCode(payload) {
  return Auth.resendSignUp(payload.inputUsername.toLowerCase())
}

export default ResendConfirmationCode
