
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as UserSagas from './userSagas'
import * as Actions from '../Actions'
//import * as States from '../States'
//import * as Strings from '../Data/Strings'
import * as Endpoints from '../Data/Endpoints'
import * as UserDispatchers from '../Dispatchers/user'

const defaultState = {
  fetching: false,
  details: {},
  history: {
    documentVersions: []
  },
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: {},
  userS3Token: {},
  error: undefined,
  currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
  currentRouteObject: {
    hash: "",
    pathname: Endpoints.DEFAULTLOGGEDINPAGE,
    search: "",
    state: undefined
  }
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
var it = sagaHelper(UserSagas.init());
it('init - success - test', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: defaultState
  }));
});

const getS3ProjectFileUploadTokenAction = {
  payload: {
    project_id: "123",
    pageName: "Design",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getS3ProjectFileUploadTokenActionWithoutCallbacks = {
  payload: {
    project_id: "123",
    pageName: "Design",
  }
}
const getS3ProjectFileUploadTokenDispatcherReturn = {
  body: "123-token"
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getS3ProjectFileUploadToken(getS3ProjectFileUploadTokenAction));
it('getS3ProjectFileUploadToken - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3ProjectFileUploadToken, getS3ProjectFileUploadTokenAction.payload.project_id, getS3ProjectFileUploadTokenAction.payload.pageName));
  return getS3ProjectFileUploadTokenDispatcherReturn
});
it('getS3ProjectFileUploadToken - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      projectS3Token: getS3ProjectFileUploadTokenDispatcherReturn.body
    }
  }));
});
it('getS3ProjectFileUploadToken - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getS3ProjectFileUploadTokenDispatcherReturn.body)
});
it('getS3ProjectFileUploadToken - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getS3ProjectFileUploadToken(getS3ProjectFileUploadTokenAction));
it('getS3ProjectFileUploadToken - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3ProjectFileUploadToken, getS3ProjectFileUploadTokenAction.payload.project_id, getS3ProjectFileUploadTokenAction.payload.pageName));
  return dispatcherError
});
it('getS3ProjectFileUploadToken - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      error: dispatcherError
    }
  }));
});
it('getS3ProjectFileUploadToken - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getS3ProjectFileUploadToken - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getS3ProjectFileUploadToken(getS3ProjectFileUploadTokenActionWithoutCallbacks));
it('getS3ProjectFileUploadToken - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3ProjectFileUploadToken, getS3ProjectFileUploadTokenActionWithoutCallbacks.payload.project_id, getS3ProjectFileUploadTokenActionWithoutCallbacks.payload.pageName));
  return getS3ProjectFileUploadTokenDispatcherReturn
});
it('getS3ProjectFileUploadToken - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      projectS3Token: getS3ProjectFileUploadTokenDispatcherReturn.body
    }
  }));
});
it('getS3ProjectFileUploadToken - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getS3ProjectFileUploadToken - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getS3ProjectFileUploadToken(getS3ProjectFileUploadTokenActionWithoutCallbacks));
it('getS3ProjectFileUploadToken - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3ProjectFileUploadToken, getS3ProjectFileUploadTokenActionWithoutCallbacks.payload.project_id, getS3ProjectFileUploadTokenActionWithoutCallbacks.payload.pageName));
  return dispatcherError
});
it('getS3ProjectFileUploadToken - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      error: dispatcherError
    }
  }));
});
it('getS3ProjectFileUploadToken - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getS3ProjectFileUploadToken - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const getS3UserFileUploadTokenAction = {
  payload: {
    fileType: "file",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getS3UserFileUploadTokenActionWithoutCallbacks = {
  payload: {
    fileType: "file",
  }
}
const getS3UserFileUploadTokenDispatcherReturn = {
  body: "123-token"
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getS3UserFileUploadToken(getS3UserFileUploadTokenAction));
it('getS3UserFileUploadToken - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3UserFileUploadToken, getS3UserFileUploadTokenAction.payload.fileType));
  return getS3UserFileUploadTokenDispatcherReturn
});
it('getS3UserFileUploadToken - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      userS3Token: getS3UserFileUploadTokenDispatcherReturn.body
    }
  }));
});
it('getS3UserFileUploadToken - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getS3UserFileUploadTokenDispatcherReturn.body)
});
it('getS3UserFileUploadToken - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getS3UserFileUploadToken(getS3UserFileUploadTokenAction));
it('getS3UserFileUploadToken - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3UserFileUploadToken, getS3UserFileUploadTokenAction.payload.fileType));
  return dispatcherError
});
it('getS3UserFileUploadToken - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      error: dispatcherError
    }
  }));
});
it('getS3UserFileUploadToken - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getS3UserFileUploadToken - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getS3UserFileUploadToken(getS3UserFileUploadTokenActionWithoutCallbacks));
it('getS3UserFileUploadToken - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3UserFileUploadToken, getS3UserFileUploadTokenActionWithoutCallbacks.payload.fileType));
  return getS3UserFileUploadTokenDispatcherReturn
});
it('getS3UserFileUploadToken - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      userS3Token: getS3UserFileUploadTokenDispatcherReturn.body
    }
  }));
});
it('getS3UserFileUploadToken - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getS3UserFileUploadToken - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getS3UserFileUploadToken(getS3UserFileUploadTokenActionWithoutCallbacks));
it('getS3UserFileUploadToken - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getS3UserFileUploadToken, getS3UserFileUploadTokenActionWithoutCallbacks.payload.fileType));
  return dispatcherError
});
it('getS3UserFileUploadToken - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      error: dispatcherError
    }
  }));
});
it('getS3UserFileUploadToken - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getS3UserFileUploadToken - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const getUserDetailsAction = {
  payload: {
    identityToken: "1234-token",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getUserDetailsActionWithoutCallbacks = {
  payload: {
    identityToken: "1234-token",
  }
}
const getUserDetailsDispatcherReturn = {
  body: {
    username: "aaaa-aaaa-aaaaaaaa-aaaa",
    firstName: "Testy",
    lastName: "McTesterson"
  }
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getUserDetails(getUserDetailsAction));
it('getUserDetails - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getUserDetails - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getUserDetails, getUserDetailsAction.payload.identityToken));
  return getUserDetailsDispatcherReturn
});
it('getUserDetails - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      details: getUserDetailsDispatcherReturn.body
    }
  }));
});
it('getUserDetails - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getUserDetailsDispatcherReturn.body)
});
it('getUserDetails - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getUserDetails(getUserDetailsAction));
it('getUserDetails - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getUserDetails - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getUserDetails, getUserDetailsAction.payload.identityToken));
  return dispatcherError
});
it('getUserDetails - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getUserDetails - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getUserDetails - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getUserDetails(getUserDetailsActionWithoutCallbacks));
it('getUserDetails - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getUserDetails - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getUserDetails, getUserDetailsActionWithoutCallbacks.payload.identityToken));
  return getUserDetailsDispatcherReturn
});
it('getUserDetails - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      details: getUserDetailsDispatcherReturn.body
    }
  }));
});
it('getUserDetails - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getUserDetails - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getUserDetails(getUserDetailsActionWithoutCallbacks));
it('getUserDetails - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getUserDetails - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getUserDetails, getUserDetailsActionWithoutCallbacks.payload.identityToken));
  return dispatcherError
});
it('getUserDetails - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_DETAILS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getUserDetails - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getUserDetails - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const getProjectInvitationsAction = {
  payload: {
    identityToken: "1234-token",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getProjectInvitationsActionWithoutCallbacks = {
  payload: {
    identityToken: "1234-token",
  }
}
const getProjectInvitationsDispatcherReturn = {
  body: {
    username: "aaaa-aaaa-aaaaaaaa-aaaa",
    firstName: "Testy",
    lastName: "McTesterson"
  }
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getProjectInvitations(getProjectInvitationsAction));
it('getProjectInvitations - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getProjectInvitations - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getProjectInvitations, []));
  return getProjectInvitationsDispatcherReturn
});
it('getProjectInvitations - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      projectInvitations: getProjectInvitationsDispatcherReturn.body
    }
  }));
});
it('getProjectInvitations - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getProjectInvitationsDispatcherReturn.body)
});
it('getProjectInvitations - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getProjectInvitations(getProjectInvitationsAction));
it('getProjectInvitations - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getProjectInvitations - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getProjectInvitations, getProjectInvitationsAction.payload.identityToken));
  return dispatcherError
});
it('getProjectInvitations - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getProjectInvitations - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getProjectInvitations - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getProjectInvitations(getProjectInvitationsActionWithoutCallbacks));
it('getProjectInvitations - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getProjectInvitations - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getProjectInvitations, getProjectInvitationsActionWithoutCallbacks.payload.identityToken));
  return getProjectInvitationsDispatcherReturn
});
it('getProjectInvitations - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      projectInvitations: getProjectInvitationsDispatcherReturn.body
    }
  }));
});
it('getProjectInvitations - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getProjectInvitations - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getProjectInvitations(getProjectInvitationsActionWithoutCallbacks));
it('getProjectInvitations - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getProjectInvitations - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getProjectInvitations, getProjectInvitationsActionWithoutCallbacks.payload.identityToken));
  return dispatcherError
});
it('getProjectInvitations - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getProjectInvitations - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getProjectInvitations - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const respondToProjectInvitationAction = {
  payload: {
    projectID: "1234",
    response: "reject",
    resolve: mockResolve,
    reject: mockReject
  }
}
const respondToProjectInvitationActionWithoutCallbacks = {
  payload: {
    projectID: "1234",
    response: "reject",
  }
}
const respondToProjectInvitationDispatcherReturn = {
  body: {
    statusCode: 201,
    body: "Success"
  }
}
// Run successful dispatch
var it = sagaHelper(UserSagas.respondToProjectInvitation(respondToProjectInvitationAction));
it('respondToProjectInvitation - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToProjectInvitation - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToProjectInvitation, respondToProjectInvitationAction.payload.projectID, respondToProjectInvitationAction.payload.response));
  return respondToProjectInvitationDispatcherReturn
});
it('respondToProjectInvitation - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('respondToProjectInvitation - success - call request project functions', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {}
  }));
});
it('respondToProjectInvitation - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith()
});
it('respondToProjectInvitation - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.respondToProjectInvitation(respondToProjectInvitationAction));
it('respondToProjectInvitation - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToProjectInvitation - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToProjectInvitation, respondToProjectInvitationAction.payload.projectID, respondToProjectInvitationAction.payload.response));
  return dispatcherError
});
it('respondToProjectInvitation - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('respondToProjectInvitation - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('respondToProjectInvitation - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.respondToProjectInvitation(respondToProjectInvitationActionWithoutCallbacks));
it('respondToProjectInvitation - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToProjectInvitation - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToProjectInvitation, respondToProjectInvitationActionWithoutCallbacks.payload.projectID, respondToProjectInvitationActionWithoutCallbacks.payload.response));
  return respondToProjectInvitationDispatcherReturn
});
it('respondToProjectInvitation - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('respondToProjectInvitation - success - call request project functions', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {}
  }));
});
it('respondToProjectInvitation - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('respondToProjectInvitation - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.respondToProjectInvitation(respondToProjectInvitationActionWithoutCallbacks));
it('respondToProjectInvitation - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToProjectInvitation - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToProjectInvitation, respondToProjectInvitationActionWithoutCallbacks.payload.projectID, respondToProjectInvitationActionWithoutCallbacks.payload.response));
  return dispatcherError
});
it('respondToProjectInvitation - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('respondToProjectInvitation - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('respondToProjectInvitation - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const getSignatureRequestsAction = {
  payload: {
    identityToken: "1234-token",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getSignatureRequestsActionWithoutCallbacks = {
  payload: {
    identityToken: "1234-token",
  }
}
const getSignatureRequestsDispatcherReturn = {
  body: [
      {
      requestId: "aaaa-aaaa-aaaaaaaa-aaaa",
      projectName: "Test 123",
    }
  ]
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getSignatureRequests(getSignatureRequestsAction));
it('getSignatureRequests - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getSignatureRequests - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getSignatureRequests, getSignatureRequestsAction.payload.identityToken));
  return getSignatureRequestsDispatcherReturn
});
it('getSignatureRequests - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      signatureRequests: getSignatureRequestsDispatcherReturn.body
    }
  }));
});
it('getSignatureRequests - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getSignatureRequestsDispatcherReturn.body)
});
it('getSignatureRequests - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getSignatureRequests(getSignatureRequestsAction));
it('getSignatureRequests - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getSignatureRequests - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getSignatureRequests, getSignatureRequestsAction.payload.identityToken));
  return dispatcherError
});
it('getSignatureRequests - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getSignatureRequests - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getSignatureRequests - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getSignatureRequests(getSignatureRequestsActionWithoutCallbacks));
it('getSignatureRequests - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getSignatureRequests - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getSignatureRequests, getSignatureRequestsActionWithoutCallbacks.payload.identityToken));
  return getSignatureRequestsDispatcherReturn
});
it('getSignatureRequests - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      signatureRequests: getSignatureRequestsDispatcherReturn.body
    }
  }));
});
it('getSignatureRequests - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getSignatureRequests - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getSignatureRequests(getSignatureRequestsActionWithoutCallbacks));
it('getSignatureRequests - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getSignatureRequests - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getSignatureRequests, getSignatureRequestsActionWithoutCallbacks.payload.identityToken));
  return dispatcherError
});
it('getSignatureRequests - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getSignatureRequests - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getSignatureRequests - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const respondToSignatureRequestAction = {
  payload: {
    projectID: "1234",
    pageName: "Design",
    fieldID: 1,
    response: "Reject",
    resolve: mockResolve,
    reject: mockReject
  }
}
const respondToSignatureRequestActionWithoutCallbacks = {
  payload: {
    projectID: "1234",
    pageName: "Design",
    fieldID: 1,
    response: "Reject",
  }
}
const respondToSignatureRequestDispatcherReturn = {
  body: {
    statusCode: 201,
    body: "Success"
  }
}
// Run successful dispatch
var it = sagaHelper(UserSagas.respondToSignatureRequest(respondToSignatureRequestAction));
it('respondToSignatureRequest - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToSignatureRequest - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToSignatureRequest, respondToSignatureRequestAction.payload));
  return respondToSignatureRequestDispatcherReturn
});
it('respondToSignatureRequest - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('respondToSignatureRequest - success - call request project signatures', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {}
  }));
});
it('respondToSignatureRequest - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith()
});
it('respondToSignatureRequest - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.respondToSignatureRequest(respondToSignatureRequestAction));
it('respondToSignatureRequest - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToSignatureRequest - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToSignatureRequest, respondToSignatureRequestAction.payload));
  return dispatcherError
});
it('respondToSignatureRequest - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('respondToSignatureRequest - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('respondToSignatureRequest - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.respondToSignatureRequest(respondToSignatureRequestActionWithoutCallbacks));
it('respondToSignatureRequest - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToSignatureRequest - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToSignatureRequest, respondToSignatureRequestActionWithoutCallbacks.payload));
  return respondToSignatureRequestDispatcherReturn
});
it('respondToSignatureRequest - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('respondToSignatureRequest - success - call request project signatures', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {}
  }));
});
it('respondToSignatureRequest - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('respondToSignatureRequest - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.respondToSignatureRequest(respondToSignatureRequestActionWithoutCallbacks));
it('respondToSignatureRequest - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('respondToSignatureRequest - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.respondToSignatureRequest, respondToSignatureRequestActionWithoutCallbacks.payload));
  return dispatcherError
});
it('respondToSignatureRequest - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('respondToSignatureRequest - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('respondToSignatureRequest - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});






const getHistoryAction = {
  payload: {
    identityToken: "1234-token",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getHistoryActionWithoutCallbacks = {
  payload: {
    identityToken: "1234-token",
  }
}
const getHistoryDispatcherReturn = {
  body: [
      {
      historyId: "aaaa-aaaa-aaaaaaaa-aaaa",
      projectName: "Test 123",
    }
  ]
}
// Run successful dispatch
var it = sagaHelper(UserSagas.getHistory(getHistoryAction));
it('getHistory - success - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getHistory - success - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getHistory, getHistoryAction.payload.identityToken));
  return getHistoryDispatcherReturn
});
it('getHistory - success - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      history: getHistoryDispatcherReturn.body
    }
  }));
});
it('getHistory - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getHistoryDispatcherReturn.body)
});
it('getHistory - success - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch
var it = sagaHelper(UserSagas.getHistory(getHistoryAction));
it('getHistory - error - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getHistory - error - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getHistory, getHistoryAction.payload.identityToken));
  return dispatcherError
});
it('getHistory - error - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getHistory - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('getHistory - error - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run successful dispatch without callback
var it = sagaHelper(UserSagas.getHistory(getHistoryActionWithoutCallbacks));
it('getHistory - success without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getHistory - success without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getHistory, getHistoryActionWithoutCallbacks.payload.identityToken));
  return getHistoryDispatcherReturn
});
it('getHistory - success without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_SET_STATE,
    payload: {
      fetching: false,
      history: getHistoryDispatcherReturn.body
    }
  }));
});
it('getHistory - success without callback - no callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
});
it('getHistory - success without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});

// Run failed dispatch without callback
var it = sagaHelper(UserSagas.getHistory(getHistoryActionWithoutCallbacks));
it('getHistory - error without callback - fetching state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getHistory - error without callback - request to dispatcher', (result) => {
  expect(result).toEqual(call(UserDispatchers.getHistory, getHistoryActionWithoutCallbacks.payload.identityToken));
  return dispatcherError
});
it('getHistory - error without callback - end state put', (result) => {
  expect(result).toEqual(put({
    type: Actions.USER_GET_HISTORY_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('getHistory - error without callback - no callback', (result) => {
  expect(mockReject).not.toHaveBeenCalled()
});
it('getHistory - error without callback - reached end of generator', (result) => {
  expect(result).toBeUndefined();
});


var it = sagaHelper(UserSagas.default());
it('test all user sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_INIT, UserSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getS3ProjectFileUploadToken', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED, UserSagas.getS3ProjectFileUploadToken);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getS3UserFileUploadToken', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED, UserSagas.getS3UserFileUploadToken);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getUserDetails', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_GET_DETAILS_REQUESTED, UserSagas.getUserDetails);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getProjectInvitations', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED, UserSagas.getProjectInvitations);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - respondToProjectInvitation', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED, UserSagas.respondToProjectInvitation);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getSignatureRequests', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED, UserSagas.getSignatureRequests);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - respondToSignatureRequest', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED, UserSagas.respondToSignatureRequest);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all user sagas - getHistory', (result) => {
  var expectedResult = fork(takeLatest, Actions.USER_GET_HISTORY_REQUESTED, UserSagas.getHistory);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
