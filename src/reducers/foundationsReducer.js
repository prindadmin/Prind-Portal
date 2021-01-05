import * as action from '../Actions'

const defaultState = {
  fetching: false,
}

export const init = () => {
  return {
    type: action.FOUNDATIONS_INIT,
    payload: defaultState
  }
}

export const selfSignFile = ( projectID, pageName, fieldID ) => {
  return {
    type: action.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
    }
  }
}

export const rejectSignatureRequest = ( requestDetails, resolve, reject ) => {
  return {
    type: action.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      requestDetails,
      resolve,
      reject,
    }
  }
}

const ACTION_HANDLERS = {

  [action.FOUNDATIONS_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.FOUNDATIONS_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED]: state => ({ ...state }),
  [action.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED]: state => ({ ...state }),

  [action.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),

  [action.FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
