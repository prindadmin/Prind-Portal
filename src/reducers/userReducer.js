import * as action from '../actions'

let defaultState = {
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
      identityToken: jwtToken,
      project_id,
      pageName,
    }
  }
}


const ACTION_HANDLERS = {
  [action.USER_S3_UPLOAD_TOKEN_REQUESTED]: state => ({ ...state }),

  [action.USER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
  [action.USER_S3_UPLOAD_TOKEN_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
