import * as auth from 'aws-cognito-promises'

import { call, put, takeLatest } from 'redux-saga/effects'

import { register, changePasswordAccount, confirmUserDispatcher } from '../Dispatchers/aws'
import * as Actions from '../Actions'
import * as States from '../States'

import {
  //registerNewUserDispatcher,
  signInDispatcher,
  //signOutDispatcher,
  //resendConfirmationCodeDispatcher,
  //refreshSessionDispatcher,
} from '../Dispatchers/Auth'


let defaultState = {
  info: {},
  error: {},
  username: null,
  isSignedIn: States.AUTH_UNKNOWN,
  isConfirmed: States.AUTH_UNKNOWN,
  hasSignedUp: States.AUTH_UNKNOWN,
  hasSentCode: States.AUTH_UNKNOWN,
  hasChangedPassword: States.AUTH_UNKNOWN,
  passwordResetRequired: States.AUTH_UNKNOWN
}

function * init (action) {
  yield put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  })
}

function * getUser (action) {
  try {
    let user = auth.config.getUser()
    let session = yield call(auth.getSession)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        isSignedIn: States.AUTH_SUCCESS,
        isConfirmed: States.AUTH_SUCCESS,
        info: { username: user.username, ...session },
        finished: true,
      }
    })

    //action.payload.resolve()
  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        isSignedIn: States.AUTH_FAIL,
        error: e,
        finished: true
      }
    })
    //action.payload.reject()
  }
}

function * signUp (action) {
  try {
    yield call(register, action.payload.values)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasSignedUp: States.AUTH_SUCCESS
      }
    })
    action.payload.resolve()
  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        error: e
      }
    })
    action.payload.reject(e)
  }
}

function * signOut () {
  try {
    yield call(auth.signOut)

    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: { isSignedIn: States.AUTH_FAIL }
    })

    // Clear the project store
    yield put({
      type: Actions.PROJECT_INIT,
      payload: {}
    })

    // Clear the member store
    yield put({
      type: Actions.MEMBER_INIT,
      payload: {}
    })

    // Clear the foundations store
    yield put({
      type: Actions.FOUNDATIONS_INIT,
      payload: {}
    })

    // Clear the user store
    yield put({
      type: Actions.USER_INIT,
      payload: {}
    })

  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: { error: e, isSignedIn: States.AUTH_FAIL }
    })
  }
}

function * signIn (action) {
  try {
    const result = yield call(signInDispatcher, action.payload.values)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        isSignedIn: States.AUTH_SUCCESS,
        isConfirmed: States.AUTH_SUCCESS,
      }
    })

    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...result
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve(result)
    }

  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        error: e
      }
    })

    if (action.payload.reject !== undefined) {
      action.payload.reject(e)
    }
  }
}

function * forgotPassword (action) {
  try {
    const { username } = action.payload
    yield call(auth.forgotPassword, username)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasSentCode: States.AUTH_SUCCESS
      }
    })
    action.payload.resolve()
  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        error: e
      }
    })
    action.payload.reject()
  }
}

function * changePassword (action) {
  try {
    const { user_name, confirmation_code, password } = action.payload.values

    console.log(user_name, confirmation_code, password)

    yield call(auth.changePassword, user_name, confirmation_code, password)

    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasChangedPassword: States.AUTH_SUCCESS
      }
    })

    action.payload.resolve()

  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        error: e,
        isSignedIn: States.AUTH_FAIL
      }
    })

    action.payload.reject()
  }
}

function * completeNewPassword (action) {
  try {
    const { oldPassword, newPassword } = action.payload
    console.log(action)
    yield call(changePasswordAccount, oldPassword, newPassword)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        hasChangedPassword: States.AUTH_SUCCESS
      }
    })
    action.payload.resolve()
  } catch (e) {
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        error: e
      }
    })
    action.payload.reject()
  }
}

function * confirmUser (action) {

  const { userParameters } = action.payload

  try {

    // pre-fetch update
    yield put({
      type: Actions.AUTH_CONFIRM_USER_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    //const result = yield call(confirmUserDispatcher, userParameters)
    yield call(confirmUserDispatcher, userParameters)

    // post-fetch update
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        fetching: false,
      }
    })

    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
    }

  } catch (error) {
    console.error(error)
    yield put({
      type: Actions.AUTH_CONFIRM_USER_REQUEST_FAILED,
        payload: {
          ...defaultState,
          error
        }
    })

    if (action.payload.reject !== undefined) {
      action.payload.reject()
    }
  }
}

export default function * Sagas () {
  yield takeLatest(Actions.AUTH_INIT, init)
  yield takeLatest(Actions.AUTH_GET_USER, getUser)
  yield takeLatest(Actions.AUTH_SIGN_UP, signUp)
  yield takeLatest(Actions.AUTH_SIGN_IN, signIn)
  yield takeLatest(Actions.AUTH_SIGN_OUT, signOut)
  yield takeLatest(Actions.AUTH_FORGOT_PASSWORD, forgotPassword)
  yield takeLatest(Actions.AUTH_CHANGE_PASSWORD, changePassword)
  yield takeLatest(Actions.AUTH_COMPLETE_NEW_PASSWORD, completeNewPassword)
  yield takeLatest(Actions.AUTH_CONFIRM_USER_REQUESTED, confirmUser)
}
