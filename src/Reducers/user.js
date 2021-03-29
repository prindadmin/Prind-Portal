import * as action from '../Actions'

import * as Endpoints from '../Data/Endpoints'

let defaultState = {
  fetching: false,
  details: {},
  history: {},
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: {},
  userS3Token: {},
  currentRoute: Endpoints.DEFAULTLOGGEDINPAGE,
}


export const init = () => {
  return {
    type: action.USER_INIT,
    payload: defaultState
  }
}

export const storeRoute = ( currentRoute ) => {
  return {
    type: action.USER_SET_STATE,
    payload: {
      currentRoute
    }
  }
}

export const requestS3ProjectFileUploadToken = ( project_id, pageName, resolve, reject ) => {
  return {
    type: action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED,
    payload: {
      project_id,
      pageName,
      resolve,
      reject,
    }
  }
}


export const requestS3UserFileUploadToken = ( fileType, resolve, reject ) => {
  return {
    type: action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED,
    payload: {
      fileType,
      resolve,
      reject,
    }
  }
}


export const getUserDetails = ( resolve, reject ) => {
  return {
    type: action.USER_GET_DETAILS_REQUESTED,
    payload: {
      resolve,
      reject,
    }
  }
}



export const getProjectInvitations = ( resolve, reject  ) => {
  return {
    type: action.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {
      resolve,
      reject,
    }
  }
}

export const respondToProjectInvitation = ( projectID, response, resolve, reject ) => {
  return {
    type: action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED,
    payload: {
      projectID,
      response,
      resolve,
      reject,
    }
  }
}


export const getSignatureRequests = ( resolve, reject  ) => {
  return {
    type: action.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {
      resolve,
      reject,
    }
  }
}

export const respondToSignatureRequest = ( projectID, pageName, fieldID, response, resolve, reject ) => {
  return {
    type: action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      response,
      resolve,
      reject,
    }
  }
}

export const getHistory = ( resolve, reject ) => {
  return {
    type: action.USER_GET_HISTORY_REQUESTED,
    payload: {
      resolve,
      reject,
    }
  }
}

const ACTION_HANDLERS = {
  [action.USER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_HISTORY_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),

  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_HISTORY_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
