
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as ProcoreSagas from './procore'
import * as Actions from '../Actions'
import * as States from '../States'
import * as ProcoreDispatchers from '../Dispatchers/Procore'

const defaultState = {
  fetching: false,
  companyId: "28592",
  companyName: "",
  projectId: "1234",
  projectName: "",
  folders: [],
  files: [],
  error: {},
  searchTerm: ""
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
var it = sagaHelper(ProcoreSagas.init());
it('test init', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: defaultState
  }));
});


const projectFilesAction = {
  payload: {
    payload: {
      companyId: "12345",
      projectId: "12345"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
const getProjectFilesAndFoldersActionWithoutCallback = {
  payload: {
    payload: {
      companyId: "12345",
      projectId: "12345"
    }
  }
}
const getProjectFilesAndFoldersSuccessReturn = {
  statusCode: 200,
  body: {
    files: [],
    folders: []
  }
}

// Success fetching details
var it = sagaHelper(ProcoreSagas.getProjectFilesAndFolders(projectFilesAction));
it('Procore Sagas - getProjectFilesAndFolders - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: true,
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(ProcoreDispatchers.getProjectFilesAndFolders, projectFilesAction.payload.payload));
  return getProjectFilesAndFoldersSuccessReturn
});
it('Procore Sagas - getProjectFilesAndFolders - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: false,
      ...getProjectFilesAndFoldersSuccessReturn.body
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Procore Sagas - getProjectFilesAndFolders - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure fetching details
var it = sagaHelper(ProcoreSagas.getProjectFilesAndFolders(projectFilesAction));
it('Procore Sagas - getProjectFilesAndFolders - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: true,
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(ProcoreDispatchers.getProjectFilesAndFolders, projectFilesAction.payload.payload));
  return dispatcherError
});
it('Procore Sagas - getProjectFilesAndFolders - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: false,
      folders: [],
      files: [],
      error: dispatcherError
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Procore Sagas - getProjectFilesAndFolders - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Success fetching details without callback
var it = sagaHelper(ProcoreSagas.getProjectFilesAndFolders(getProjectFilesAndFoldersActionWithoutCallback));
it('Procore Sagas - getProjectFilesAndFolders without callback - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: true,
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders without callback - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(ProcoreDispatchers.getProjectFilesAndFolders, getProjectFilesAndFoldersActionWithoutCallback.payload.payload));
  return getProjectFilesAndFoldersSuccessReturn
});
it('Procore Sagas - getProjectFilesAndFolders without callback - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: false,
      ...getProjectFilesAndFoldersSuccessReturn.body
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Success without callback - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Procore Sagas - getProjectFilesAndFolders - Success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure fetching details without callback
var it = sagaHelper(ProcoreSagas.getProjectFilesAndFolders(getProjectFilesAndFoldersActionWithoutCallback));
it('Procore Sagas - getProjectFilesAndFolders - Failure without callback - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: true,
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Failure without callback - send dispatcher', (result) => {
  expect(result).toEqual(call(ProcoreDispatchers.getProjectFilesAndFolders, getProjectFilesAndFoldersActionWithoutCallback.payload.payload));
  return dispatcherError
});
it('Procore Sagas - getProjectFilesAndFolders - Failure without callback - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROCORE_SET_STATE,
    payload: {
      fetching: false,
      folders: [],
      files: [],
      error: dispatcherError
    }
  }));
});
it('Procore Sagas - getProjectFilesAndFolders - Failure without callback - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Procore Sagas - getProjectFilesAndFolders - Failure without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



var it = sagaHelper(ProcoreSagas.default());
it('test all procore sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROCORE_INIT, ProcoreSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all procore sagas - getProjectFilesAndFolders', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROCORE_GET_PROJECT_FILES_AND_FOLDERS, ProcoreSagas.getProjectFilesAndFolders);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all procore sagas - anchorProjectFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROCORE_REQUEST_DOCUMENT_ANCHOR, ProcoreSagas.anchorProjectFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all procore sagas - signProjectFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROCORE_REQUEST_DOCUMENT_SELF_SIGNATURE, ProcoreSagas.signProjectFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
