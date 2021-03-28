
import * as Functions from './members'
import * as Actions from '../Actions'
import * as States from '../States'

// TODO: Remove this once accreditations is working
import UserAccreditations from '../Components/Temp/UserAccreditations'

let defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}


it('Members Reducer - init ', () => {
  const returnValue = {
    type: Actions.MEMBERS_INIT,
    payload: defaultState
  }
  const result = Functions.init()
  expect(result).toEqual(returnValue);
});


it('Members Reducer - addMemberToProject ', () => {
  const projectID = "123"
  const memberDetails = {
    username: "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.MEMBERS_ADD_MEMBERS_REQUESTED,
    payload: {
      projectID,
      memberDetails,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.addMemberToProject(projectID, memberDetails, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Members Reducer - removeMemberFromProject ', () => {
  const projectID = "123"
  const memberUsername = "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUESTED,
    payload: {
      projectID,
      memberUsername,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.removeMemberFromProject(projectID, memberUsername, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Members Reducer - getRoles ', () => {
  const projectID = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUESTED,
    payload: {
      projectID,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getRoles(projectID, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Members Reducer - getUserAccreditations ', () => {
  const username = "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      currentMember: {
        username,
        accreditations: UserAccreditations,
      },
    }
  }
  const result = Functions.tempGetUserAccreditations(username, mockResolve, mockReject)
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
    type: Actions.MEMBERS_INIT,
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
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with add member requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_ADD_MEMBERS_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with remove member requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with get available roles requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUESTED,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with add member request dispatched', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with remove member request dispatched', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get available roles request dispatched', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with add member request failed', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with remove member request failed', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get available roles request failed', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED,
    payload: {
      fetching: false,
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with undefined state action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.MEMBERS_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
});
