import { call, put, takeLatest } from 'redux-saga/effects'

import * as Actions from '../Actions'
import * as States from '../States'
import * as Dispatchers from '../Dispatchers/Auth'

// auth is stateless. Each call to a auth action resets all state EXCEPT for updatePassword
let defaultState = {
  info: {},
  error: {},
  isSignedIn: States.AUTH_UNKNOWN,
  isConfirmed: States.AUTH_UNKNOWN,
  hasSignedUp: States.AUTH_UNKNOWN,
  hasSentCode: States.AUTH_UNKNOWN,
  hasChangedPassword: States.AUTH_UNKNOWN,
  passwordResetRequired: States.AUTH_UNKNOWN
}

/*
================================================================
= Init function - Populates the store with the initial values  =
================================================================
*/
function * init (action) {
  yield put({
    type: Actions.AUTH_SET_STATE,
    payload: {
      ...defaultState
    }
  })
}

/*
================================================================
=== User Sign Up function - Signs the user up for the portal ===
================================================================
*/
function * signUp (action) {
  try {
    yield call(Dispatchers.registerNewUser, action.payload.values)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
        hasSignedUp: States.AUTH_SUCCESS
      }
    })
    if (action.payload.resolve !== undefined) {
      action.payload.resolve()
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

/*
================================================================
==== User Sign In function - signs the user into the portal ====
================================================================
*/
function * signIn (action) {
  try {
    const result = yield call(Dispatchers.signIn, action.payload.values)
    console.log(result)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        isSignedIn: States.AUTH_SUCCESS,
        isConfirmed: States.AUTH_SUCCESS,
      }
    })
    yield put({
      type: Actions.USER_SET_STATE,
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

/*
================================================================
== User Sign Out function - signs the user out of the portal  ==
================================================================
*/
function * signOut (action) {
  try {
    const result = yield call(Dispatchers.signOut)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        ...defaultState,
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

/*
================================================================
== User Refresh Session function - creates a new session from ==
== the refresh token                                          ==
================================================================
*/

function * refreshSession (action) {
  try {
    const result = yield call(Dispatchers.refreshSession)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        isSignedIn: States.AUTH_SUCCESS,
        isConfirmed: States.AUTH_SUCCESS,
      }
    })
    yield put({
      type: Actions.USER_SET_STATE,
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

/*
====================================================================
== User Forgot Password function - signs the user into the portal ==
====================================================================
*/
function * forgotPassword (action) {
  try {
    const result = yield call(Dispatchers.forgotPassword, action.payload.username)
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

/*
====================================================================
== User Change Password function - changes the password for a     ==
== user if they have requested a new one                          ==
====================================================================
*/
function * changePassword (action) {
  try {
    const result = yield call(Dispatchers.changePassword, action.payload)
    yield put({
      type: Actions.AUTH_SET_STATE,
      payload: {
        hasChangedPassword: States.AUTH_SUCCESS
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

/*
====================================================================
== User Update Password function - updates the users password     ==
== using their old password as proof                              ==
====================================================================
*/
function * updatePassword (action) {
  try {
    const result = yield call(Dispatchers.updatePassword, action.payload)
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

/*
====================================================================
== Confirm user email function - confirms the users email and     ==
== allows them to enter their account                             ==
====================================================================
*/

function * confirmUserEmail (action) {
  try {
    const result = yield call(Dispatchers.confirmUser, action.payload)
    if (action.payload.resolve !== undefined) {
      action.payload.resolve(action.payload.user_name)
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

export default function * sagas () {
  yield takeLatest(Actions.AUTH_INIT, init)
  yield takeLatest(Actions.AUTH_SIGN_UP, signUp)
  yield takeLatest(Actions.AUTH_SIGN_IN, signIn)
  yield takeLatest(Actions.AUTH_SIGN_OUT, signOut)
  yield takeLatest(Actions.AUTH_REFRESH_SESSION, refreshSession)
  yield takeLatest(Actions.AUTH_FORGOT_PASSWORD, forgotPassword)
  yield takeLatest(Actions.AUTH_CHANGE_PASSWORD, changePassword)
  yield takeLatest(Actions.AUTH_COMPLETE_NEW_PASSWORD, updatePassword)
  yield takeLatest(Actions.AUTH_CONFIRM_USER_REQUESTED, confirmUserEmail)
}
