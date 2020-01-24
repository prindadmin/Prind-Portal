import { all, fork } from 'redux-saga/effects'

import inceptionSagas from './inceptionSagas'
import feasibilitySagas from './feasibilitySagas'

export default function * root () {
  yield all([
    fork(inceptionSagas),
    fork(feasibilitySagas),
  ])
}
