
import * as Functions from './foundations'
import * as Actions from '../Actions'
import * as States from '../States'

let defaultState = {
  fetching: false,
}

it('Foundations Reducer - init ', () => {
  const returnValue = {
    type: Actions.FOUNDATIONS_INIT,
    payload: defaultState
  }
  const result = Functions.init()
  expect(result).toEqual(returnValue);
});

it('Foundations Reducer - selfSignFile ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.selfSignFile(projectID, pageName, fieldID, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});

it('Foundations Reducer - rejectSignatureRequest ', () => {
  const requestDetails = {
    projectID:"123",
    pageName: "design"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      requestDetails,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.rejectSignatureRequest(requestDetails, mockResolve, mockReject)
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
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with init action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with set state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with self sign requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with reject signature requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with self sign file request dispatched action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with reject signature request dispatched action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with self sign file request failed action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with reject signature request failed action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with undefined state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.FOUNDATIONS_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
});
