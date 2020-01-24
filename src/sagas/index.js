import { all, fork } from 'redux-saga/effects'

import awssagas from './awsSagas'
import userSagas from './userSagas'
import projectSagas from './projectSagas'
import pageSagas from './pageSagas'

export default function * root () {
  yield all([
    fork(awssagas),
    fork(userSagas),
    fork(projectSagas),
    fork(pageSagas),
  ])
}
