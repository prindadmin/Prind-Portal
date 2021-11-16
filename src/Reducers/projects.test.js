
import * as Functions from './projects'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'

// TODO: FUTURE: Remove this once accreditations is working
import UserAccreditations from '../Components/Temp/UserAccreditations'

const defaultChosenProject = {
  projectName: Strings.NO_PROJECT_SELECTED,
  projectId: "",
  projectType: "",
  projectAddressLine1: "",
  projectAddressLine2: "",
  projectAddressLine3: "",
  projectAddressTown: "",
  projectAddressRegion: "",
  projectAddressCountry: "",
  projectAddressPostalCode: "",
  projectDescription: "",
  projectReference: "",
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
  chosenProject: defaultChosenProject,
  error: null,
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
        ...defaultChosenProject,
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
        ...defaultChosenProject,
        projectName: Strings.NO_PROJECT_SELECTED,
        projectId: "",
        projectType: "",
      },
      error: null
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


it('Projects Reducer - downloadFile ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const version = "123456"

  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      version,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.downloadFile(projectID, pageName, fieldID, version, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - createField ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldDetails = {
    test: "test"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_CREATE_FIELD_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldDetails,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.createField(projectID, pageName, fieldDetails, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - updateField ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const fieldDetails = {
    test: "test"
  }
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_UPDATE_FIELD_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      fieldDetails,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.updateField(projectID, pageName, fieldID, fieldDetails, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - requestSignature ', () => {
  const projectID = "123"
  const pageName = "design"
  const fieldID = 2
  const members = ["1", "2"]
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      members,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.requestSignature(projectID, pageName, fieldID, members, mockResolve, mockReject)
  expect(result).toEqual(returnValue);
});


it('Projects Reducer - deleteProject ', () => {
  const projectID = "123"
  const mockResolve = jest.fn()
  const mockReject = jest.fn()
  const returnValue = {
    type: Actions.PROJECT_DELETE_PROJECT_REQUESTED,
    payload: {
      projectID,
      resolve: mockResolve,
      reject: mockReject
    }
  }
  const result = Functions.deleteProject(projectID, mockResolve, mockReject)
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
  const action = {
    type: Actions.PROJECT_INIT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with set state action', () => {
  const action = {
    type: Actions.PROJECT_SET_STATE,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get accessible projects requested', () => {
  const action = {
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with create project requested', () => {
  const action = {
    type: Actions.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with update project details requested', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with update project chosen requested', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with get current members requested', () => {
  const action = {
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with upload file requested', () => {
  const action = {
    type: Actions.PROJECT_UPLOAD_FILE_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with download file requested', () => {
  const action = {
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with create field requested', () => {
  const action = {
    type: Actions.PROJECT_CREATE_FIELD_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with update field requested', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_FIELD_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with file signature requested', () => {
  const action = {
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with delete project requested', () => {
  const action = {
    type: Actions.PROJECT_DELETE_PROJECT_REQUESTED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual({});
});


it('test reducer handler with get accessible project request sent action', () => {
  const action = {
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update chosen project request sent action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with create project request sent action', () => {
  const action = {
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update project details request sent action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get current members request sent action', () => {
  const action = {
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with upload file request sent action', () => {
  const action = {
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with download file request sent action', () => {
  const action = {
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with create file request sent action', () => {
  const action = {
    type: Actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update field request sent action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with file signature request sent action', () => {
  const action = {
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with project delete request sent action', () => {
  const action = {
    type: Actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get accessible project request failed action', () => {
  const action = {
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update chosen project request failed action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with create project request failed action', () => {
  const action = {
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update project details request failed action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with get current members request failed action', () => {
  const action = {
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with upload file request failed action', () => {
  const action = {
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with download file request failed action', () => {
  const action = {
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with create file request failed action', () => {
  const action = {
    type: Actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with update field request failed action', () => {
  const action = {
    type: Actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with file signature request failed action', () => {
  const action = {
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with project delete request failed action', () => {
  const action = {
    type: Actions.PROJECT_DELETE_PROJECT_REQUEST_FAILED,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with reset project request action', () => {
  const action = {
    type: Actions.PROJECT_RESET_CHOSEN_PROJECT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer({}, action)
  expect(result).toEqual(action.payload);
});


it('test reducer handler with reset download url request action', () => {
  const action = {
    type: Actions.PROJECT_RESET_DOWNLOAD_URL,
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
    type: Actions.PROJECT_INIT,
    payload: {
      test: 'test',
    }
  }
  const result = Functions.reducer(undefined, action)
  expect(result).toEqual({...defaultState, ...action.payload });
});
