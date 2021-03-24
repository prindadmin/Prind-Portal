
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as StagePageSagas from './stagePageSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'
import * as StagePageDispatchers from '../Dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
  error: null,
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
const getPageContentAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    resolve: mockResolve,
    reject: mockReject
  }
}

const getPageContentDispatcherResult = {
  body: [
    {
      editable: true,
      description: 'The project brief is required for the project to start.  Everyone will use this document.',
      id: '1',
      fieldDetails: {
        tags: [],
        filename: 'Demo Project V1.3.2 - Brief Description.pdf'
      },
      title: 'Please upload your project brief',
      type: 'file',
      fileDetails: [
        {
          createdByDid: 'did:fnds:ca7722fabb7009aecf997a59973cd4fc810b820b15fd041b7671f146e97dcfc1',
          documentAttributes: [
            {
              fieldValue: 'Demo Project V1.3.2 - Brief Description.pdf',
              fieldType: 'Text',
              fieldName: 'Filename'
            },
            {
              fieldValue: 'Demo Project V1.3.2',
              fieldType: 'Text',
              fieldName: 'Project Name'
            },
            {
              fieldValue: 'inception',
              fieldType: 'Text',
              fieldName: 'Page Name'
            },
            {
              fieldValue: 'Please upload your project brief',
              fieldType: 'Text',
              fieldName: 'Field Title'
            }
          ],
          uploadedDateTime: '2021-02-25T08:43:29',
          hash: '8366ebbb75a18bf6e9ce891d9539510fe756467c06ba4fc2223e2c2024bb5da7',
          proofLink: 'https://testnet.explorer.factom.pro/entries/40bf370deabc3f09d9fb6fe0391790d1644c0c15dcaa9a3172f29de44ab1ad88',
          uploadedBy: 'Ben Jeater',
          ver: '0',
          signatures: [],
          s3VersionId: 'nCfbtsiMna7kfxhcyqh7PwoPrOJynVAR',
          uploadName: 'Demo Project V1.3.2 - Brief Description.pdf'
        },
        {
          createdByDid: 'did:fnds:ca7722fabb7009aecf997a59973cd4fc810b820b15fd041b7671f146e97dcfc1',
          documentAttributes: [
            {
              fieldValue: 'Demo Project V1.3.2 - Brief Description.pdf',
              fieldType: 'Text',
              fieldName: 'Filename'
            },
            {
              fieldValue: 'Demo Project V1.3.2',
              fieldType: 'Text',
              fieldName: 'Project Name'
            },
            {
              fieldValue: 'inception',
              fieldType: 'Text',
              fieldName: 'Page Name'
            },
            {
              fieldValue: 'Please upload your project brief',
              fieldType: 'Text',
              fieldName: 'Field Title'
            }
          ],
          uploadedDateTime: '2021-02-25T08:43:29',
          hash: '8366ebbb75a18bf6e9ce891d9539510fe756467c06ba4fc2223e2c2024bb5da7',
          proofLink: 'https://testnet.explorer.factom.pro/entries/40bf370deabc3f09d9fb6fe0391790d1644c0c15dcaa9a3172f29de44ab1ad88',
          uploadedBy: 'Ben Jeater',
          ver: '1',
          signatures: [],
          s3VersionId: 'nCfbtsiMna7kfxhcyqh7PwoPrOJynVAR',
          uploadName: 'Demo Project V1.3.2 - Brief Description.pdf'
        }
      ]
    }
  ]
}

var getPageContentActionWithoutResolveOrReject = JSON.parse(JSON.stringify(getPageContentAction))
delete getPageContentActionWithoutResolveOrReject.payload.resolve
delete getPageContentActionWithoutResolveOrReject.payload.reject

// Test succesful dispatch
var it = sagaHelper(StagePageSagas.getPageContent(getPageContentAction));
it('getPageContent - success - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentAction.payload.pageName]: {
        ...defaultState,
        fetching: true
      }
    }
  }));
});
it('getPageContent - success - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(StagePageDispatchers.getPageContent, getPageContentAction.payload.projectID, getPageContentAction.payload.pageName));
  return getPageContentDispatcherResult
});
it('getPageContent - success - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentAction.payload.pageName]: {
        ...defaultState,
        fields: getPageContentDispatcherResult.body
      }
    }
  }));
});
it('getPageContent - success - test rejection of signature resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getPageContentDispatcherResult)
});
it('getPageContent - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Test succesful dispatch without resolve
var it = sagaHelper(StagePageSagas.getPageContent(getPageContentActionWithoutResolveOrReject));
it('getPageContent - success without resolve - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentAction.payload.pageName]: {
        ...defaultState,
        fetching: true
      }
    }
  }));
});
it('getPageContent - success without resolve - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(StagePageDispatchers.getPageContent, getPageContentActionWithoutResolveOrReject.payload.projectID, getPageContentActionWithoutResolveOrReject.payload.pageName));
  return getPageContentDispatcherResult
});
it('getPageContent - success without resolve - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentActionWithoutResolveOrReject.payload.pageName]: {
        ...defaultState,
        fields: getPageContentDispatcherResult.body
      }
    }
  }));
});
it('getPageContent - success without resolve - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Test error in dispatch
var it = sagaHelper(StagePageSagas.getPageContent(getPageContentAction));
it('getPageContent - error - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentAction.payload.pageName]: {
        ...defaultState,
        fetching: true
      }
    }
  }));
});
it('getPageContent - error - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(StagePageDispatchers.getPageContent, getPageContentAction.payload.projectID, getPageContentAction.payload.pageName));
  return dispatcherError
});
it('getPageContent - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getPageContent - error - test rejection of signature resolve', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getPageContent - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Test error in dispatch without reject
var it = sagaHelper(StagePageSagas.getPageContent(getPageContentActionWithoutResolveOrReject));
it('getPageContent - error without reject - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      [getPageContentActionWithoutResolveOrReject.payload.pageName]: {
        ...defaultState,
        fetching: true
      }
    }
  }));
});
it('getPageContent - error without reject - test request to dispatcher is sent', (result) => {
  expect(result).toEqual(call(StagePageDispatchers.getPageContent, getPageContentActionWithoutResolveOrReject.payload.projectID, getPageContentActionWithoutResolveOrReject.payload.pageName));
  return dispatcherError
});
it('getPageContent - error without reject - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PAGE_SET_STATE,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getPageContent - error without reject - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});


var it = sagaHelper(StagePageSagas.default());
it('test all stage page sagas - getPageContent', (result) => {
  var expectedResult = fork(takeLatest, Actions.PAGE_GET_CONTENT_REQUESTED, StagePageSagas.getPageContent);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all stage page sagas - getPageContent', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL, StagePageSagas.getPageContent);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
