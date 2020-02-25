
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { occupationPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_OCCUPATION_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(occupationPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_OCCUPATION_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
    }
    catch (error) {
      console.log(error)
      yield put({
        type: actions.PAGE_GET_CONTENT_OCCUPATION_REQUEST_FAILED,
          payload: {
            fetching: false,
            error,
          }
      })
    }
}


export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_OCCUPATION_REQUESTED, getPageContent)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_OCCUPATION, getPageContent)
}
