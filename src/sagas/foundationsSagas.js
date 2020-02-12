
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  selfSignFileDispatcher,
  requestSignatureDispatcher,
} from '../dispatchers/foundations'

import * as actions from '../actions'

let defaultState = {
  fetching: false,
}

function * init (action) {
  yield put({
    type: actions.FOUNDATIONS_SET_STATE,
    payload: {
      defaultState
    }
  })
}


function * selfSignFile (action) {

  const { jwtToken, fieldDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })

    const { data: result } = yield call(selfSignFileDispatcher, jwtToken, fieldDetails)

    // Post-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_SET_STATE,
      payload: {
        ...defaultState,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}


function * requestFileSignature (action) {

  const { jwtToken, projectID, pageName, fieldID, fieldDetails, members } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })

    const { data: result } = yield call(requestSignatureDispatcher, jwtToken, projectID, pageName, fieldID, fieldDetails, members)

    // Post-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_SET_STATE,
      payload: {
        ...defaultState,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
  }
}

export default function * sagas () {
  yield takeLatest(actions.FOUNDATIONS_INIT, init)
  yield takeLatest(actions.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED, selfSignFile)
  yield takeLatest(actions.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUESTED, requestFileSignature)
}
