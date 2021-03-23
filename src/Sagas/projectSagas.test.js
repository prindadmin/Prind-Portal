
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
it('test init', (result) => {
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
const getAccessibleProjectsDispatcherReturn = {
  body: {
    projectCreator: [
      {
        data: '1610399291',
        projectId: 'Cdm2015Project12021-01-11',
        projectName: 'CDM2015 project 1',
        projectDescription: null,
        dateTime: '0000000000',
        projectType: 'CDM2015Project'
      }
    ],
    projectRole: [
      {
        projectId: 'Dhsf12021-01-12',
        projectName: 'dhsf  CML',
        projectDescription: null,
        dateTime: '1611331779',
        projectType: 'DHSFProject',
        roleName: 'Project Consultant'
      },
      {
        projectId: 'ImanuelS1MvpTest2020-03-09',
        projectName: 'Imanuel\'s 1 MVP test',
        projectDescription: 'Today the 9th March 2020 will be one of the most Memorable Mondays of Prin-D\n\nalthough I have worked closely with Ben and Simon... this is the first time, I am testing a working Version of the Prin-D concept...\n\nHappy Days...',
        dateTime: '1583748395',
        projectType: 'CDM2015Project',
        roleName: 'Client'
      }
    ]
  }
}
var it = sagaHelper(ProjectSagas.getAccessibleProjects(getAccessibleProjectsAction));
it('getAccessibleProjects - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getAccessibleProjects - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.getAccessibleProjects));
  return getAccessibleProjectsDispatcherReturn
});
it('getAccessibleProjects - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      accessibleProjects: getAccessibleProjectsDispatcherReturn.body
    }
  }));
});
it('getAccessibleProjects - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getAccessibleProjectsDispatcherReturn.body)
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
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
const createNewProjectDispatcherReturn = {
  body: {
    projectId: 'TestProject2021-02-16',
    projectType: "DHSFProject",
    projectName: "Test Project",
    projectDescription: null,
    projectReference: "1234",
    projectAddressLine1: "123 Fake Street",
    projectAddressLine2: "",
    projectAddressLine3: "",
    projectAddressTown: "Fake Town",
    projectAddressRegion: "Fake County",
    projectAddressPostalCode: "AB12 3CD",
    projectAddressCountry: "England",
  }
}
var it = sagaHelper(ProjectSagas.createNewProject(createNewProjectAction));
it('createNewProject - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('createNewProject - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.createNewProject, createNewProjectAction.payload.projectValues));
  return createNewProjectDispatcherReturn
});
it('createNewProject - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      fetching: false,
      project: createNewProjectDispatcherReturn.body
    }
  }));
});
it('createNewProject - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(createNewProjectDispatcherReturn.body)
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
const updateChosenProjectDispatcherReturn = {
  body: {
    projectId: 'TestProject2021-02-16',
    projectType: "DHSFProject",
    projectName: "Test Project",
    projectDescription: null,
    projectReference: "1234",
    projectAddressLine1: "123 Fake Street",
    projectAddressLine2: "",
    projectAddressLine3: "",
    projectAddressTown: "Fake Town",
    projectAddressRegion: "Fake County",
    projectAddressPostalCode: "AB12 3CD",
    projectAddressCountry: "England",
  }
}
var it = sagaHelper(ProjectSagas.updateChosenProject(updateChosenProjectAction));
it('updateChosenProject - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('updateChosenProject - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.fetchProjectDetails, updateChosenProjectAction.payload.project.projectId));
  return updateChosenProjectDispatcherReturn
});
it('updateChosenProject - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      chosenProject: updateChosenProjectDispatcherReturn.body,
      error: null
    }
  }));
});
it('updateChosenProject - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(updateChosenProjectDispatcherReturn.body)
});




const updateProjectDetailsAction = {
  payload: {
    projectID: "123",
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
var it = sagaHelper(ProjectSagas.updateProjectDetails(updateProjectDetailsAction));
it('updateProjectDetails - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('updateProjectDetails - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.updateProjectDetails, updateProjectDetailsAction.payload.projectID, updateProjectDetailsAction.payload.projectValues));
});
it('updateProjectDetails - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      chosenProject: updateProjectDetailsAction.payload.projectValues
    }
  }));
});
it('updateProjectDetails - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalled()
});



