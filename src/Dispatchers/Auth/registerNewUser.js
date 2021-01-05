
/*
This dispatcher uses AWS Amplify's Auth class to register the user using the
details provided.
*/

import { Auth } from 'aws-amplify';

export default function (payload) {
  return Auth.signUp({
      username: payload.email.toLowerCase(),
      password: payload.password,
      given_name: payload.firstName,
      family_name: payload.lastName,
      attributes: {
          email: payload.email.toLowerCase(),
      }
  })
}
