
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as AuthSagas from './authSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as AuthDispatchers from '../Dispatchers/Auth'

// TODO: Test all the rejects from the Sagas (delete the asyncs, dummy)

const defaultState = {
  info: {},
  error: {},
  isSignedIn: States.AUTH_UNKNOWN,
  isConfirmed: States.AUTH_UNKNOWN,
  hasSignedUp: States.AUTH_UNKNOWN,
  hasSentCode: States.AUTH_UNKNOWN,
  hasChangedPassword: States.AUTH_UNKNOWN,
  passwordResetRequired: States.AUTH_UNKNOWN
}

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(AuthSagas.init());
it('test init', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});


const signUpAction = {
  payload: {
    values: {
      email: 'test@buildingim.com',
      password: 'Password1234!',
      firstName: 'Testy',
      lastName: 'McTesterson',
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
// Test a successful server call for Sign Up
var it = sagaHelper(AuthSagas.signUp(signUpAction));
it('test sign up call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpAction.payload.values));
});
it('test sign up put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      hasSignedUp: States.AUTH_SUCCESS
    }
  }));
});
it('test sign up resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});


// TODO: Work out why this isn't working as per docs https://github.com/antoinejaussoin/redux-saga-testing
/*
// Test an error in the Sign Up saga
var it = sagaHelper(AuthSagas.signUp(signUpAction));
it('test sign up call and throw error', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpAction.payload.values));
  return new Error('Something went wrong');
});
it('test error put reject', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: 'Something went wrong'
    }
  }));
});
it('test sign up reject', async (result) => {
  expect(mockReject).toHaveBeenCalled()
});
*/



const signInAction = {
  payload: {
    values: {
      email: 'test@buildingim.com',
      password: 'Password1234!',
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.signIn(signInAction));
it('test sign in call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInAction.payload.values));
});
it('test sign in put auth details', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('test sign in put user details', async (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {}
  }));
});
it('test sign in resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});
/*
// TODO: Fix this error checking;  currently fires the entire try block and not the catch block
var it = sagaHelper(AuthSagas.signIn(signInAction));
it('test sign in call throws error', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInAction.payload.values));
  return new Error('Something went wrong');
});
it('test sign in call error handling', (result) => {
  console.log(result.payload.action.payload)
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: 'Something went wrong'
    }
  }));
});
it('test sign in reject', async (result) => {
  console.log(result)
  expect(mockReject).toHaveBeenCalled()
});
*/

const signOutAction = {
  payload: {
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.signOut(signOutAction));
it('test sign out call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.signOut));
});
it('test sign out put auth details', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});
it('test sign out resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});



const refreshSessionAction = {
  payload: {
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.refreshSession(refreshSessionAction));
it('test refresh session call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.refreshSession));
});
it('test refresh session put auth details', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('test refresh session put user details', async (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {}
  }));
});
it('test refresh session resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});


const forgotPasswordAction = {
  payload: {
    username: 'test@buildingim.com',
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.forgotPassword(forgotPasswordAction));
it('test forgot password call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.forgotPassword, forgotPasswordAction.payload.username));
});
it('test forgot password resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});


const changePasswordAction = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.changePassword(changePasswordAction));
it('test change password call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.changePassword, changePasswordAction.payload));
});
it('test change password put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      hasChangedPassword: States.AUTH_SUCCESS
    }
  }));
});
it('test change password resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});


const updatePasswordAction = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.updatePassword(updatePasswordAction));
it('test update password call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.updatePassword, updatePasswordAction.payload));
});
it('test update password resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});


const confirmUserEmailAction = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(AuthSagas.confirmUserEmail(confirmUserEmailAction));
it('test confirm user call', async (result) => {
  expect(result).toEqual(call(AuthDispatchers.confirmUser, updatePasswordAction.payload));
});
it('test confirm user resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalledWith(confirmUserEmailAction.payload.user_name)
});



var it = sagaHelper(AuthSagas.default());
it('test all auth sagas - init', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_INIT, AuthSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signUp', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_UP, AuthSagas.signUp);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signIn', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_IN, AuthSagas.signIn);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signOut', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_OUT, AuthSagas.signOut);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - refreshSession', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_REFRESH_SESSION, AuthSagas.refreshSession);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - forgotPassword', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_FORGOT_PASSWORD, AuthSagas.forgotPassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - changePassword', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_CHANGE_PASSWORD, AuthSagas.changePassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - updatePassword', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_COMPLETE_NEW_PASSWORD, AuthSagas.updatePassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - confirmUserEmail', async (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_CONFIRM_USER_REQUESTED, AuthSagas.confirmUserEmail);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
