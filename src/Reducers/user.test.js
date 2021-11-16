
import * as Functions from './user'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'
import * as Endpoints from '../Data/Endpoints'

let defaultState = {
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


it('User Reducer - init ', () => {
  const returnValue = {
    type: Actions.USER_INIT,
    payload: defaultState
  }
  const result = Functions.init()
  expect(result).toEqual(returnValue);
});


it('User Reducer - storeRoute ', () => {
  const currentRoute = "/design/123"
  const returnValue = {
    type: Actions.USER_SET_STATE,
    payload: {
      currentRoute
    }
  }
  const result = Functions.storeRoute(currentRoute)
  expect(result).toEqual(returnValue);
});


it('User Reducer - requestS3ProjectFileUploadToken ', () => {
  const project_id = "123"
  const pageName = "design"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED,
    payload: {
      project_id,
      pageName,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.requestS3ProjectFileUploadToken(project_id, pageName, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - requestS3UserFileUploadToken ', () => {
  const fileType = "jpeg"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED,
    payload: {
      fileType,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.requestS3UserFileUploadToken(fileType, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - getUserDetails ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_GET_DETAILS_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getUserDetails(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - getProjectInvitations ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getProjectInvitations(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - getProjectInvitations ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getProjectInvitations(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - respondToProjectInvitation ', () => {
  const projectID = "123"
  const response = {
    response: "reject"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED,
    payload: {
      projectID,
      response,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.respondToProjectInvitation(projectID, response, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - getSignatureRequests ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getSignatureRequests(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - respondToSignatureRequest ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const response = {
    response: "reject"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      response,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.respondToSignatureRequest(projectID, pageName, fieldID, response, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('User Reducer - getHistory ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.USER_GET_HISTORY_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getHistory(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});



it('test reducer handler with init action', () => {
  const action = {
    type: Actions.USER_INIT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with set state action', () => {
  const action = {
    type: Actions.USER_SET_STATE,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get upload file token request action', () => {
  const action = {
    type: Actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get upload user file token request action', () => {
  const action = {
    type: Actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get user details request action', () => {
  const action = {
    type: Actions.USER_GET_DETAILS_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project invitations request action', () => {
  const action = {
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project invitation response request action', () => {
  const action = {
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project signatures request action', () => {
  const action = {
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project signature send response request action', () => {
  const action = {
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get history request action', () => {
  const action = {
    type: Actions.USER_GET_HISTORY_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get upload file token request failed', () => {
  const action = {
    type: Actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get upload user file token request failed', () => {
  const action = {
    type: Actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get user details request failed', () => {
  const action = {
    type: Actions.USER_GET_DETAILS_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project invitations request failed', () => {
  const action = {
    type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project invitation response request failed', () => {
  const action = {
    type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project signatures request failed', () => {
  const action = {
    type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get project signature send response request failed', () => {
  const action = {
    type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get history request failed', () => {
  const action = {
    type: Actions.USER_GET_HISTORY_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with undefined state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.USER_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
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
