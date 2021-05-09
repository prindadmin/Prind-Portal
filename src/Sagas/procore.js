
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../Actions'

import * as Dispatchers from '../Dispatchers/Procore'

export const defaultState = {
  fetching: false,
  companyId: process.env.REACT_APP_STAGE === "DEVELOPMENTLOCAL" ? "30140" : "",
  companyName: process.env.REACT_APP_STAGE === "DEVELOPMENTLOCAL" ? "Test Company Name" : "",
  projectId: process.env.REACT_APP_STAGE === "DEVELOPMENTLOCAL" ? "23292" : "",
  projectName: process.env.REACT_APP_STAGE === "DEVELOPMENTLOCAL" ? "Test Project Name" : "",
  currentFolder: null,
  folderHistory: {
    chain: []
  },
  folders: [],
  files: [],
  error: {},
  searchTerm: ""
}


export function * init (action) {
  yield put({
    type: Actions.PROCORE_SET_STATE,
    payload: defaultState
  })
}


export function * getProjectFilesAndFolders (action) {
  try {
    yield put({
      type: Actions.PROCORE_SET_STATE,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getProjectFilesAndFolders, action.payload.payload)
    yield put({
      type: Actions.PROCORE_SET_STATE,
      payload: {
        fetching: false,
        ...result.body
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    yield put({
      type: Actions.PROCORE_SET_STATE,
        payload: {
          fetching: false,
          folders: [],
          files: [],
          error,
        }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export default function * Sagas () {
  yield takeLatest(Actions.PROCORE_INIT, init)
  yield takeLatest(Actions.PROCORE_GET_PROJECT_FILES_AND_FOLDERS, getProjectFilesAndFolders)
}
