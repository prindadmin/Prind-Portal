
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { inceptionPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_INCEPTION_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })
    const { data: result } = yield call(inceptionPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_INCEPTION_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
    }
    catch (error) {
      console.log(error)
      yield put({
        type: actions.PAGE_GET_CONTENT_INCEPTION_REQUEST_FAILED,
          payload: {
            fetching: false,
            error,
          }
      })
    }
}

export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_INCEPTION_REQUESTED, getPageContent)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_INCEPTION, getPageContent)
}
