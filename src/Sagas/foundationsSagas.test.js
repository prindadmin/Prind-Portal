
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as FoundationsSagas from './foundationsSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as FoundationsDispatchers from '../Dispatchers/foundations'

// TODO: Test all the rejects from the Sagas (delete the asyncs, dummy)

const defaultState = {
  fetching: false,
}

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(FoundationsSagas.init());
it('test init', async (result) => {
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
var it = sagaHelper(FoundationsSagas.selfSignFile(selfSignFileAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('test request for self sign call', async (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.selfSignFile, selfSignFileAction.payload.projectID, selfSignFileAction.payload.pageName, selfSignFileAction.payload.fieldID));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState,
    }
  }));
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
var it = sagaHelper(FoundationsSagas.rejectSignatureRequest(rejectSignatureRequestAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      ...defaultState,
      fetching: true
    }
  }));
});
it('test request to dispatcher is sent', async (result) => {
  expect(result).toEqual(call(FoundationsDispatchers.rejectSignatureRequest, rejectSignatureRequestAction.payload.requestDetails));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.FOUNDATIONS_SET_STATE,
    payload: {
      ...defaultState,
    }
  }));
});
it('test request of user requested signatures fetch', async (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {}
  }));
});
it('test rejection of signature resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});



var it = sagaHelper(FoundationsSagas.default());
it('test all foundations sagas - init', async (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_INIT, FoundationsSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all foundations sagas - selfSignFile', async (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED, FoundationsSagas.selfSignFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all foundations sagas - rejectSignatureRequest', async (result) => {
  var expectedResult = fork(takeLatest, Actions.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED, FoundationsSagas.rejectSignatureRequest);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
