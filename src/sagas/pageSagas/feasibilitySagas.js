
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { feasibilityPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_FEASIBILITY_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(feasibilityPageDispatcher, identityToken, projectID )

    yield put({
      type: actions.PAGE_FEASIBILITY_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
  }
  catch (error) {
    console.log(error)
    yield put({
      type: actions.PAGE_GET_CONTENT_FEASIBILITY_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_FEASIBILITY_REQUESTED, getPageContent)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_FEASIBILITY, getPageContent)
}
