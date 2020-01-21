import { all, fork } from 'redux-saga/effects'

import awssagas from './awsSagas'
import userSagas from './userSagas'

export default function * root () {
  yield all([
    fork(awssagas),
    fork(userSagas),
  ])
}
