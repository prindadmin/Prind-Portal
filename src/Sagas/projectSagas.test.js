
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as Sagas from './ProjectSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Strings from '../Data/Strings'
import * as Dispatchers from '../Dispatchers/projects'

// TODO: FUTURE: Test all the rejects from the Sagas

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

const defaultState = {
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
var it = sagaHelper(Sagas.init());
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
const getAccessibleProjectsActionWithoutCallbacks = {
  payload: {
    projectID: "123",
    memberDetails: {
      roleId: "1",
      emailAddress: "test@prind.tech"
    }
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
// Success with callbacks
var it = sagaHelper(Sagas.getAccessibleProjects(getAccessibleProjectsAction));
it('Project Sagas - getAccessibleProjects - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getAccessibleProjects));
  return getAccessibleProjectsDispatcherReturn
});
it('Project Sagas - getAccessibleProjects - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      accessibleProjects: getAccessibleProjectsDispatcherReturn.body
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getAccessibleProjectsDispatcherReturn.body)
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - getAccessibleProjects - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});


// Failure with callbacks
var it = sagaHelper(Sagas.getAccessibleProjects(getAccessibleProjectsAction));
it('Project Sagas - getAccessibleProjects - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Failure -  send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getAccessibleProjects));
  return dispatcherError
});
it('Project Sagas - getAccessibleProjects - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});
it('Project Sagas - getAccessibleProjects - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Success without callbacks
var it = sagaHelper(Sagas.getAccessibleProjects(getAccessibleProjectsActionWithoutCallbacks));
it('Project Sagas - getAccessibleProjects - Success without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Success without callbacks  - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getAccessibleProjects));
  return getAccessibleProjectsDispatcherReturn
});
it('Project Sagas - getAccessibleProjects - Success without callbacks  - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      accessibleProjects: getAccessibleProjectsDispatcherReturn.body
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Success without callbacks  - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - getAccessibleProjects - Success without callbacks  - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});


// Failure without callbacks
var it = sagaHelper(Sagas.getAccessibleProjects(getAccessibleProjectsActionWithoutCallbacks));
it('Project Sagas - getAccessibleProjects - Failure without callbacks  - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Failure without callbacks  -  send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getAccessibleProjects));
  return dispatcherError
});
it('Project Sagas - getAccessibleProjects - Failure without callbacks  - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - getAccessibleProjects - Failure without callbacks  - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - getAccessibleProjects - Failure without callbacks  - reached end of generator', (result) => {
  expect(result).toBeUndefined()
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
// Run successful fetch
var it = sagaHelper(Sagas.createNewProject(createNewProjectAction));
it('Project Sagas - createNewProject - success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - createNewProject - success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.createNewProject, createNewProjectAction.payload.projectValues));
  return createNewProjectDispatcherReturn
});
it('Project Sagas - createNewProject - success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      fetching: false,
      project: createNewProjectDispatcherReturn.body
    }
  }));
});
it('Project Sagas - createNewProject - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(createNewProjectDispatcherReturn.body)
});


// Run unsuccessful fetch
var it = sagaHelper(Sagas.createNewProject(createNewProjectAction));
it('Project Sagas - createNewProject - error - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - createNewProject - error - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.createNewProject, createNewProjectAction.payload.projectValues));
  return dispatcherError
});
it('Project Sagas - createNewProject - error - test error put', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - createNewProject - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
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
var it = sagaHelper(Sagas.updateChosenProject(updateChosenProjectAction));
it('Project Sagas - updateChosenProject - success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateChosenProject - success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.fetchProjectDetails, updateChosenProjectAction.payload.project.projectId));
  return updateChosenProjectDispatcherReturn
});
it('Project Sagas - updateChosenProject - success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      chosenProject: updateChosenProjectDispatcherReturn.body,
      error: null
    }
  }));
});
it('Project Sagas - updateChosenProject - success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(updateChosenProjectDispatcherReturn.body)
});


// Run unsuccessful fetch
var it = sagaHelper(Sagas.updateChosenProject(updateChosenProjectAction));
it('Project Sagas - updateChosenProject - error - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateChosenProject - error - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.fetchProjectDetails, updateChosenProjectAction.payload.project.projectId));
  return dispatcherError
});
it('Project Sagas - updateChosenProject - error - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - updateChosenProject - error - callback', (result) => {
  expect(mockReject).toHaveBeenCalledWith(dispatcherError)
});

