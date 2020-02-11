
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'

import { s3UploadTokenDispatcher } from '../dispatchers/user'

/*
let defaultState = {
}

function * init (action) {
  yield put({
    type: actions.USER_SET_STATE,
    payload: {
      ...defaultState
    }
  })
}
*/
function * getS3UploadToken (action) {

  const { identityToken, project_id, pageName } = action.payload

  try {
    const { data: s3Token } = yield call(s3UploadTokenDispatcher, identityToken, project_id, pageName)
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

export default function * sagas () {
  yield takeLatest(actions.USER_S3_UPLOAD_TOKEN_REQUESTED, getS3UploadToken)
}
