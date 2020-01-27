
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { tenderPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_TENDER_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(tenderPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_TENDER_SET_STATE,
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
  yield takeLatest(actions.PAGE_GET_CONTENT_TENDER_REQUESTED, getPageContent)
}
