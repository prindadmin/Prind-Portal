
import { call, put, takeLatest } from 'redux-saga/effects'

import * as Dispatchers from '../dispatchers/projects'

import * as actions from '../actions'
import * as strings from '../data/Strings'

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
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
    type: actions.PROJECT_SET_STATE,
    payload: defaultState
  })
}

function * getAccessibleProjects (action) {

  const { identityToken } = action.payload

  try {

    // pre-fetch update
    yield put({
      type: actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getAccessibleProjectsDispatcher, identityToken)

    // post-fetch update
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        accessibleProjects: result.body
      }
    })
    }
    catch (error) {
      console.error(error)
      yield put({
        type: actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
          payload: {
            ...defaultState,
            error
          }
      })
    }
}

function * createNewProject (action) {

  const { identityToken, projectValues } = action.payload

  try {

    // pre-fetch update
    yield put({
      type: actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.createNewProjectDispatcher, identityToken, projectValues)

    yield put({
      type: actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
      payload: {
        fetching: false,
        identityToken,
        project: result.body,
      }
    })

    action.payload.resolve()

    }
    catch (error) {
      console.error(error)
      yield put({
        type: actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
          payload: {
            fetching: false,
            error
          }
      })

      action.payload.reject()
    }
}


function * updateChosenProject (action) {

  const { identityToken, project } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.fetchProjectDetailsDispatcher, identityToken, project.projectId)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: result.body,
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED,
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

  const { identityToken, projectID, projectValues } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.updateProjectDetailsDispatcher, identityToken, projectID, projectValues)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: projectValues,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * getCurrentMembers (action) {

  const { identityToken, projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getCurrentMembersDispatcher, identityToken, projectID)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        memberList: result.body,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function actionSwitcher(pageName) {
  switch(pageName) {
    case 'inception':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_INCEPTION;
    case 'feasibility':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_FEASIBILITY;
    case 'design':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_DESIGN;
    case 'tender':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_TENDER;
    case 'construction':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_CONSTRUCTION;
    case 'handover':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_HANDOVER;
    case 'occupation':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_OCCUPATION;
    case 'refurbishment':
      return actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_REFURBISHMENT;
    default:
      return actions.PROJECT_SET_STATE;
  }
}


function * uploadFile (action) {

  const { identityToken, projectID, pageName, fieldID, fileDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.uploadFileDispatcher, identityToken, projectID, pageName, fieldID, fileDetails)

    console.log(result)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = actionSwitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        identityToken,
        projectID,
      }
    })

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })

  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.PROJECT_UPLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * downloadFile (action) {

  const { identityToken, projectID, pageName, fieldID, version } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.downloadFileDispatcher, identityToken, projectID, pageName, fieldID, version)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
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
      type: actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}




function * createField (action) {

  const { identityToken, projectID, pageName, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.createFieldDispatcher, identityToken, projectID, pageName, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = actionSwitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        identityToken,
        projectID,
      }
    })

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}


function * updateField (action) {

  const { identityToken, projectID, pageName, fieldID, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.updateFieldDispatcher, identityToken, projectID, pageName, fieldID, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const nextAction = actionSwitcher(pageName)

    action.payload.resolve()

    // Post-fetch update to store
    yield put({
      type: nextAction,
      payload: {
        identityToken,
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
      type: actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}


function * requestFileSignature (action) {

  const { identityToken, projectID, pageName, fieldID, members } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    yield call(Dispatchers.requestSignatureDispatcher, identityToken, projectID, pageName, fieldID, members)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
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
      type: actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
        payload: {
          fetching: false,
          error
        }
    })

    action.payload.reject()
  }
}


function * deleteProject (action) {

  const { identityToken, projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.deleteProjectDispatcher, identityToken, projectID,)

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
      type: actions.PROJECT_DELETE_PROJECT_REQUEST_FAILED,
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


export default function * sagas () {
  yield takeLatest(actions.PROJECT_INIT, init)
  yield takeLatest(actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, updateChosenProject)
  yield takeLatest(actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, updateProjectDetails)
  yield takeLatest(actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUESTED, uploadFile)
  yield takeLatest(actions.PROJECT_DOWNLOAD_FILE_REQUESTED, downloadFile)
  yield takeLatest(actions.PROJECT_CREATE_FIELD_REQUESTED, createField)
  yield takeLatest(actions.PROJECT_UPDATE_FIELD_REQUESTED, updateField)
  yield takeLatest(actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, requestFileSignature)
  yield takeLatest(actions.PROJECT_DELETE_PROJECT_REQUESTED, deleteProject)
}
