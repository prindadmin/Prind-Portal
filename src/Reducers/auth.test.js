
import * as AuthFunctions from './auth'
import * as Actions from '../Actions'
import * as States from '../States'

let defaultState = {
  isSignedIn: States.AUTH_UNKNOWN,
  isConfirmed: States.AUTH_UNKNOWN,
  hasSignedUp: States.AUTH_UNKNOWN,
  hasSentCode: States.AUTH_UNKNOWN,
  hasChangedPassword: States.AUTH_UNKNOWN,
  passwordResetRequired: States.AUTH_UNKNOWN
}

it('init', () => {
  const returnValue = {
    type: Actions.AUTH_INIT,
    payload: defaultState
  }
  const result = AuthFunctions.init()
  expect(result).toEqual(returnValue);
});


it('signUp', () => {
  const values = { test: 'test' }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_SIGN_UP,
    payload: {
      values: { test: 'test' },
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.signUp(values, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('signIn', () => {
  const values = { test: 'test' }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_SIGN_IN,
    payload: {
      values: { test: 'test' },
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.signIn(values, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('signOut', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_SIGN_OUT,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.signOut(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('refreshSession', () => {
  const returnValue = {
    type: Actions.AUTH_REFRESH_SESSION,
    payload: {}
  }
  const result = AuthFunctions.refreshSession()
  expect(result).toEqual(returnValue);
});


it('forgotPassword', () => {
  const values = 'test'
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_FORGOT_PASSWORD,
    payload: {
      username: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.forgotPassword(values, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('changePassword', () => {
  const values = { test: 'test' }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_CHANGE_PASSWORD,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.changePassword(values, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('updatePassword', () => {
  const username = 'test username'
  const oldPassword = 'test old password'
  const newPassword = 'test new password'
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_COMPLETE_NEW_PASSWORD,
    payload: {
      username: 'test username',
      oldPassword: 'test old password',
      newPassword: 'test new password',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.updatePassword(username, oldPassword, newPassword, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('confirmUser', () => {
  const values = { test: 'test' }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.AUTH_CONFIRM_USER_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.confirmUser(values, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('test reducer handler with non-existent action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.AUTH_CONFIRM_USER_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with init action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.AUTH_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with set state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.AUTH_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with default state', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.AUTH_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = AuthFunctions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
});
