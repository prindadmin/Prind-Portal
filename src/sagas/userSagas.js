
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



function * getS3ProjectFileUploadToken (action) {

  const { identityToken, project_id, pageName } = action.payload

  try {
    const { data: result } = yield call(Dispatchers.s3UploadProjectFileTokenDispatcher, identityToken, project_id, pageName)
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        projectS3Token: result.body,
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}


function * getS3UserFileUploadToken (action) {

  const { identityToken, fileType } = action.payload

  try {
    const { data: result } = yield call(Dispatchers.s3UploadUserFileTokenDispatcher, identityToken, fileType)
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        userS3Token: result.body
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}



function * getUserDetails (action) {

  const { identityToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getUserDetailsDispatcher, identityToken)

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

  const { identityToken, userDetails } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_UPDATE_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.updateUserDetailsDispatcher, identityToken, userDetails)

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
  yield takeLatest(actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED, getS3ProjectFileUploadToken)
  yield takeLatest(actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED, getS3UserFileUploadToken)
  yield takeLatest(actions.USER_GET_DETAILS_REQUESTED, getUserDetails)
  yield takeLatest(actions.USER_UPDATE_DETAILS_REQUESTED, updateUserDetails)
}
