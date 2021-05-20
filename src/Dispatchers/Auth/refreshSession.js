
/*
This dispatcher uses AWS Amplify's Auth class to log the user in using the
details provided.
*/

import { Auth } from 'aws-amplify';

function RefreshSession() {
  return Auth.currentAuthenticatedUser()
}

export default RefreshSession
