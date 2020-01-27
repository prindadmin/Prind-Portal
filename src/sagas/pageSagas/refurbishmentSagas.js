
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../../actions'

import { refurbishmentPageDispatcher } from '../../dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
}


function * getPageContent (action) {

  const { identityToken, projectID } = action.payload

  try {
    yield put({
      type: actions.PAGE_GET_CONTENT_REFURBISHMENT_REQUEST_SENT,
      payload: {
        ...defaultState,
        fetching: true
      }
    })
    const { data: result } = yield call(refurbishmentPageDispatcher, identityToken, projectID )
    yield put({
      type: actions.PAGE_REFURBISHMENT_SET_STATE,
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
  yield takeLatest(actions.PAGE_GET_CONTENT_REFURBISHMENT_REQUESTED, getPageContent)
}
