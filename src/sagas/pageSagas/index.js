import { all, fork } from 'redux-saga/effects'

import inceptionSagas from './inceptionSagas'
import feasibilitySagas from './feasibilitySagas'
import designSagas from './designSagas'
import tenderSagas from './tenderSagas'
import constructionSagas from './constructionSagas'
import handoverSagas from './handoverSagas'
import occupationSagas from './occupationSagas'
import refurbishmentSagas from './refurbishmentSagas'

export default function * root () {
  yield all([
    fork(inceptionSagas),
    fork(feasibilitySagas),
    fork(designSagas),
    fork(tenderSagas),
    fork(constructionSagas),
    fork(handoverSagas),
    fork(occupationSagas),
    fork(refurbishmentSagas),
  ])
}
