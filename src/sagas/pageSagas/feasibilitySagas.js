
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
        fields: result,
      }
    })
    }
    catch (e) {
      console.log(e)
  }
}

// TODO: This saga and the inception saga update the REDUX store for themselves and the other
// FIXME: Now!!!

export default function * sagas () {
  yield takeLatest(actions.PAGE_GET_CONTENT_FEASIBILITY_REQUESTED, getPageContent)
}
