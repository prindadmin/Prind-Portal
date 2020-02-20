import * as action from '../actions'

let defaultState = {
  fetching: false,
  details: {},
  s3Token: "",
}


export const init = () => {
  return {
    type: action.USER_INIT,
    payload: defaultState
  }
}


export const requestS3UploadToken = ( jwtToken, project_id, pageName ) => {
  return {
    type: action.USER_S3_UPLOAD_TOKEN_REQUESTED,
    payload: {
      jwtToken,
      project_id,
      pageName,
    }
  }
}


export const getUserDetails = ( jwtToken ) => {
  return {
    type: action.USER_GET_DETAILS_REQUESTED,
    payload: {
      jwtToken,
    }
  }
}


export const updateUserDetails = ( jwtToken, userDetails ) => {
  return {
    type: action.USER_UPDATE_DETAILS_REQUESTED,
    payload: {
      jwtToken,
      userDetails,
    }
  }
}


const ACTION_HANDLERS = {
  [action.USER_S3_UPLOAD_TOKEN_REQUESTED]: state => ({ ...state }),

  [action.USER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},


  [action.USER_GET_DETAILS_REQUESTED]: state => ({ ...state }),
  [action.USER_UPDATE_DETAILS_REQUESTED]: state => ({ ...state }),


  [action.USER_S3_UPLOAD_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_GET_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.USER_UPDATE_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
