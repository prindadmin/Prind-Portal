
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAccessibleProjectsDispatcher,
  createNewProjectDispatcher,
  getCurrentMembersDispatcher,
} from '../dispatchers/projects'

import * as actions from '../actions'

let defaultState = {
  accessibleProjects: [],
  chosenProject: {
    name: "",
  }
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
    const { data: projects } = yield call(getAccessibleProjectsDispatcher, identityToken)
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
    const { data: result } = yield call(createNewProjectDispatcher, jwtToken, projectValues)
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
        type: actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
          payload: {
            ...defaultState,
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

    const { data: result } = yield call(getCurrentMembersDispatcher, jwtToken, projectID)

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


export default function * sagas () {
  yield takeLatest(actions.PROJECT_INIT, init)
  yield takeLatest(actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
}
