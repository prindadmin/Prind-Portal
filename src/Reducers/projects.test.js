
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


it('Projects Reducer - resetDownloadURL ', () => {
  const returnValue = {
    type: Actions.PROJECT_RESET_DOWNLOAD_URL,
    payload: {
      downloadURL: "",
    }
  }
  const result = Functions.resetDownloadURL()
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - getAccessibleProjects ', () => {
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getAccessibleProjects(mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - updateChosenProject ', () => {
  const chosenProject = {
    projectId: "123"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      project: chosenProject,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.updateChosenProject(chosenProject, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - saveProjectID with id provided', () => {
  const projectId = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_SET_STATE,
    payload: {
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "123",
        projectType: "",
      }
    }
  }
  const result = Functions.saveProjectID(projectId)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - saveProjectID without id provided', () => {
  const projectId = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_SET_STATE,
    payload: {
      chosenProject: {
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "",
        projectType: "",
      }
    }
  }
  const result = Functions.saveProjectID()
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - createProject ', () => {
  const projectValues = {
    projectId: "123"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      projectValues,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.createProject(projectValues, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - updateProjectDetails ', () => {
  const projectID = "123"
  const projectValues = {
    projectName: "hello, project"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED,
    payload: {
      projectID,
      projectValues,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.updateProjectDetails(projectID, projectValues, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - getCurrentMembers ', () => {
  const projectID = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED,
    payload: {
      projectID,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.getCurrentMembers(projectID, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - uploadFile ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const fileDetails = {
    name: "some name"
  }
  const fieldType = "file"

  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_UPLOAD_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      fileDetails,
      fieldType,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});

/*
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
