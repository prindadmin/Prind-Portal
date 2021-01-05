
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../../Actions'

import { inceptionPageDispatcher } from '../../Dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
  error: null,
}


function * getPageContent (action) {

  const { projectID } = action.payload

  try {
    yield put({
      type: Actions.PAGE_GET_CONTENT_INCEPTION_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })
    const result = yield call(inceptionPageDispatcher, projectID )
    yield put({
      type: Actions.PAGE_INCEPTION_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
    }
    catch (error) {
      console.error(error)
      yield put({
        type: Actions.PAGE_GET_CONTENT_INCEPTION_REQUEST_FAILED,
          payload: {
            fetching: false,
            error,
          }
      })
    }
}

export default function * Sagas () {
  yield takeLatest(Actions.PAGE_GET_CONTENT_INCEPTION_REQUESTED, getPageContent)
  yield takeLatest(Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_INCEPTION, getPageContent)
}
