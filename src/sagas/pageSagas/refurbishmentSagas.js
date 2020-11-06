
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../../Actions'

import { refurbishmentPageDispatcher } from '../../Dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
  error: null,
}


function * getPageContent (action) {

  const { projectID } = action.payload

  try {
    yield put({
      type: Actions.PAGE_GET_CONTENT_REFURBISHMENT_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const result = yield call(refurbishmentPageDispatcher, projectID )
    yield put({
      type: Actions.PAGE_REFURBISHMENT_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
    }
    catch (error) {
      console.error(error)
      yield put({
        type: Actions.PAGE_GET_CONTENT_REFURBISHMENT_REQUEST_FAILED,
          payload: {
            fetching: false,
            error,
          }
      })
    }
}


export default function * Sagas () {
  yield takeLatest(Actions.PAGE_GET_CONTENT_REFURBISHMENT_REQUESTED, getPageContent)
  yield takeLatest(Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_REFURBISHMENT, getPageContent)
}
