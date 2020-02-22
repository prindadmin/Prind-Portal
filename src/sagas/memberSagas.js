
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  addMemberToProjectDispatcher,
  removeMemberFromProjectDispatcher,
  getRolesDispatcher,
} from '../dispatchers/members'

import * as actions from '../actions'

let defaultState = {
  fetching: false,
  currentMember: null,
  roles: [],
}

function * init (action) {
  yield put({
    type: actions.MEMBER_SET_STATE,
    payload: {
      defaultState
    }
  })
}


function * addMemberToProject (action) {

  const { jwtToken, projectID, memberDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.MEMBER_ADD_MEMBER_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })

    const { data: result } = yield call(addMemberToProjectDispatcher, jwtToken, projectID, memberDetails)

    // Post-fetch update to store
    yield put({
      type: actions.MEMBER_SET_STATE,
      payload: {
        ...defaultState,
        currentMember: result
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.MEMBER_ADD_MEMBER_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}


function * removeMemberFromProject (action) {

  const { jwtToken, projectID, memberDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.MEMBER_REMOVE_MEMBER_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })

    const { data: result } = yield call(removeMemberFromProjectDispatcher, jwtToken, projectID, memberDetails)

    // Post-fetch update to store
    yield put({
      type: actions.MEMBER_SET_STATE,
      payload: {
        ...defaultState,
        currentMember: result
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.MEMBER_REMOVE_MEMBER_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}


function * getRoles (action) {

  const { jwtToken, projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true,
      }
    })

    const { data: result } = yield call(getRolesDispatcher, jwtToken, projectID)

    console.log(result)

    // Post-fetch update to store
    yield put({
      type: actions.MEMBER_SET_STATE,
      payload: {
        ...defaultState,
        roles: result.body
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}

export default function * sagas () {
  yield takeLatest(actions.MEMBER_INIT, init)
  yield takeLatest(actions.MEMBER_ADD_MEMBER_REQUESTED, addMemberToProject)
  yield takeLatest(actions.MEMBER_REMOVE_MEMBER_REQUESTED, removeMemberFromProject)
  yield takeLatest(actions.MEMBER_GET_AVAILABLE_ROLES_REQUESTED, getRoles)
}
