
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

const dispatcherError = new Error({
  "statusCode": 400,
  "Error": {
      "ErrorMessage": "Test error",
      "ErrorCode": "TEST_ERROR",
      "ErrorNumber": "0001"
  }
})

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(AuthSagas.init());
it('test init', (result) => {
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

var signUpActionWithoutResolveOrReject = JSON.parse(JSON.stringify(signUpAction))
delete signUpActionWithoutResolveOrReject.payload.resolve
delete signUpActionWithoutResolveOrReject.payload.reject

// Test a successful server call for Sign Up
var it = sagaHelper(AuthSagas.signUp(signUpAction));
it('signUp - success - test sign up call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpAction.payload.values));
});
it('signUp - success - test sign up put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      hasSignedUp: States.AUTH_SUCCESS
    }
  }));
});
it('signUp - success - test sign up resolve', (result) => {
  expect(mockResolve).toHaveBeenCalled()
});
it('signUp - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test a successful server call for Sign Up without resolve
var it = sagaHelper(AuthSagas.signUp(signUpActionWithoutResolveOrReject));
it('signUp - success without resolve - test sign up call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpActionWithoutResolveOrReject.payload.values));
});
it('signUp - success without resolve  - test sign up put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      hasSignedUp: States.AUTH_SUCCESS
    }
  }));
});
it('signUp - success without resolve - test sign up resolve not called', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('signUp - success without resolve  - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test a failed server call for Sign Up
var it = sagaHelper(AuthSagas.signUp(signUpAction));
it('signUp - error - test sign up call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpAction.payload.values));
  return dispatcherError
});
it('signUp - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signUp - error - test sign up reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('signUp - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test a failed server call for Sign Up without reject
var it = sagaHelper(AuthSagas.signUp(signUpActionWithoutResolveOrReject));
it('signUp - error without reject - test sign up call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.registerNewUser, signUpActionWithoutResolveOrReject.payload.values));
  return dispatcherError
});
it('signUp - error without reject  - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signUp - error - test sign up reject not called', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('signUp - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});




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

var signInActionWithoutResolveOrReject = JSON.parse(JSON.stringify(signInAction))
delete signInActionWithoutResolveOrReject.payload.resolve
delete signInActionWithoutResolveOrReject.payload.reject

// Test successful dispatch
var it = sagaHelper(AuthSagas.signIn(signInAction));
it('signInAction - success - test sign in call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInAction.payload.values));
});
it('signInAction - success - test sign in put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('signInAction - success - test sign in put user details', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {}
  }));
});
it('signInAction - success - test sign in resolve', (result) => {
  expect(mockResolve).toHaveBeenCalled()
});
it('signInAction - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test error dispatch
var it = sagaHelper(AuthSagas.signIn(signInAction));
it('signInAction - error - test sign in call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInAction.payload.values));
  return dispatcherError
});
it('signInAction - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signInAction - error - test sign in resolve', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('signInAction - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});


// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.signIn(signInActionWithoutResolveOrReject));
it('signInAction - success without resolve - test sign in call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInActionWithoutResolveOrReject.payload.values));
});
it('signInAction - success without resolve - test sign in put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('signInAction - success without resolve - test sign in put user details', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {}
  }));
});
it('signInAction - success without resolve - test sign in resolve not called', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('signInAction - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test error dispatch without reject
var it = sagaHelper(AuthSagas.signIn(signInActionWithoutResolveOrReject));
it('signInAction - error without reject - test sign in call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signIn, signInActionWithoutResolveOrReject.payload.values));
  return dispatcherError
});
it('signInAction - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signInAction - error without reject - test sign in resolve not called', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('signInAction - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});




const signOutAction = {
  payload: {
    resolve: mockResolve,
    reject: mockReject
  }
}

const signOutActionWithoutResolveOrReject = {
  payload: {}
}

const signOutDispatcherResult = {
  body: "success",
  statusCode: 200
}

// Test successful dispatch
var it = sagaHelper(AuthSagas.signOut(signOutAction));
it('signOut - success - test sign out call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signOut));
  return signOutDispatcherResult
});
it('signOut - success - test sign out put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});
it('signOut - success - test sign out resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(signOutDispatcherResult)
});
it('signInAction - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch
var it = sagaHelper(AuthSagas.signOut(signOutAction));
it('signOut - error - test sign out call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signOut));
  return dispatcherError
});
it('signOut - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signOut - error - test sign out reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('signInAction - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.signOut(signOutActionWithoutResolveOrReject));
it('signOut - success without resolve - test sign out call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signOut));
  return signOutDispatcherResult
});
it('signOut - success without resolve - test sign out put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});
it('signOut - success without resolve - test sign out resolve', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('signInAction - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch without reject
var it = sagaHelper(AuthSagas.signOut(signOutActionWithoutResolveOrReject));
it('signOut - error without reject - test sign out call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.signOut));
  return dispatcherError
});
it('signOut - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('signOut - error without reject - test sign out reject', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('signInAction - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});





const refreshSessionAction = {
  payload: {
    resolve: mockResolve,
    reject: mockReject
  }
}
const refreshSessionActionWithoutResolveOrReject = {
  payload: {}
}
const refreshSessionDispatcherResult = {
  body: "success",
  statusCode: 200
}
// Test successful dispatch
var it = sagaHelper(AuthSagas.refreshSession(refreshSessionAction));
it('refreshSession - success - test refresh session call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.refreshSession));
  return refreshSessionDispatcherResult
});
it('refreshSession - success - test refresh session put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('refreshSession - success - test refresh session put user details', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      ...refreshSessionDispatcherResult
    }
  }));
});
it('refreshSession - success - test refresh session resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(refreshSessionDispatcherResult)
});
it('signInAction - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test error dispatch
var it = sagaHelper(AuthSagas.refreshSession(refreshSessionAction));
it('refreshSession - error - test refresh session call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.refreshSession));
  return dispatcherError
});
it('refreshSession - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('refreshSession - error - test refresh session resolve', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('signInAction - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.refreshSession(refreshSessionActionWithoutResolveOrReject));
it('refreshSession - success without resolve - test refresh session call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.refreshSession));
  return refreshSessionDispatcherResult
});
it('refreshSession - success without resolve - test refresh session put auth details', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      isSignedIn: States.AUTH_SUCCESS,
      isConfirmed: States.AUTH_SUCCESS,
    }
  }));
});
it('refreshSession - success without resolve - test refresh session put user details', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      ...refreshSessionDispatcherResult
    }
  }));
});
it('refreshSession - success without resolve - test refresh session resolve', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('signInAction - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test error dispatch without reject
var it = sagaHelper(AuthSagas.refreshSession(refreshSessionActionWithoutResolveOrReject));
it('refreshSession - error without reject - test refresh session call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.refreshSession));
  return dispatcherError
});
it('refreshSession - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('refreshSession - error without reject - test refresh session resolve', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('signInAction - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});





