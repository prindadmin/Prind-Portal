import { all, fork } from 'redux-saga/effects'

import awssagas from './awsSagas'
import userSagas from './userSagas'
import projectSagas from './projectSagas'
import memberSagas from './memberSagas'
import pageSagas from './pageSagas'
import foundationsSagas from './foundationsSagas'

export default function * root () {
  yield all([
    fork(awssagas),
    fork(userSagas),
    fork(projectSagas),
    fork(memberSagas),
    fork(pageSagas),
    fork(foundationsSagas),
  ])
}
