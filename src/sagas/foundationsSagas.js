
import { call, put, takeLatest } from 'redux-saga/effects'

// TODO: Implement resolver and rejector callbacks

import {
  selfSignFileDispatcher,
} from '../dispatchers/foundations'

import * as actions from '../actions'

let defaultState = {
  fetching: false,
}

function * init (action) {
  yield put({
    type: actions.FOUNDATIONS_SET_STATE,
    payload: defaultState
  })
}


function * selfSignFile (action) {

  const { identityToken, projectID, pageName, fieldID } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })

    yield call(selfSignFileDispatcher, identityToken, projectID, pageName, fieldID)

    // Post-fetch update to store
    yield put({
      type: actions.FOUNDATIONS_SET_STATE,
      payload: {
        ...defaultState,
      }
    })
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED,
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
}