/***

  Continue adding error tests below here.

***/


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
var it = sagaHelper(Sagas.updateProjectDetails(updateProjectDetailsAction));
it('Project Sagas - updateProjectDetails - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateProjectDetails - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.updateProjectDetails, updateProjectDetailsAction.payload.projectID, updateProjectDetailsAction.payload.projectValues));
});
it('Project Sagas - updateProjectDetails - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      chosenProject: {
        projectId: updateProjectDetailsAction.payload.projectID,
        ...updateProjectDetailsAction.payload.projectValues
      }
    }
  }));
});
it('Project Sagas - updateProjectDetails - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - updateProjectDetails - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.updateProjectDetails(updateProjectDetailsAction));
it('Project Sagas - updateProjectDetails - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateProjectDetails - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.updateProjectDetails, updateProjectDetailsAction.payload.projectID, updateProjectDetailsAction.payload.projectValues));
  return dispatcherError
});
it('Project Sagas - updateProjectDetails - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - updateProjectDetails - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - updateProjectDetails - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
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

// Success with callbacks
var it = sagaHelper(Sagas.getCurrentMembers(getCurrentMembersAction));
it('Project Sagas - getCurrentMembers - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getCurrentMembers - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getCurrentMembers, getCurrentMembersAction.payload.projectID));
  return getCurrentMembersDispatcherReturn
});
it('Project Sagas - getCurrentMembers - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      memberList: getCurrentMembersDispatcherReturn.body.members
    }
  }));
});
it('Project Sagas - getCurrentMembers - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(getCurrentMembersDispatcherReturn.body.members)
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - getCurrentMembers - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.getCurrentMembers(getCurrentMembersAction));
it('Project Sagas - getCurrentMembers - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - getCurrentMembers - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getCurrentMembers, getCurrentMembersAction.payload.projectID));
  return dispatcherError
});
it('Project Sagas - getCurrentMembers - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - getCurrentMembers - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - getCurrentMembers - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
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

// Success with callback
var it = sagaHelper(Sagas.uploadFile(uploadFileAction));
it('Project Sagas - uploadFile - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - uploadFile - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.uploadFile, uploadFileAction.payload));
  return uploadFileDispatcherReturn
});
it('Project Sagas - uploadFile - Success - fetch of page data put', (result) => {
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
it('Project Sagas - uploadFile - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('Project Sagas - uploadFile - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(uploadFileDispatcherReturn)
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - uploadFile - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callback
var it = sagaHelper(Sagas.uploadFile(uploadFileAction));
it('Project Sagas - uploadFile - Failed - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - uploadFile - Failed - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.uploadFile, uploadFileAction.payload));
  return dispatcherError
});
it('Project Sagas - uploadFile - Failed - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - uploadFile - Failed - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - uploadFile - Failed - reached end of generator', (result) => {
  expect(result).toBeUndefined()
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

// Success with callbacks
var it = sagaHelper(Sagas.downloadFile(downloadFileAction));
it('Project Sagas - downloadFile - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - downloadFile - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.downloadFile, downloadFileAction.payload));
  return downloadFileDispatcherReturn
});
it('Project Sagas - downloadFile - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      downloadURL: downloadFileDispatcherReturn.body,
    }
  }));
});
it('Project Sagas - downloadFile - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalledWith(downloadFileDispatcherReturn.body)
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - downloadFile - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.downloadFile(downloadFileAction));
it('Project Sagas - downloadFile - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - downloadFile - Failure - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.downloadFile, downloadFileAction.payload));
  return dispatcherError
});
it('Project Sagas - downloadFile - Failure - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - downloadFile - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - downloadFile - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});


const createFieldAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldDetails: {
      title: "New Test Field 1",
      description: "This is a new test field",
      type: "file"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
const createFieldDispatcherReturn = {
  body: "Success",
  statusCode: 201
}

// Success with callbacks
var it = sagaHelper(Sagas.createField(createFieldAction));
it('Project Sagas - createField - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - createField - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.createField, createFieldAction.payload));
  return createFieldDispatcherReturn
});
it('Project Sagas - createField - Success - test fetch of page data put', (result) => {
  const { payload } = createFieldAction

  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
    payload
  }));
});
it('Project Sagas - createField - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('Project Sagas - createField - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - createField - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.createField(createFieldAction));
it('Project Sagas - createField - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - createField - Failure - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.createField, createFieldAction.payload));
  return dispatcherError
});
it('Project Sagas - createField - Failure - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - createField - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - createField - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



const updateFieldAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldID: 2,
    fieldDetails: {
      title: "Update Test Field 1",
      description: "This is a field being updated",
      type: "file"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
const updateFieldDispatcherReturn = {
  body: "Success",
  statusCode: 201
}

// Success with callbacks
var it = sagaHelper(Sagas.updateField(updateFieldAction));
it('Project Sagas - updateField - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateField - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.updateField, updateFieldAction.payload));
  return updateFieldDispatcherReturn
});
it('Project Sagas - updateField - Success - test fetch of page data put', (result) => {
  const { payload } = updateFieldAction
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
    payload
  }));
});
it('Project Sagas - updateField - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
    }
  }));
});
it('Project Sagas - updateField - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - updateField - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.updateField(updateFieldAction));
it('Project Sagas - updateField - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - updateField - Failure - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.updateField, updateFieldAction.payload));
  return dispatcherError
});
it('Project Sagas - updateField - Failure - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - updateField - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - updateField - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



const requestFileSignatureAction = {
  payload: {
    projectID: "123",
    pageName: "Design",
    fieldID: 2,
    members: [
      'aaaa-aaaa-aaaaaaaa-aaaa',
      'bbbb-bbbb-bbbbbbbb-bbbb'
    ],
    resolve: mockResolve,
    reject: mockReject
  }
}
const requestFileSignatureDispatcherReturn = {
  body: "Success",
  statusCode: 201
}

// Success with callbacks
var it = sagaHelper(Sagas.requestFileSignature(requestFileSignatureAction));
it('Project Sagas - requestFileSignature - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - requestFileSignature - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.requestSignature, requestFileSignatureAction.payload));
  return requestFileSignatureDispatcherReturn
});
it('Project Sagas - requestFileSignature - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: {
      fetching: false,
      error: null,
    }
  }));
});
it('Project Sagas - requestFileSignature - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - requestFileSignature - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.requestFileSignature(requestFileSignatureAction));
it('Project Sagas - requestFileSignature - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - requestFileSignature - Failure - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.requestSignature, requestFileSignatureAction.payload));
  return dispatcherError
});
it('Project Sagas - requestFileSignature - Failure - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError,
    }
  }));
});
it('Project Sagas - requestFileSignature - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - requestFileSignature - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



const deleteProjectAction = {
  payload: {
    projectID: "123",
    resolve: mockResolve,
    reject: mockReject
  }
}
const deleteProjectDispatcherReturn = {
  body: "Success",
  statusCode: 200
}

// Success with callbacks
var it = sagaHelper(Sagas.deleteProject(deleteProjectAction));
it('Project Sagas - deleteProject - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - deleteProject - Success - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.deleteProject, deleteProjectAction.payload.projectID));
  return deleteProjectDispatcherReturn
});
it('Project Sagas - deleteProject - Success - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_SET_STATE,
    payload: defaultState
  }));
});
it('Project Sagas - deleteProject - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Project Sagas - deleteProject - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.deleteProject(deleteProjectAction));
it('Project Sagas - deleteProject - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Project Sagas - deleteProject - Failure - dispatcher send', (result) => {
  expect(result).toEqual(call(Dispatchers.deleteProject, deleteProjectAction.payload.projectID));
  return dispatcherError
});
it('Project Sagas - deleteProject - Failure - send final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.PROJECT_DELETE_PROJECT_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Project Sagas - deleteProject - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Project Sagas - deleteProject - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});





var it = sagaHelper(Sagas.default());
it('Project Sagas - test all project sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_INIT, Sagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - getAccessibleProjects', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, Sagas.getAccessibleProjects);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - createNewProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_PROJECT_REQUESTED, Sagas.createNewProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - updateChosenProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, Sagas.updateChosenProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - updateProjectDetails', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, Sagas.updateProjectDetails);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - getCurrentMembers', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, Sagas.getCurrentMembers);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - uploadFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPLOAD_FILE_REQUESTED, Sagas.uploadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - downloadFile', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DOWNLOAD_FILE_REQUESTED, Sagas.downloadFile);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - createField', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_CREATE_FIELD_REQUESTED, Sagas.createField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - updateField', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_UPDATE_FIELD_REQUESTED, Sagas.updateField);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - requestFileSignature', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, Sagas.requestFileSignature);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('Project Sagas - test all project sagas - deleteProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.PROJECT_DELETE_PROJECT_REQUESTED, Sagas.deleteProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
