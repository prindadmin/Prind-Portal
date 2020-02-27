import { config } from 'aws-cognito-promises'

export default function (oldPassword, newPassword) {

  const cognitoUser = config.getUser()

  cognitoUser.getSession((err, session) => {
    if (err) {
      console.log(err)
      return
    } else {
      console.log(session)
    }
  });

  return new Promise((resolve, reject) => {
    cognitoUser.changePassword(oldPassword, newPassword, (result, error) => {
      if (result) {
        console.log(result)
        reject(result)
      } else {
        console.error(error)
        resolve(error)
      }
    })
  })
}
