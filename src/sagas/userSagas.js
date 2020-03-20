
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'

import * as Dispatchers from '../dispatchers/user'


let defaultState = {
  fetching: false,
  details: {},
  history: {},
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: "",
  userS3Token: "",
}

function * init (action) {
  yield put({
    type: actions.USER_SET_STATE,
    payload: defaultState
  })
}



function * getS3ProjectFileUploadToken (action) {

  const { identityToken, project_id, pageName } = action.payload

  try {
    const { data: result } = yield call(Dispatchers.s3UploadProjectFileTokenDispatcher, identityToken, project_id, pageName)
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        projectS3Token: result.body,
      }
    })
    }
    catch (e) {
      console.error(e)
  }
}


function * getS3UserFileUploadToken (action) {

  const { identityToken, fileType } = action.payload

  try {
    const { data: result } = yield call(Dispatchers.s3UploadUserFileTokenDispatcher, identityToken, fileType)
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        userS3Token: result.body
      }
    })
    }
    catch (e) {
      console.error(e)
  }
}



function * getUserDetails (action) {

  const { identityToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_DETAILS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getUserDetailsDispatcher, identityToken)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        details: result.body,
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_GET_DETAILS_REQUEST_FAILED,
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



function * getProjectInvitations (action) {

  const { identityToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getProjectInvitationsDispatcher, identityToken)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        projectInvitations: result.body,
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED,
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



function * respondToProjectInvitation (action) {

  const { identityToken, projectID, response } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.respondToProjectInvitationDispatcher, identityToken, projectID, response)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })

    // Trigger a fetch of the requests list again
    yield put({
      type: actions.USER_GET_PROJECT_INVITATIONS_REQUESTED,
      payload: {
        identityToken,
      }
    })

  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}



function * getSignatureRequests (action) {

  const { identityToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getSignatureRequestsDispatcher, identityToken)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        signatureRequests: result.body,
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }

  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED,
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



function * respondToSignatureRequests (action) {

  const { identityToken, projectID, pageName, fieldID, response } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    yield call(Dispatchers.respondToSignatureRequestDispatcher, identityToken, projectID, pageName, fieldID, response)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
      }
    })

    // Trigger a fetch of the requests list again
    yield put({
      type: actions.USER_GET_PROJECT_SIGNATURES_REQUESTED,
      payload: {
        identityToken,
      }
    })

  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })
  }
}


function * getHistory (action) {

  const { identityToken } = action.payload

  try {

    // Pre-fetch update to store
    yield put({
      type: actions.USER_GET_HISTORY_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    const { data: result } = yield call(Dispatchers.getHistoryDispatcher, identityToken)

    // Post-fetch update to store
    yield put({
      type: actions.USER_SET_STATE,
      payload: {
        fetching: false,
        history: result.body,
      }
    })

    action.payload.resolve()
  }
  catch (error) {
    console.error(error)
    yield put({
      type: actions.USER_GET_HISTORY_REQUEST_FAILED,
        payload: {
          fetching: false,
          error,
        }
    })

    action.payload.reject()
  }
}



export default function * sagas () {
  yield takeLatest(actions.USER_INIT, init)
  yield takeLatest(actions.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED, getS3ProjectFileUploadToken)
  yield takeLatest(actions.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED, getS3UserFileUploadToken)
  yield takeLatest(actions.USER_GET_DETAILS_REQUESTED, getUserDetails)
  yield takeLatest(actions.USER_GET_PROJECT_INVITATIONS_REQUESTED, getProjectInvitations)
  yield takeLatest(actions.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED, respondToProjectInvitation)
  yield takeLatest(actions.USER_GET_PROJECT_SIGNATURES_REQUESTED, getSignatureRequests)
  yield takeLatest(actions.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED, respondToSignatureRequests)
  yield takeLatest(actions.USER_GET_HISTORY_REQUESTED, getHistory)
}
