
import { call, put, takeLatest } from 'redux-saga/effects'
import * as Actions from '../Actions'
import * as Endpoints from '../Data/Endpoints'
import * as Dispatchers from '../Dispatchers/user'

export const defaultState = {
  fetching: false,
  details: {},
  history: {
    documentVersions: []
  },
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: {},
  userS3Token: {},
  error: undefined,
  currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
  currentRouteObject: {
    hash: "",
    pathname: Endpoints.DEFAULTLOGGEDINPAGE,
    search: "",
    state: undefined
  }
}

export function * init (action) {
  yield put({
    type: Actions.USER_SET_STATE,
    payload: defaultState
  })
}



export function * getS3ProjectFileUploadToken (action) {
  const { project_id, pageName } = action.payload
  try {
    const result = yield call(Dispatchers.getS3ProjectFileUploadToken, project_id, pageName)
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        projectS3Token: result.body,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        error,
      }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}


export function * getS3UserFileUploadToken (action) {
  const { fileType } = action.payload
  try {
    const result = yield call(Dispatchers.getS3UserFileUploadToken, fileType)
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        userS3Token: result.body
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        error,
      }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject(error)
    }
  }
}



export function * getUserDetails (action) {
  const { identityToken } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_GET_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getUserDetails, identityToken)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
        details: result.body,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_GET_DETAILS_REQUEST_FAILED,
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



export function * getProjectInvitations (action) {
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getProjectInvitations)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
        projectInvitations: result.body,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED,
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



export function * respondToProjectInvitation (action) {
  const { projectID, response } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.respondToProjectInvitation, projectID, response)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    // Trigger a fetch of the requests list again
    yield put({
      type: Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
      payload: {}
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED,
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



export function * getSignatureRequests (action) {
  const { identityToken } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getSignatureRequests, identityToken)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
        signatureRequests: result.body,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED,
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



export function * respondToSignatureRequest (action) {
  //const { projectID, pageName, fieldID, response } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.respondToSignatureRequest, action.payload)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    // Trigger a fetch of the requests list again
    yield put({
      type: Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
      payload: {}
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED,
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


export function * getHistory (action) {
  const { identityToken } = action.payload
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_GET_HISTORY_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })
    const result = yield call(Dispatchers.getHistory, identityToken)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
        history: result.body,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result.body)
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_GET_HISTORY_REQUEST_FAILED,
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

export function * authoriseWithProcoreServer (action) {
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.authoriseWithProcoreServer, action.payload.parameters)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    //console.error(error)
    yield put({
      type: Actions.USER_SET_STATE,
        payload: {
          fetching: false,
          error,
        }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}

export function * checkServerAccessToProcore (action) {
  try {
    // Pre-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: true,
      }
    })
    yield call(Dispatchers.checkServerAccessToProcore)
    // Post-fetch update to store
    yield put({
      type: Actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    yield put({
      type: Actions.USER_SET_STATE,
        payload: {
          fetching: false,
          error,
        }
    })
    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}



export default function * Sagas () {
  yield takeLatest(Actions.USER_INIT, init)
  yield takeLatest(Actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED, getS3ProjectFileUploadToken)
  yield takeLatest(Actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED, getS3UserFileUploadToken)
  yield takeLatest(Actions.USER_GET_DETAILS_REQUESTED, getUserDetails)
  yield takeLatest(Actions.USER_GET_PROJECT_INVITATIONS_REQUESTED, getProjectInvitations)
  yield takeLatest(Actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED, respondToProjectInvitation)
  yield takeLatest(Actions.USER_GET_PROJECT_SIGNATURES_REQUESTED, getSignatureRequests)
  yield takeLatest(Actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED, respondToSignatureRequest)
  yield takeLatest(Actions.USER_GET_HISTORY_REQUESTED, getHistory)
  yield takeLatest(Actions.USER_AUTHORISE_PROCORE_ACCESS_REQUESTED, authoriseWithProcoreServer)
  yield takeLatest(Actions.USER_CHECK_SERVER_PROCORE_ACCESS_REQUESTED, checkServerAccessToProcore)
}
