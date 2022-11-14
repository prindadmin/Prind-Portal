import { all, fork } from 'redux-saga/effects'

import authSagas from './authSagas'
import userSagas from './userSagas'
import projectSagas from './projectSagas'
import memberSagas from './memberSagas'
import stagePageSagas from './stagePageSagas'
import procore from './procore'

export default function * root () {
  yield all([
    fork(authSagas),
    fork(userSagas),
    fork(projectSagas),
    fork(memberSagas),
    fork(stagePageSagas),
    fork(procore),
  ])
}
