import * as auth from 'aws-cognito-promises'

import { call, put, takeLatest } from 'redux-saga/effects'

import { register, changePasswordAccount } from '../dispatchers/aws'
import * as actions from '../actions'
import * as states from '../states'


// auth is stateless. Each call to a auth action resets all state EXCEPT for completeNewPassword
let defaultState = {
  info: {},
  error: {},
  isSignedIn: states.AUTH_UNKNOWN,
  isConfirmed: states.AUTH_UNKNOWN,
  hasSignedUp: states.AUTH_UNKNOWN,
  hasSentCode: states.AUTH_UNKNOWN,
  hasChangedPassword: states.AUTH_UNKNOWN,
  passwordResetRequired: states.AUTH_UNKNOWN
}

function * init (action) {
  yield put({
    type: actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  })
}

function * getUser () {
  try {
    let user = auth.config.getUser()
    let session = yield call(auth.getSession)
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        isSignedIn: states.AUTH_SUCCESS,
        isConfirmed: states.AUTH_SUCCESS,
        info: { username: user.username, ...session },
        finished: true,
      }
    })
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        isSignedIn: states.AUTH_FAIL,
        error: e,
        finished: true
      }
    })
  }
}

function * signUp (action) {
  try {
    yield call(register, action.payload.values)
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasSignedUp: states.AUTH_SUCCESS
      }
    })
    action.payload.resolve()
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
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
      type: actions.AUTH_SET_STATE,
      payload: { isSignedIn: states.AUTH_FAIL }
    })
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: { error: e, isSignedIn: states.AUTH_FAIL }
    })
  }
}

function * signIn (action) {
  try {
    const { email, password, code } = action.payload.values
    const username = email

    if (code) {
      yield call(auth.confirmation, username, code)
    }

    yield call(auth.signIn, username, password)
    let user = auth.config.getUser()
    let session = yield call(auth.getSession)
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        isSignedIn: states.AUTH_SUCCESS,
        isConfirmed: states.AUTH_SUCCESS,
        info: { username: user.username, ...session }
      }
    })
    action.payload.resolve()
  } catch (e) {
    if (e.code === 'UserNotConfirmedException') {
      yield put({
        type: actions.AUTH_SET_STATE,
        payload: { isConfirmed: states.AUTH_FAIL, error: e }
      })
    } else if (e.code === 'PasswordResetRequiredException') {
      yield put({
        type: actions.AUTH_SET_STATE,
        payload: { passwordResetRequired: states.AUTH_SUCCESS, error: e }
      })
    } else {
      yield put({
        type: actions.AUTH_SET_STATE,
        payload: { ...defaultState, isConfirmed: states.AUTH_SUCCESS, error: e }
      })
    }
    action.payload.reject()
  }
}

function * forgotPassword (action) {
  try {
    const { username } = action.payload
    yield call(auth.forgotPassword, username)
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasSentCode: states.AUTH_SUCCESS
      }
    })
    action.payload.resolve()
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        error: e
      }
    })
    action.payload.reject()
  }
}

function * changePassword (action) {
  try {
    const { email: username, code, password } = action.payload.values
    console.log(username, code, password)
    yield call(auth.changePassword, username, code, password)

    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasChangedPassword: states.AUTH_SUCCESS
      }
    })

    action.payload.resolve()
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        error: e,
        isSignedIn: states.AUTH_FAIL
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
      type: actions.AUTH_SET_STATE,
      payload: {
        hasChangedPassword: states.AUTH_SUCCESS
      }
    })
  } catch (e) {
    yield put({
      type: actions.AUTH_SET_STATE,
      payload: {
        error: e
      }
    })
  }
}

export default function * sagas () {
  yield takeLatest(actions.AUTH_INIT, init)
  yield takeLatest(actions.AUTH_GET_USER, getUser)
  yield takeLatest(actions.AUTH_SIGN_UP, signUp)
  yield takeLatest(actions.AUTH_SIGN_IN, signIn)
  yield takeLatest(actions.AUTH_SIGN_OUT, signOut)
  yield takeLatest(actions.AUTH_FORGOT_PASSWORD, forgotPassword)
  yield takeLatest(actions.AUTH_CHANGE_PASSWORD, changePassword)
  yield takeLatest(actions.AUTH_COMPLETE_NEW_PASSWORD, completeNewPassword)
}
