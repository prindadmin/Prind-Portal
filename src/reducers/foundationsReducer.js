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

export const selfSignFile = ( jwtToken, fieldDetails ) => {
  return {
    type: action.FOUNDATIONS_SELF_SIGN_FILE_REQUESTED,
    payload: {
      jwtToken,
      fieldDetails,
    }
  }
}

export const requestFileSignature = ( jwtToken, fieldDetails ) => {
  return {
    type: action.FOUNDATIONS_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      jwtToken,
      fieldDetails,
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
