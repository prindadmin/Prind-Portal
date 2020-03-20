import * as auth from 'aws-cognito-promises'

import { call, put, takeLatest } from 'redux-saga/effects'

import { register, changePasswordAccount, confirmUserDispatcher } from '../dispatchers/aws'
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

function * getUser (action) {
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

    //action.payload.resolve()
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
    //action.payload.reject()
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

    // Clear the project store
    yield put({
      type: actions.PROJECT_INIT,
      payload: {}
    })

    // Clear the member store
    yield put({
      type: actions.MEMBER_INIT,
      payload: {}
    })

    // Clear the foundations store
    yield put({
      type: actions.FOUNDATIONS_INIT,
      payload: {}
    })

    // Clear the user store
    yield put({
      type: actions.USER_INIT,
      payload: {}
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
    const { user_name, confirmation_code, password } = action.payload.values

    console.log(user_name, confirmation_code, password)

    yield call(auth.changePassword, user_name, confirmation_code, password)

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

function * confirmUser (action) {

  const { userParameters } = action.payload

  try {

    // pre-fetch update
    yield put({
      type: actions.AUTH_CONFIRM_USER_REQUEST_SENT,
      payload: {
        fetching: true,
      }
    })

    //const { data: result } = yield call(confirmUserDispatcher, userParameters)
    yield call(confirmUserDispatcher, userParameters)

    // post-fetch update
    yield put({
      type: actions.AUTH_SET_STATE,
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
      type: actions.AUTH_CONFIRM_USER_REQUEST_FAILED,
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

export default function * sagas () {
  yield takeLatest(actions.AUTH_INIT, init)
  yield takeLatest(actions.AUTH_GET_USER, getUser)
  yield takeLatest(actions.AUTH_SIGN_UP, signUp)
  yield takeLatest(actions.AUTH_SIGN_IN, signIn)
  yield takeLatest(actions.AUTH_SIGN_OUT, signOut)
  yield takeLatest(actions.AUTH_FORGOT_PASSWORD, forgotPassword)
  yield takeLatest(actions.AUTH_CHANGE_PASSWORD, changePassword)
  yield takeLatest(actions.AUTH_COMPLETE_NEW_PASSWORD, completeNewPassword)
  yield takeLatest(actions.AUTH_CONFIRM_USER_REQUESTED, confirmUser)
}
