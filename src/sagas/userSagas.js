
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'

import * as Dispatchers from '../dispatchers/user'

/*
let defaultState = {
  fetching: false,
  details: {},
}

function * init (action) {
  yield put({
    type: actions.USER_SET_STATE,
    payload: {
      ...action.payload
    }
  })
}
*/



function * getS3UploadToken (action) {

  const { jwtToken, project_id, pageName } = action.payload

  try {
    const { data: s3Token } = yield call(Dispatchers.s3UploadTokenDispatcher, jwtToken, project_id, pageName)
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        s3Token: s3Token
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}



function * getUserDetails (action) {

  const { jwtToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getUserDetailsDispatcher, jwtToken)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        details: result.body,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.USER_GET_DETAILS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}



function * updateUserDetails (action) {

  const { jwtToken, userDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_UPDATE_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.updateUserDetailsDispatcher, jwtToken, userDetails)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        details: result.body,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.USER_UPDATE_DETAILS_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}



export default function * sagas () {
  yield takeLatest(actions.USER_S3_UPLOAD_TOKEN_REQUESTED, getS3UploadToken)
  yield takeLatest(actions.USER_GET_DETAILS_REQUESTED, getUserDetails)
  yield takeLatest(actions.USER_UPDATE_DETAILS_REQUESTED, updateUserDetails)
}
