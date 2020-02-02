
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { designPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_DESIGN_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(designPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_DESIGN_SET_STATE,
      payload: {
        ...defaultState,
        fields: result,
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}


export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_DESIGN_REQUESTED, getPageContent)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_DESIGN, getPageContent)
}
