
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as ProjectSagas from './ProjectSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'
import * as ProjectDispatchers from '../Dispatchers/projects'

// TODO: Test all the rejects from the Sagas

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: {
    projectName: Strings.NO_PROJECT_SELECTED,
    projectId: "",
    projectType: "",
  },
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(ProjectSagas.init());
it('test init', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});


const getAccessibleProjectsAction = {
  payload: {
    projectID: "123",
    memberDetails: {
      roleId: "1",
      emailAddress: "test@prind.tech"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(ProjectSagas.getAccessibleProjects(getAccessibleProjectsAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(ProjectDispatchers.getAccessibleProjects));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      accessibleProjects: undefined
    }
  }));
});
it('test callback resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});





const createNewProjectAction = {
  payload: {
    projectValues: {
      projectName: "Test Project",
      projectReference: "1234",
      projectAddressLine1: "123 Fake Street",
      projectAddressLine2: "",
      projectAddressLine3: "",
      projectAddressTown: "Fake Town",
      projectAddressRegion: "Fake County",
      projectAddressPostalCode: "AB12 3CD",
      projectAddressCountry: "England",
      projectType: "DHSFProject"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(ProjectSagas.createNewProject(createNewProjectAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(ProjectDispatchers.createNewProject, createNewProjectAction.payload.projectValues));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      fetching: false,
      project: undefined
    }
  }));
});
it('test callback resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});



const updateChosenProjectAction = {
  payload: {
    project: {
      projectId: "123",
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(ProjectSagas.updateChosenProject(updateChosenProjectAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(ProjectDispatchers.fetchProjectDetails, updateChosenProjectAction.payload.project.projectId));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      chosenProject: undefined,
      error: null
    }
  }));
});
it('test callback resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});






var it = sagaHelper(ProjectSagas.default());
it('test all project sagas - init', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_INIT, ProjectSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - getAccessibleProjects', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, ProjectSagas.getAccessibleProjects);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - createNewProject', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_PROJECT_REQUESTED, ProjectSagas.createNewProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateChosenProject', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, ProjectSagas.updateChosenProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateProjectDetails', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, ProjectSagas.updateProjectDetails);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - getCurrentMembers', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, ProjectSagas.getCurrentMembers);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - uploadFile', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPLOAD_FILE_REQUESTED, ProjectSagas.uploadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - downloadFile', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DOWNLOAD_FILE_REQUESTED, ProjectSagas.downloadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - createField', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_FIELD_REQUESTED, ProjectSagas.createField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateField', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_FIELD_REQUESTED, ProjectSagas.updateField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - requestFileSignature', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, ProjectSagas.requestFileSignature);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - deleteProject', async (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DELETE_PROJECT_REQUESTED, ProjectSagas.deleteProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
