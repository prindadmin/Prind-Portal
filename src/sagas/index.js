import { all, fork } from 'redux-saga/effects'

import awssagas from './awsSagas'

export default function * root () {
  yield all([
    fork(awssagas),
  ])
}
