import * as action from '../actions'

let defaultState = {
  fetching: false,
  details: {},
  projectInvitations: [],
  signatureRequests: [],
  projectS3Token: "",
  userS3Token: "",
}


export const init = () => {
  return {
    type: action.USER_INIT,
    payload: defaultState
  }
}


export const requestS3ProjectFileUploadToken = ( identityToken, project_id, pageName ) => {
  return {
    type: action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED,
    payload: {
      identityToken,
      project_id,
      pageName,
    }
  }
}


export const requestS3UserFileUploadToken = ( identityToken, fileType ) => {
  return {
    type: action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED,
    payload: {
      identityToken,
      fileType,
    }
  }
}


export const getUserDetails = ( identityToken ) => {
  return {
    type: action.USER_GET_DETAILS_REQUESTED,
    payload: {
      identityToken,
    }
  }
}


export const updateUserDetails = ( identityToken, userDetails ) => {
  return {
    type: action.USER_UPDATE_DETAILS_REQUESTED,
    payload: {
      identityToken,
      userDetails,
    }
  }
}


export const getProjectInvitations = ( identityToken, resolve, reject  ) => {
  return {
    type: action.USER_GET_PROJECT_INVITATIONS_REQUESTED,
    payload: {
      identityToken,
      resolve,
      reject,
    }
  }
}

export const respondToProjectInvitation = ( identityToken, projectID, response ) => {
  return {
    type: action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED,
    payload: {
      identityToken,
      projectID,
      response,
    }
  }
}


export const getSignatureRequests = ( identityToken, resolve, reject  ) => {
  return {
    type: action.USER_GET_PROJECT_SIGNATURES_REQUESTED,
    payload: {
      identityToken,
      resolve,
      reject,
    }
  }
}

export const respondToSignatureRequest = ( identityToken, projectID, pageName, fieldID, response ) => {
  return {
    type: action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      response,
    }
  }
}

export const getHistory = ( identityToken, resolve, reject ) => {
  return {
    type: action.USER_GET_HISTORY_REQUESTED,
    payload: {
      identityToken,
      resolve,
      reject,
    }
  }
}

const ACTION_HANDLERS = {

  [action.USER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED]: state => ({ ...state }),
  [action.USER_GET_DETAILS_REQUESTED]: state => ({ ...state }),
  [action.USER_UPDATE_DETAILS_REQUESTED]: state => ({ ...state }),
  [action.USER_GET_PROJECT_INVITATIONS_REQUESTED]: state => ({ ...state }),
  [action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED]: state => ({ ...state }),
  [action.USER_GET_PROJECT_SIGNATURES_REQUESTED]: state => ({ ...state }),
  [action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED]: state => ({ ...state }),
  [action.USER_GET_HISTORY_REQUESTED]: state => ({ ...state }),

  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_UPDATE_DETAILS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_PROJECT_INVITATIONS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_PROJECT_SIGNATURES_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_HISTORY_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),

  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_UPDATE_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
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
