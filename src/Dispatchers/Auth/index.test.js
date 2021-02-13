
import * as Dispatchers from './index'
import { Auth } from 'aws-amplify';

jest.mock('aws-amplify')


it('signs the user in', async () => {
  const returnValue = {
    attributes: {
      email: "test@prind.tech",
      email_verified: true,
      sub: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
    }
  }
  Auth.signIn.mockResolvedValue(returnValue)
  const signIn = await Dispatchers.signIn({
    email: "test@prind.tech",
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
    email: "test@prind.tech",
    password: "Password1234!",
    firstName: "Testy",
    lastName: "McTesterson",
  }
  Auth.signUp.mockResolvedValue("test return")
  const signOut = await Dispatchers.registerNewUser(payload)
  expect(signOut).toEqual("test return");
})
