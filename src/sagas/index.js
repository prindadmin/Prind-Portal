import { all, fork } from 'redux-saga/effects'

import awssagas from './awsSagas'
import userSagas from './userSagas'
import projectSagas from './projectSagas'

export default function * root () {
  yield all([
    fork(awssagas),
    fork(userSagas),
    fork(projectSagas),
  ])
}
