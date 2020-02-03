
import { call, put, takeLatest } from 'redux-saga/effects'

import * as Dispatchers from '../dispatchers/projects'

import * as actions from '../actions'
import * as strings from '../data/Strings'

let defaultState = {
  accessibleProjects: [],
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    id: "",
  },
  memberList: [],
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

  const { identityToken } = action.payload.jwtToken

  try {
    const { data: projects } = yield call(Dispatchers.getAccessibleProjectsDispatcher, identityToken)
    yield put({
      type: actions.PROJECT_SET_STATE,
      payload: {
        accessibleProjects: projects
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
        memberList: result,
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


export default function * sagas () {
  yield takeLatest(actions.PROJECT_INIT, init)
  yield takeLatest(actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUESTED, uploadFile)
}