const forgotPasswordAction = {
  payload: {
    username: 'test@buildingim.com',
    resolve: mockResolve,
    reject: mockReject
  }
}
const forgotPasswordActionWithoutResolveOrReject = {
  payload: {
    username: 'test@buildingim.com',
  }
}
const forgotPasswordDispatcherResult = {
  body: "success",
  statusCode: 200
}

// Test successful dispatch
var it = sagaHelper(AuthSagas.forgotPassword(forgotPasswordAction));
it('forgotPassword - success - test forgot password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.forgotPassword, forgotPasswordAction.payload.username));
  return forgotPasswordDispatcherResult
});
it('forgotPassword - success - test forgot password resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(forgotPasswordDispatcherResult)
});
it('forgotPassword - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch
var it = sagaHelper(AuthSagas.forgotPassword(forgotPasswordAction));
it('forgotPassword - error - test forgot password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.forgotPassword, forgotPasswordAction.payload.username));
  return dispatcherError
});
it('forgotPassword - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('forgotPassword - error - test forgot password reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('forgotPassword - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.forgotPassword(forgotPasswordActionWithoutResolveOrReject));
it('forgotPassword - success without resolve - test forgot password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.forgotPassword, forgotPasswordActionWithoutResolveOrReject.payload.username));
  return forgotPasswordDispatcherResult
});
it('forgotPassword - success without resolve - test forgot password resolve', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('forgotPassword - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch without reject
var it = sagaHelper(AuthSagas.forgotPassword(forgotPasswordActionWithoutResolveOrReject));
it('forgotPassword - error without reject - test forgot password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.forgotPassword, forgotPasswordActionWithoutResolveOrReject.payload.username));
  return dispatcherError
});
it('forgotPassword - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('forgotPassword - error without reject - test forgot password reject', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('forgotPassword - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
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
const changePasswordActionWithoutResolveOrReject = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
  }
}
const changePasswordDispatcherResult = {
  body: "success",
  statusCode: 200
}

// Test successful dispatch
var it = sagaHelper(AuthSagas.changePassword(changePasswordAction));
it('changePassword - success - test change password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.changePassword, changePasswordAction.payload));
  return changePasswordDispatcherResult
});
it('changePassword - success - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      hasChangedPassword: States.AUTH_SUCCESS
    }
  }));
});
it('changePassword - success - test change password resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(changePasswordDispatcherResult)
});
it('changePassword - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch
var it = sagaHelper(AuthSagas.changePassword(changePasswordAction));
it('changePassword - error - test change password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.changePassword, changePasswordAction.payload));
  return dispatcherError
});
it('changePassword - error - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('changePassword - error - test change password reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('changePassword - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.changePassword(changePasswordActionWithoutResolveOrReject));
it('changePassword - success without resolve - test change password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.changePassword, changePasswordActionWithoutResolveOrReject.payload));
  return changePasswordDispatcherResult
});
it('changePassword - success without resolve - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      hasChangedPassword: States.AUTH_SUCCESS
    }
  }));
});
it('changePassword - success without resolve - test change password resolve', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('changePassword - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch without reject
var it = sagaHelper(AuthSagas.changePassword(changePasswordActionWithoutResolveOrReject));
it('changePassword - error without reject - test change password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.changePassword, changePasswordActionWithoutResolveOrReject.payload));
  return dispatcherError
});
it('changePassword - error without reject - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('changePassword - error without reject - test change password reject', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('changePassword - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
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
const updatePasswordActionWithoutResolveOrReject = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
  }
}

