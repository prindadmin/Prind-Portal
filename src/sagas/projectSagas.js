
import { call, put, takeLatest } from 'redux-saga/effects'

import * as Dispatchers from '../dispatchers/projects'

import * as actions from '../actions'
import * as strings from '../data/Strings'

let defaultState = {
  accessibleProjects: {
    projectOwner: [],
    projectRole: []
  },
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    id: "",
  },
  memberList: [],
  downloadURL: "",
  fetching: false,
}

function * init (action) {
  yield put({
    type: actions.PROJECT_SET_STATE,
    payload: {
      defaultState
    }
  })
}

function * getAccessibleProjects (action) {

  const { jwtToken } = action.payload

  try {
    const { data: projects } = yield call(Dispatchers.getAccessibleProjectsDispatcher, jwtToken)
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        accessibleProjects: projects.body
      }
    })
    }
    catch (error) {
      console.log(error)
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

  const { jwtToken, projectValues } = action.payload

  try {
    const { data: result } = yield call(Dispatchers.createNewProjectDispatcher, jwtToken, projectValues)
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        chosenProject: result
      }
    })
    }
    catch (error) {
      console.log(error)
      yield put({
        type: actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
          payload: {
            error
          }
      })
    }
}


function * getCurrentMembers (action) {

  const { jwtToken, projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getCurrentMembersDispatcher, jwtToken, projectID)

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
    console.log(error)
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

  const { jwtToken, pageName, fileDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.uploadFileDispatcher, jwtToken, fileDetails)

    console.log(result)

    // Decide which action to dispatch to update the correct page's content
    const action = actionSwitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: action,
      payload: {
        fetching: false,
      }
    })
  }
  catch (error) {
    console.log(error)
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

  const { jwtToken, projectID, pageName, fieldID, version } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.downloadFileDispatcher, jwtToken, projectID, pageName, fieldID, version)

    // Post-fetch update to store
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        downloadURL: result.body.url
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}




function * createField (action) {

  const { jwtToken, projectID, pageName, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.createFieldDispatcher, jwtToken, projectID, pageName, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const action = actionSwitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: action,
      payload: {
        fetching: false,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * updateField (action) {

  const { jwtToken, pageName, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.updateFieldDispatcher, jwtToken, fieldDetails)

    // Decide which action to dispatch to update the correct page's content
    const action = actionSwitcher(pageName)

    // Post-fetch update to store
    yield put({
      type: action,
      payload: {
        fetching: false,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


export default function * sagas () {
  yield takeLatest(actions.PROJECT_INIT, init)
  yield takeLatest(actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUESTED, uploadFile)
  yield takeLatest(actions.PROJECT_DOWNLOAD_FILE_REQUESTED, downloadFile)
  yield takeLatest(actions.PROJECT_CREATE_FIELD_REQUESTED, createField)
  yield takeLatest(actions.PROJECT_UPDATE_FIELD_REQUESTED, updateField)
}
