
import sagaHelper from 'redux-saga-testing';
import { fork, all } from 'redux-saga/effects'

import * as AllSagas from './index'
import * as AuthSagas from './authSagas'
import * as FoundationsSagas from './foundationsSagas'
import * as MemberSagas from './memberSagas'
import * as ProjectSagas from './projectSagas'
import * as StagePageSagas from './stagePageSagas'
import * as UserSagas from './userSagas'

var it = sagaHelper(AllSagas.default());
it('test all sagas are present', async (result) => {

  const expectedAuthResult = fork(AuthSagas.default)
  const expectedFoundationsResult = fork(FoundationsSagas.default)
  const expectedMemberResult = fork(MemberSagas.default)
  const expectedProjectResult = fork(ProjectSagas.default)
  const expectedStagePageResult = fork(StagePageSagas.default)
  const expectedUserResult = fork(UserSagas.default)


  var expectedResult = all([
    expectedAuthResult,
    expectedUserResult,
    expectedProjectResult,
    expectedMemberResult,
    expectedFoundationsResult,
    expectedStagePageResult,
  ])
  expect(result).toEqual(expectedResult);
});
