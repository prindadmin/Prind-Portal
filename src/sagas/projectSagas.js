
import { call, put, takeLatest } from 'redux-saga/effects'

import * as Dispatchers from '../Dispatchers/projects'

import * as Actions from '../Actions'
import * as Strings from '../Data/Strings'

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: {
    projectName: Strings.NO_PROJECT_SELECTED,
    projectId: "",
  },
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

function * init (action) {
  yield put({
    type: Actions.PROJECT_SET_STATE,
    payload: defaultState
  })
}

function * getAccessibleProjects (action) {
  try {
    // pre-fetch update
    yield put({
      type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result = yield call(Dispatchers.getAccessibleProjectsDispatcher)

    // post-fetch update
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        accessibleProjects: result.body
      }
    })

    if(action.payload.resolve !== null) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
    if(action.payload.reject !== null) {
      action.payload.reject()
    }
  }
}

function * createNewProject (action) {

  const { projectValues } = action.payload

  try {

    // pre-fetch update
    yield put({
      type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result = yield call(Dispatchers.createNewProjectDispatcher, projectValues)

    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
      payload: {
        fetching: false,
        project: result.body,
      }
    })

    action.payload.resolve()

    }
    catch (error) {
      console.error(error)
      yield put({
        type: Actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
          payload: {
            fetching: false,
            error
          }
      })

      action.payload.reject()
    }
}


function * updateChosenProject (action) {

  const { project } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    console.log(action.payload)

    const result = yield call(Dispatchers.fetchProjectDetailsDispatcher, project.projectId)

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: result.body,
        error: null
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}


function * updateProjectDetails (action) {

  const { projectID, projectValues } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.updateProjectDetailsDispatcher, projectID, projectValues)

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: projectValues,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * getCurrentMembers (action) {

  const { projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result = yield call(Dispatchers.getCurrentMembersDispatcher, projectID)

    const memberList = result.body.members

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        memberList,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function Actionswitcher(pageName) {
  switch(pageName) {
    case 'inception':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_INCEPTION;
    case 'feasibility':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_FEASIBILITY;
    case 'design':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_DESIGN;
    case 'tender':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_TENDER;
    case 'construction':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_CONSTRUCTION;
    case 'handover':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_HANDOVER;
    case 'occupation':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_OCCUPATION;
    case 'refurbishment':
      return Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_REFURBISHMENT;
    default:
      return Actions.PROJECT_SET_STATE;
  }
}


function * uploadFile (action) {

  const { projectID, pageName, fieldID, fileDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result = yield call(Dispatchers.uploadFileDispatcher, projectID, pageName, fieldID, fileDetails)

    console.log(result)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = Actionswitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        projectID,
      }
    })

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })

  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * downloadFile (action) {

  const { projectID, pageName, fieldID, version } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result = yield call(Dispatchers.downloadFileDispatcher, projectID, pageName, fieldID, version)

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        downloadURL: result.body
      }
    })

    action.payload.resolve(result.body)
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}




function * createField (action) {

  const { projectID, pageName, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.createFieldDispatcher, projectID, pageName, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = Actionswitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        projectID,
      }
    })

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}


function * updateField (action) {

  const { projectID, pageName, fieldID, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.updateFieldDispatcher, projectID, pageName, fieldID, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = Actionswitcher(pageName)

    action.payload.resolve()

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        projectID,
      }
    })

    // Post-fetch update to store
    yield put({
      type: action,
      payload: {
        fetching: false,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}


function * requestFileSignature (action) {

  const { projectID, pageName, fieldID, members } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    yield call(Dispatchers.requestSignatureDispatcher, projectID, pageName, fieldID, members)

    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        error: null,
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
        payload: {
          fetching: false,
          error
        }
    })

    action.payload.reject()
  }
}


function * deleteProject (action) {

  const { projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.deleteProjectDispatcher, projectID,)

    // Post-fetch update to store
    yield put({
      type: action,
      payload: {
        fetching: false,
      }
    })

    // Callback if provided
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_DELETE_PROJECT_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    // Callback if provided
    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}


export default function * Sagas () {
  yield takeLatest(Actions.PROJECT_INIT, init)
  yield takeLatest(Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(Actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, updateChosenProject)
  yield takeLatest(Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, updateProjectDetails)
  yield takeLatest(Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
  yield takeLatest(Actions.PROJECT_UPLOAD_FILE_REQUESTED, uploadFile)
  yield takeLatest(Actions.PROJECT_DOWNLOAD_FILE_REQUESTED, downloadFile)
  yield takeLatest(Actions.PROJECT_CREATE_FIELD_REQUESTED, createField)
  yield takeLatest(Actions.PROJECT_UPDATE_FIELD_REQUESTED, updateField)
  yield takeLatest(Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, requestFileSignature)
  yield takeLatest(Actions.PROJECT_DELETE_PROJECT_REQUESTED, deleteProject)
}