const updatePasswordDispatcherResult = {
  body: "success",
  statusCode: 200
}

// Test succesful dispatch
var it = sagaHelper(AuthSagas.updatePassword(updatePasswordAction));
it('updatePassword - success - test update password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.updatePassword, updatePasswordAction.payload));
  return updatePasswordDispatcherResult
});
it('updatePassword - success - test update password resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(updatePasswordDispatcherResult)
});
it('updatePassword - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch
var it = sagaHelper(AuthSagas.updatePassword(updatePasswordAction));
it('updatePassword - error - test update password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.updatePassword, updatePasswordAction.payload));
  return dispatcherError
});
it('updatePassword - error - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('updatePassword - error - test update password reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('updatePassword - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



// Test succesful dispatch without resolve
var it = sagaHelper(AuthSagas.updatePassword(updatePasswordActionWithoutResolveOrReject));
it('updatePassword - success without resolve - test update password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.updatePassword, updatePasswordActionWithoutResolveOrReject.payload));
  return updatePasswordDispatcherResult
});
it('updatePassword - success without resolve - test update password resolve', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('updatePassword - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch without reject
var it = sagaHelper(AuthSagas.updatePassword(updatePasswordActionWithoutResolveOrReject));
it('updatePassword - error without reject - test update password call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.updatePassword, updatePasswordActionWithoutResolveOrReject.payload));
  return dispatcherError
});
it('updatePassword - error without reject - test change password put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('updatePassword - error without reject - test update password reject', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('updatePassword - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
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
const confirmUserEmailActionWithoutResolveOrReject = {
  payload: {
    user_name: 'test@buildingim.com',
    confirmation_code: '123456',
    password: 'Password1234!',
  }
}
const confirmUserEmailDispatcherResult = {
  body: "success",
  statusCode: 200
}

// Test successful dispatch
var it = sagaHelper(AuthSagas.confirmUserEmail(confirmUserEmailAction));
it('confirmUserEmail - success - test confirm user call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.confirmUser, confirmUserEmailAction.payload));
});
it('confirmUserEmail - success - test confirm user resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(confirmUserEmailAction.payload.user_name)
});
it('confirmUserEmail - success - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch
var it = sagaHelper(AuthSagas.confirmUserEmail(confirmUserEmailAction));
it('confirmUserEmail - error - test confirm user call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.confirmUser, confirmUserEmailAction.payload));
  return dispatcherError
});
it('confirmUserEmail - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('confirmUserEmail - error - test confirm user reject', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('confirmUserEmail - error - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test successful dispatch without resolve
var it = sagaHelper(AuthSagas.confirmUserEmail(confirmUserEmailActionWithoutResolveOrReject));
it('confirmUserEmail - success without resolve - test confirm user call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.confirmUser, confirmUserEmailActionWithoutResolveOrReject.payload));
});
it('confirmUserEmail - success without resolve - test confirm user resolve not called', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('confirmUserEmail - success without resolve - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Test failed dispatch without reject
var it = sagaHelper(AuthSagas.confirmUserEmail(confirmUserEmailActionWithoutResolveOrReject));
it('confirmUserEmail - error without reject - test confirm user call', (result) => {
  expect(result).toEqual(call(AuthDispatchers.confirmUser, confirmUserEmailActionWithoutResolveOrReject.payload));
  return dispatcherError
});
it('confirmUserEmail - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState,
      error: dispatcherError,
    }
  }));
});
it('confirmUserEmail - error without reject - test confirm user reject not called', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('confirmUserEmail - error without reject - test reached end of generator', (result) => {
  expect(result).toBeUndefined()
});





var it = sagaHelper(AuthSagas.default());
it('test all auth sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_INIT, AuthSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signUp', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_UP, AuthSagas.signUp);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signIn', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_IN, AuthSagas.signIn);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - signOut', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_SIGN_OUT, AuthSagas.signOut);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - refreshSession', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_REFRESH_SESSION, AuthSagas.refreshSession);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - forgotPassword', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_FORGOT_PASSWORD, AuthSagas.forgotPassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - changePassword', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_CHANGE_PASSWORD, AuthSagas.changePassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - updatePassword', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_COMPLETE_NEW_PASSWORD, AuthSagas.updatePassword);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all auth sagas - confirmUserEmail', (result) => {
  var expectedResult = fork(takeLatest, Actions.AUTH_CONFIRM_USER_REQUESTED, AuthSagas.confirmUserEmail);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