const getCurrentMembersAction = {
  payload: {
    projectID: "123",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getCurrentMembersDispatcherReturn = {
  body: {
    members: {
      confirmed: [
        {
          username: '9abdcffa-2ecd-4537-a99b-74c127ba54b4',
          foundationsID: null,
          emailAddress: 'client@prind.tech',
          firstName: null,
          lastName: null,
          roleID: 'client',
          roleName: 'Client'
        },
        {
          username: 'cb8c0582-fbca-4178-b23d-44bb4096262b',
          foundationsID: 'did:fnds:15aad5242a0b0d878b8ba0416d9f4f6792dafe6e969c1f57ab305a3bc8e4e1da',
          emailAddress: 'ben.jeater@prind.tech',
          firstName: 'Ben',
          lastName: 'Jeater',
          roleID: 'creator',
          roleName: 'Creator'
        }
      ],
      invited: [
        {
          username: 'e3389763-92c3-48e5-b8d0-0cb54edbf6c3',
          foundationsID: null,
          emailAddress: 'designer@prind.tech',
          firstName: null,
          lastName: null,
          roleID: 'designer',
          roleName: 'Designer'
        },
        {
          username: null,
          foundationsID: null,
          emailAddress: 'support@prind.tech',
          firstName: null,
          lastName: null,
          roleID: 'designer',
          roleName: 'Designer'
        }
      ]
    }
  }
}

var it = sagaHelper(ProjectSagas.getCurrentMembers(getCurrentMembersAction));
it('getCurrentMembers - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('getCurrentMembers - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.getCurrentMembers, getCurrentMembersAction.payload.projectID));
  return getCurrentMembersDispatcherReturn
});
it('getCurrentMembers - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      memberList: getCurrentMembersDispatcherReturn.body.members
    }
  }));
});
it('getCurrentMembers - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getCurrentMembersDispatcherReturn.body.members)
});



const uploadFileAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldID: 2,
    fileDetails: {
      fileName: "hellofile.txt",
    },
    fieldType: "file",
    resolve: mockResolve,
    reject: mockReject
  }
}
const uploadFileDispatcherReturn = {
  body: {},
  statusCode: 201
}
var it = sagaHelper(ProjectSagas.uploadFile(uploadFileAction));
it('uploadFile - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('uploadFile - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.uploadFile, uploadFileAction.payload));
  return uploadFileDispatcherReturn
});
it('uploadFile - test fetch of page data put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
    payload: {
      pageName: uploadFileAction.payload.pageName,
      projectID: uploadFileAction.payload.projectID,
      resolve: uploadFileAction.payload.resolve,
      reject: uploadFileAction.payload.reject
    }
  }));
});
it('uploadFile - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('uploadFile - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(uploadFileDispatcherReturn)
});



const downloadFileAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldID: 2,
    version: 1,
    resolve: mockResolve,
    reject: mockReject
  }
}
const downloadFileDispatcherReturn = {
  body: "https://1234.prind.tech",
  statusCode: 201
}
var it = sagaHelper(ProjectSagas.downloadFile(downloadFileAction));
it('downloadFile - test change to fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('downloadFile - test request to dispatcher', (result) => {
  expect(result).toEqual(call(ProjectDispatchers.downloadFile, downloadFileAction.payload));
  return downloadFileDispatcherReturn
});
it('downloadFile - test end of send put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      downloadURL: downloadFileDispatcherReturn.body,
    }
  }));
});
it('downloadFile - test callback resolve', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(downloadFileDispatcherReturn.body)
});




var it = sagaHelper(ProjectSagas.default());
it('test all project sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_INIT, ProjectSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - getAccessibleProjects', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, ProjectSagas.getAccessibleProjects);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - createNewProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_PROJECT_REQUESTED, ProjectSagas.createNewProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateChosenProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, ProjectSagas.updateChosenProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateProjectDetails', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, ProjectSagas.updateProjectDetails);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - getCurrentMembers', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, ProjectSagas.getCurrentMembers);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - uploadFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPLOAD_FILE_REQUESTED, ProjectSagas.uploadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - downloadFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DOWNLOAD_FILE_REQUESTED, ProjectSagas.downloadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - createField', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_FIELD_REQUESTED, ProjectSagas.createField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - updateField', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_FIELD_REQUESTED, ProjectSagas.updateField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - requestFileSignature', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, ProjectSagas.requestFileSignature);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all project sagas - deleteProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DELETE_PROJECT_REQUESTED, ProjectSagas.deleteProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
