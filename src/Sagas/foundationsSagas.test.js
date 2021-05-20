
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as FoundationsSagas from './foundationsSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as FoundationsDispatchers from '../Dispatchers/foundations'

const defaultState = {
  fetching: false,
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
var it = sagaHelper(FoundationsSagas.init());
it('test init', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});


const selfSignFileAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldID: "3",
    resolve: mockResolve,
    reject: mockReject
  }
}
// Test successful dispatch
var it = sagaHelper(FoundationsSagas.selfSignFile(selfSignFileAction));
it('selfSignFile - success - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('selfSignFile - success - test request for self sign call', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.selfSignFile, selfSignFileAction.payload.projectID, selfSignFileAction.payload.pageName, selfSignFileAction.payload.fieldID));
});
it('selfSignFile - success - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState,
    }
  }));
});
it('selfSignFile - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Test failed dispatch
var it = sagaHelper(FoundationsSagas.selfSignFile(selfSignFileAction));
it('selfSignFile - error - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('selfSignFile - error - test request for self sign call', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.selfSignFile, selfSignFileAction.payload.projectID, selfSignFileAction.payload.pageName, selfSignFileAction.payload.fieldID));
  return dispatcherError
});
it('selfSignFile - error - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('selfSignFile - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});



const rejectSignatureRequestAction = {
  payload: {
    requestDetails: {
      requestedAt: "2021-01-01T12:00:00",
      projectID: "123",
      pageName: "Design",
      fieldID: "3",
      projectName: "Test project",
      fieldTitle: "Some document that is needed",
      filename: "file001.txt",
      requestedBy: {
        username: "aaaa-aaaa-aaaaaaaa-aaaa",
        firstName: "Testy",
        lastName: "McTesterson",
      },
    },
    resolve: mockResolve,
    reject: mockReject
  }
}

var rejectSignatureRequestActionWithoutResolveReject = JSON.parse(JSON.stringify(rejectSignatureRequestAction))
delete rejectSignatureRequestActionWithoutResolveReject.payload.resolve
delete rejectSignatureRequestActionWithoutResolveReject.payload.reject

// Test successful dispatch
var it = sagaHelper(FoundationsSagas.rejectSignatureRequest(rejectSignatureRequestAction));
it('rejectSignatureRequest - success - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('rejectSignatureRequest - success - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.rejectSignatureRequest, rejectSignatureRequestAction.payload.requestDetails));
});
it('rejectSignatureRequest - success - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState,
    }
  }));
});
it('rejectSignatureRequest - success - test request of user requested signatures fetch', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {}
  }));
});
it('rejectSignatureRequest - success - test rejection of signature resolve', (result) => {
  expect(mockResolve).toHaveBeenCalled()
});
it('rejectSignatureRequest - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});


// Test successful dispatch without mocked resolve and reject
var it = sagaHelper(FoundationsSagas.rejectSignatureRequest(rejectSignatureRequestActionWithoutResolveReject));
it('rejectSignatureRequest - success without mocked resolve - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('rejectSignatureRequest - success without mocked resolve - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.rejectSignatureRequest, rejectSignatureRequestActionWithoutResolveReject.payload.requestDetails));
});
it('rejectSignatureRequest - success without mocked resolve - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState,
    }
  }));
});
it('rejectSignatureRequest - success without mocked resolve - test request of user requested signatures fetch', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {}
  }));
});
it('rejectSignatureRequest - success without mocked resolve - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});


// Test failed dispatch
var it = sagaHelper(FoundationsSagas.rejectSignatureRequest(rejectSignatureRequestAction));
it('rejectSignatureRequest - error - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('rejectSignatureRequest - error - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.rejectSignatureRequest, rejectSignatureRequestAction.payload.requestDetails));
  return dispatcherError
});
it('rejectSignatureRequest - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('rejectSignatureRequest - error - test rejection of signature resolve', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('rejectSignatureRequest - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});


// Test failed dispatch without mocked resolve and reject
var it = sagaHelper(FoundationsSagas.rejectSignatureRequest(rejectSignatureRequestActionWithoutResolveReject));
it('rejectSignatureRequest - error without mocked reject - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('rejectSignatureRequest - error without mocked reject - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.rejectSignatureRequest, rejectSignatureRequestActionWithoutResolveReject.payload.requestDetails));
  return dispatcherError
});
it('rejectSignatureRequest - error without mocked reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('rejectSignatureRequest - error without mocked reject - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});



var it = sagaHelper(FoundationsSagas.default());
it('test all foundations sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_INIT, FoundationsSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all foundations sagas - selfSignFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED, FoundationsSagas.selfSignFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all foundations sagas - rejectSignatureRequest', (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED, FoundationsSagas.rejectSignatureRequest);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
