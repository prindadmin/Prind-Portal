
import { call, put, takeLatest } from 'redux-saga/effects'

import * as Dispatchers from '../Dispatchers/projects'

import * as Actions from '../Actions'
import * as Strings from '../Data/Strings'

const defaultChosenProject = {
  projectName: Strings.NO_PROJECT_SELECTED,
  projectId: "",
  projectType: "",
}

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: defaultChosenProject,
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

export function * init (action) {
  yield put({
    type: Actions.PROJECT_SET_STATE,
    payload: defaultState
  })
}



export function * getAccessibleProjects (action) {
  try {
    // pre-fetch update
    yield put({
      type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getAccessibleProjects)
    // post-fetch update
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        accessibleProjects: result.body
      }
    })
    if(action.payload.resolve !== null) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.log(error)
    yield put({
      type: Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })
    if(action.payload.reject !== null) {
      action.payload.reject(error)
    }
  }
}


export function * createNewProject (action) {
  const { projectValues } = action.payload
  try {
    // pre-fetch update
    yield put({
      type: Actions.PROJECT_CREATE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.createNewProject, projectValues)
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
      payload: {
        fetching: false,
        project: result.body,
      }
    })
    if (action.payload.resolve) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.PROJECT_CREATE_PROJECT_REQUEST_FAILED,
        payload: {
          fetching: false,
          error
        }
    })
    if (action.payload.reject) {
      action.payload.reject(error)
    }
  }
}


export function * updateChosenProject (action) {
  const { project } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.fetchProjectDetails, project.projectId)
    const resultBody = result.body
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: {
          ...defaultChosenProject,
          ...resultBody,
        },
        error: null
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED,
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


export function * updateProjectDetails (action) {
  const { projectID, projectValues } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.updateProjectDetails, projectID, projectValues)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        chosenProject: {
          projectId: projectID,
          ...projectValues,
        }
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
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


export function * getCurrentMembers (action) {
  const { projectID } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getCurrentMembers, projectID)
    const memberList = result.body.members
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        memberList,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(memberList)
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED,
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


export function * uploadFile (action) {
  const { projectID, pageName, resolve, reject } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.uploadFile, action.payload)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
      payload: {
        pageName,
        projectID,
        resolve,
        reject,
      }
    })
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    // Callback if provided
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result)
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
    // Callback if provided
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export function * downloadFile (action) {
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.downloadFile, action.payload)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        downloadURL: result.body
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED,
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




export function * createField (action) {
  const { payload } = action
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_CREATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.createField, payload)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
      payload
    })
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_CREATE_FIELD_REQUEST_FAILED,
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


export function * updateField (action) {
  const { payload } = action
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_UPDATE_FIELD_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.updateField, payload)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL,
      payload
    })
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_UPDATE_FIELD_REQUEST_FAILED,
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


export function * requestFileSignature (action) {
  const { payload } = action
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT,
      payload: {
        fetching: true
      }
    })
    yield call(Dispatchers.requestSignature, payload)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: {
        fetching: false,
        error: null,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED,
        payload: {
          fetching: false,
          error
        }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export function * deleteProject (action) {
  const { projectID } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.PROJECT_DELETE_PROJECT_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.deleteProject, projectID,)
    // Post-fetch update to store
    yield put({
      type: Actions.PROJECT_SET_STATE,
      payload: defaultState
    })
    // Callback if provided
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: Actions.PROJECT_DELETE_PROJECT_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
    // Callback if provided
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export default function * Sagas () {
  yield takeLatest(Actions.PROJECT_INIT, init)
  yield takeLatest(Actions.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED, getAccessibleProjects)
  yield takeLatest(Actions.PROJECT_CREATE_PROJECT_REQUESTED, createNewProject)
  yield takeLatest(Actions.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED, updateChosenProject)
  yield takeLatest(Actions.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED, updateProjectDetails)
  yield takeLatest(Actions.PROJECT_GET_CURRENT_MEMBERS_REQUESTED, getCurrentMembers)
  yield takeLatest(Actions.PROJECT_UPLOAD_FILE_REQUESTED, uploadFile)
  yield takeLatest(Actions.PROJECT_DOWNLOAD_FILE_REQUESTED, downloadFile)
  yield takeLatest(Actions.PROJECT_CREATE_FIELD_REQUESTED, createField)
  yield takeLatest(Actions.PROJECT_UPDATE_FIELD_REQUESTED, updateField)
  yield takeLatest(Actions.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED, requestFileSignature)
  yield takeLatest(Actions.PROJECT_DELETE_PROJECT_REQUESTED, deleteProject)
}
