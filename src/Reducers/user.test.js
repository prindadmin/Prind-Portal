
import * as Functions from './user'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'
import * as Endpoints from '../Data/Endpoints'

let defaultState = {
  fetching: false,
  details: {},
  history: {},
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: {},
  userS3Token: {},
  currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
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

/*
it('User Reducer - getPageContent ', () => {
  const projectID = "123"
  const pageName = "design"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      projectID,
      pageName,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getPageContent("123", "design", mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('test reducer handler with get content request action', () => {
  const action = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});
*/

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

/*
it('test reducer handler with get content request action', () => {
  const action = {
    type: Actions.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});
*/
