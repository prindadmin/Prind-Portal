
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../Actions'

import * as StagePageDispatchers from '../Dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
  error: null,
}


export function * getPageContent (action) {
  const { projectID, pageName } = action.payload
  try {
    yield put({
      type: Actions.PAGE_SET_STATE,
      payload: {
        [pageName]: {
          ...defaultState,
          fetching: true
        }
      }
    })
    const result = yield call(StagePageDispatchers.getPageContent, projectID, pageName )

    // If this is the test page (i.e. not a real page)
    if (pageName === "test") {
      yield put({
        type: Actions.PAGE_SET_STATE,
        payload: {
          [pageName]: {
            fetching: false,
            error: null,
            standards: result.body,
          }
        }
      })
    } else {
      yield put({
        type: Actions.PAGE_SET_STATE,
        payload: {
          [pageName]: {
            ...defaultState,
            fields: result.body,
          }
        }
      })
    }
    // if there is a resolve function passed, call it
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.PAGE_SET_STATE,
        payload: {
          fetching: false,
          error,
        }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export default function * Sagas () {
  yield takeLatest(Actions.PAGE_GET_CONTENT_REQUESTED, getPageContent)
  yield takeLatest(Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL, getPageContent)
}
