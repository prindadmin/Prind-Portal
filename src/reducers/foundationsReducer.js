import * as action from '../actions'

const defaultState = {
  fetching: false,
}

export const init = () => {
  return {
    type: action.FOUNDATIONS_INIT,
    payload: defaultState
  }
}

export const selfSignFile = ( identityToken, fieldDetails ) => {
  return {
    type: action.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED,
    payload: {
      identityToken,
      fieldDetails,
    }
  }
}

export const requestSignatures = ( identityToken, projectID, pageName, fieldID, fieldDetails, members ) => {
  return {
    type: action.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      fieldDetails,
      members,
    }
  }
}


const ACTION_HANDLERS = {

  [action.FOUNDATIONS_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.FOUNDATIONS_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED]: state => ({ ...state }),
  [action.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUESTED]: state => ({ ...state }),

  [action.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
