
import * as Functions from './projects'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'

// TODO: Remove this once accreditations is working
import UserAccreditations from '../Components/Temp/UserAccreditations'

const defaultChosenProject = {
  projectName: Strings.NO_PROJECT_SELECTED,
  projectId: "",
  projectType: "",
}

let defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: defaultChosenProject,
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

const blankChosenState = {
  chosenProject: defaultChosenProject
}


it('Projects Reducer - init ', () => {
  const returnValue = {
    type: Actions.PROJECT_INIT,
    payload: defaultState
  }
  const result = Functions.init()
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - resetChosenProject ', () => {

  const returnValue = {
    type: Actions.PROJECT_RESET_CHOSEN_PROJECT,
    payload: blankChosenState
  }
  const result = Functions.resetChosenProject()
  expect(result).toEqual(returnValue);
});

/*
it('Projects Reducer - removeMemberFromProject ', () => {
  const projectID = "123"
  const memberUsername = "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_REMOVE_PROJECT_REQUESTED,
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


it('Projects Reducer - getRoles ', () => {
  const projectID = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_GET_AVAILABLE_ROLES_REQUESTED,
    payload: {
      projectID,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getRoles(projectID, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - getUserAccreditations ', () => {
  const username = "aaaa-aaaa-aaaaaaaa-aaaa-aaaa"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_SET_STATE,
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
*/

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
    type: Actions.PROJECT_INIT,
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
    type: Actions.PROJECT_SET_STATE,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});

/*
it('test reducer handler with add member requested action', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const action = {
    type: Actions.PROJECT_ADD_PROJECT_REQUESTED,
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
    type: Actions.PROJECT_REMOVE_PROJECT_REQUESTED,
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
    type: Actions.PROJECT_GET_AVAILABLE_ROLES_REQUESTED,
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
    type: Actions.PROJECT_ADD_PROJECT_REQUEST_SENT,
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
    type: Actions.PROJECT_REMOVE_PROJECT_REQUEST_SENT,
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
    type: Actions.PROJECT_GET_AVAILABLE_ROLES_REQUEST_SENT,
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
    type: Actions.PROJECT_ADD_PROJECT_REQUEST_FAILED,
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
    type: Actions.PROJECT_REMOVE_PROJECT_REQUEST_FAILED,
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
    type: Actions.PROJECT_GET_AVAILABLE_ROLES_REQUEST_FAILED,
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
    type: Actions.PROJECT_INIT,
    payload: {
      test: 'test',
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
});
*/
