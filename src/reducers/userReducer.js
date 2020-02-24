import * as action from '../actions'

let defaultState = {
  fetching: false,
  details: {},
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

// TODO: Implement REQUEST_SENT ACTION HANDLERS for all pages
const ACTION_HANDLERS = {
  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED]: state => ({ ...state }),

  [action.USER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},


  [action.USER_GET_DETAILS_REQUESTED]: state => ({ ...state }),
  [action.USER_UPDATE_DETAILS_REQUESTED]: state => ({ ...state }),


  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_UPDATE_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),


  [action.USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_UPDATE_DETAILS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
