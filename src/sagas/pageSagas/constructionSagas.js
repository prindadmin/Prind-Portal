
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { constructionPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_CONSTRUCTION_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(constructionPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_CONSTRUCTION_SET_STATE,
      payload: {
        ...defaultState,
        fields: result.body,
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}


export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_CONSTRUCTION_REQUESTED, getPageContent)
  yield takeLatest(actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL_CONSTRUCTION, getPageContent)
}
