
import { call, put, takeLatest } from 'redux-saga/effects'

import * as MemberDispatchers from '../Dispatchers/members'
import * as Actions from '../Actions'

let defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}

export function * init (action) {
  yield put({
    type: Actions.MEMBER_SET_STATE,
    payload: defaultState
  })
}


export function * addMemberToProject (action) {

  const { projectID, memberDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_ADD_MEMBER_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    yield call(MemberDispatchers.addMemberToProject, projectID, memberDetails)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {}
    })

    // Callback if provided
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.MEMBER_ADD_MEMBER_REQUEST_FAILED,
        payload: {
          error
        }
    })

    // Callback if provided
    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}


export function * removeMemberFromProject (action) {

  const { projectID, memberUsername } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_REMOVE_MEMBER_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })

    const result = yield call(MemberDispatchers.removeMemberFromProject, projectID, memberUsername)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {
        fetching: false,
        currentMember: result
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
      type: Actions.MEMBER_REMOVE_MEMBER_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })

    // Callback if provided
    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}


export function * getRoles (action) {

  const { projectID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: Actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const result  = yield call(MemberDispatchers.getRoles, projectID)

    // Post-fetch update to store
    yield put({
      type: Actions.MEMBER_SET_STATE,
      payload: {
        fetching: false,
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
