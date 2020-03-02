import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { config } from 'aws-cognito-promises'

export default function (payload) {
  const userPool = config.getUserPool()
  const {
    email,
    password,
    firstName,
    lastName
  } = payload

  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email
    }),
    new CognitoUserAttribute({
      Name: 'given_name',
      Value: firstName
    }),
    new CognitoUserAttribute({
      Name: 'family_name',
      Value: lastName
    })
  ]

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
