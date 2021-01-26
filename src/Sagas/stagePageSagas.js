
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../Actions'

import { stagePageDispatcher } from '../Dispatchers/pages'

const defaultState = {
  fields: [],
  fetching: false,
  error: null,
}


function * getPageContent (action) {

  const { projectID, pageName } = action.payload

  console.log("getting content")

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
    const result = yield call(stagePageDispatcher, projectID, pageName )

    console.log(result)

    yield put({
      type: Actions.PAGE_SET_STATE,
      payload: {
        [pageName]: {
          ...defaultState,
          fields: result.body,
        }
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result)
    }

  }
  catch (error) {
    console.error(error)
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
