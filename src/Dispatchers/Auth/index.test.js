
import * as Dispatchers from './index'
import { Auth } from 'aws-amplify';
jest.mock('aws-amplify')

// TODO: Add toHaveBeenCalledWith to all the mocked Auth calls
// TODO: Test all the error catchers as well

it('change user password after forgotten', async () => {
  const returnValue = {
      user_name: "test@buildingim.com",
      confirmation_code: '12345678',
      password: "Password1234!"
  }
  Auth.forgotPasswordSubmit.mockResolvedValue(returnValue)
  const changePassword = await Dispatchers.changePassword({
    user_name: "test@buildingim.com",
    confirmation_code: '12345678',
    password: "Password1234!"
  })
  expect(changePassword).toEqual(returnValue);
})


it('confirm user - success', async () => {
  const returnValue = {
      user_name: "test@buildingim.com",
      confirmation_code: '12345678'
  }
  Auth.confirmSignUp.mockResolvedValue(returnValue)
  const confirmUser = await Dispatchers.confirmUser({
    user_name: "test@buildingim.com",
    confirmation_code: '12345678'
  })
  expect(confirmUser).toEqual(returnValue);
})

/*
it('confirm user - error', async () => {
  const returnValue = {
    body: "There was an error",
    errorCode: "0001"
  }
  Auth.confirmSignUp.mockRejectedValue(returnValue)
  const confirmUser = await Dispatchers.confirmUser({
    user_name: "test@buildingim.com",
    confirmation_code: '12345678'
  })
  expect(confirmUser).toEqual(returnValue);
})
*/

it('forgot password reset request', async () => {
  const returnValue = "test@buildingim.com"
  Auth.forgotPassword.mockResolvedValue(returnValue)
  const forgotPassword = await Dispatchers.forgotPassword("test@buildingim.com")
  expect(forgotPassword).toEqual(returnValue);
})


it('refresh user session', async () => {
  const returnValue = "new session"
  Auth.currentAuthenticatedUser.mockResolvedValue(returnValue)
  const refreshSession = await Dispatchers.refreshSession()
  expect(refreshSession).toEqual(returnValue);
})


it('change user password', async () => {
  const returnValueAuthUser = "new session"
  const returnValueChangePassword = "password changed"
  Auth.currentAuthenticatedUser.mockResolvedValue(returnValueAuthUser)
  Auth.changePassword.mockResolvedValue(returnValueChangePassword)
  const updatePassword = await Dispatchers.updatePassword({
    username: "test@buildingim.com",
    oldPassword: "Password1234!",
    newPassword: "Password12345678!"
  })
  expect(updatePassword).toEqual(returnValueChangePassword);
})


it('signs the user in', async () => {
  const returnValue = {
    attributes: {
      email: "test@buildingim.com",
      email_verified: true,
      sub: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
    }
  }
  Auth.signIn.mockResolvedValue(returnValue)
  const signIn = await Dispatchers.signIn({
    email: "test@buildingim.com",
    password: "Password1234!"
  })
  expect(signIn).toEqual(returnValue);
})


it('signs the user out', async () => {
  Auth.signOut.mockResolvedValue("test return")
  const signOut = await Dispatchers.signOut()
  expect(signOut).toEqual("test return");
})


it('registers a new user', async () => {
  const payload = {
    email: "test@buildingim.com",
    password: "Password1234!",
    firstName: "Testy",
    lastName: "McTesterson",
  }
  Auth.signUp.mockResolvedValue("test return")
  const signOut = await Dispatchers.registerNewUser(payload)
  expect(signOut).toEqual("test return");
})


it('resend confirmation code', async () => {
  const payload = {
    inputUsername: "Test@buildingim.com",
  }
  Auth.resendSignUp.mockResolvedValue("test return")
  const signOut = await Dispatchers.resendConfirmationCode(payload)
  expect(Auth.resendSignUp).toHaveBeenCalledWith("test@buildingim.com")
  expect(signOut).toEqual("test return");
})
