import * as Actions from '../Actions'
import * as States from '../States'

let defaultState = {
  isSignedIn: States.AUTH_UNKNOWN,
  isConfirmed: States.AUTH_UNKNOWN,
  hasSignedUp: States.AUTH_UNKNOWN,
  hasSentCode: States.AUTH_UNKNOWN,
  hasChangedPassword: States.AUTH_UNKNOWN,
  passwordResetRequired: States.AUTH_UNKNOWN
}


export const init = () => {
  return {
    type: Actions.AUTH_INIT,
    payload: {}
  }
}

export const signUp = (values, resolve, reject) => {
  return {
    type: Actions.AUTH_SIGN_UP,
    payload: {
      values, resolve, reject
    }
  }
}

export const signIn = (values, resolve, reject) => {
  return {
    type: Actions.AUTH_SIGN_IN,
    payload: {
      values, resolve, reject
    }
  }
}

export const signOut = (resolve, reject) => {
  return {
    type: Actions.AUTH_SIGN_OUT,
    payload: {
      resolve, reject
    }
  }
}

export const refreshSession = () => {
  return {
    type: Actions.AUTH_REFRESH_SESSION,
    payload: {
    }
  }
}

export const forgotPassword = (username, resolve, reject) => {
  return {
    type: Actions.AUTH_FORGOT_PASSWORD,
    payload: {
      username,
      resolve,
      reject
    }
  }
}

export const changePassword = (values, resolve, reject) => {
  return {
    type: Actions.AUTH_CHANGE_PASSWORD,
    payload: {
      ...values,
      resolve,
      reject
    }
  }
}

export const updatePassword = (username, oldPassword, newPassword, resolve, reject) => {
  return {
    type: Actions.AUTH_COMPLETE_NEW_PASSWORD,
    payload: {
      username,
      oldPassword,
      newPassword,
      resolve,
      reject,
    }
  }
}

export const confirmUser = ( userParameters, resolve, reject ) => {
  return {
    type: Actions.AUTH_CONFIRM_USER_REQUESTED,
    payload: {
      userParameters,
      resolve,
      reject
    }
  }
}

const ACTION_HANDLERS = {
  [Actions.AUTH_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [Actions.AUTH_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
