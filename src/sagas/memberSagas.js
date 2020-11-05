
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  addMemberToProjectDispatcher,
  removeMemberFromProjectDispatcher,
  getRolesDispatcher,
} from '../Dispatchers/members'

import * as Actions from '../Actions'

let defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}

function * init (action) {
  yield put({
    type: Actions.MEMBER_SET_STATE,
    payload: defaultState
  })
}


function * addMemberToProject (action) {

  const { identityToken, projectID, memberDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_ADD_MEMBER_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    const { data: result } = yield call(addMemberToProjectDispatcher, identityToken, projectID, memberDetails)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {
        currentMember: result
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.MEMBER_ADD_MEMBER_REQUEST_FAILED,
        payload: {
          error
        }
    })

    action.payload.reject()
  }
}


function * removeMemberFromProject (action) {

  const { identityToken, projectID, memberUsername } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_REMOVE_MEMBER_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    const { data: result } = yield call(removeMemberFromProjectDispatcher, identityToken, projectID, memberUsername)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {
        ...defaultState,
        currentMember: result
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.MEMBER_REMOVE_MEMBER_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })

    action.payload.reject()
  }
}


function * getRoles (action) {

  const { identityToken, projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(getRolesDispatcher, identityToken, projectID)

    console.log(result)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {
        ...defaultState,
        roles: result.body
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}

export default function * Sagas () {
  yield takeLatest(Actions.MEMBER_INIT, init)
  yield takeLatest(Actions.MEMBER_ADD_MEMBER_REQUESTED, addMemberToProject)
  yield takeLatest(Actions.MEMBER_REMOVE_MEMBER_REQUESTED, removeMemberFromProject)
  yield takeLatest(Actions.MEMBER_GET_AVAILABLE_ROLES_REQUESTED, getRoles)
}
