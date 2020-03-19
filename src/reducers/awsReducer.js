import * as action from '../actions'
import * as state from '../states'

export const init = () => {
  return {
    type: action.AUTH_INIT,
    payload: {}
  }
}

export const getUser = () => {
  return {
    type: action.AUTH_GET_USER,
    payload: {}
  }
}

export const signUp = (values, resolve, reject) => {
  return {
    type: action.AUTH_SIGN_UP,
    payload: {
      values, resolve, reject
    }
  }
}

export const signIn = (values, resolve, reject) => {
  return {
    type: action.AUTH_SIGN_IN,
    payload: {
      values, resolve, reject
    }
  }
}

export const signOut = () => {
  return {
    type: action.AUTH_SIGN_OUT
  }
}

export const forgotPassword = (email, resolve, reject) => {
  return {
    type: action.AUTH_FORGOT_PASSWORD,
    payload: {
      username: email,
      resolve,
      reject
    }
  }
}

export const changePassword = (values, resolve, reject) => {
  return {
    type: action.AUTH_CHANGE_PASSWORD,
    payload: {
      values, resolve, reject
    }
  }
}

export const completeNewPassword = (oldPassword, newPassword, resolve, reject) => {
  return {
    type: action.AUTH_COMPLETE_NEW_PASSWORD,
    payload: {
      oldPassword,
      newPassword,
      resolve,
      reject,
    }
  }
}

export const changeSuccess = () => {
  return {
    type: action.AUTH_SET_STATE,
    payload: { hasChangedPassword: state.AUTH_UNKNOWN }
  }
}

export const confirmUser = ( userParameters, resolve, reject ) => {
  return {
    type: action.AUTH_CONFIRM_USER_REQUESTED,
    payload: {
      userParameters,
      resolve,
      reject
    }
  }
}

const ACTION_HANDLERS = {
  [action.AUTH_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.AUTH_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
}

let defaultState = {
  isSignedIn: state.AUTH_UNKNOWN
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
