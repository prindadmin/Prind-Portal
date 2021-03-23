
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as MemberSagas from './memberSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as MemberDispatchers from '../Dispatchers/members'

// TODO: Test all the rejects from the Sagas (delete the asyncs, dummy)

const defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(MemberSagas.init());
it('test init', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_SET_STATE,
    payload: {
      ...defaultState
    }
  }));
});


const addMemberToProjectAction = {
  payload: {
    projectID: "123",
    memberDetails: {
      roleId: "1",
      emailAddress: "test@prind.tech"
    },
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(MemberSagas.addMemberToProject(addMemberToProjectAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_ADD_MEMBER_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(MemberDispatchers.addMemberToProject, addMemberToProjectAction.payload.projectID, addMemberToProjectAction.payload.memberDetails));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_SET_STATE,
    payload: {}
  }));
});
it('test callback resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});





const removeMemberFromProjectAction = {
  payload: {
    projectID: "123",
    memberUsername: "aaaa-aaaa-aaaaaaaa-aaaa",
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(MemberSagas.removeMemberFromProject(removeMemberFromProjectAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_REMOVE_MEMBER_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(MemberDispatchers.removeMemberFromProject, removeMemberFromProjectAction.payload.projectID, removeMemberFromProjectAction.payload.memberUsername));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_SET_STATE,
    payload: {
      fetching: false,
      currentMember: expect.any(Promise)
    }
  }));
});
it('test callback resolve', async (result) => {
  expect(mockResolve).toHaveBeenCalled()
});



const getRolesAction = {
  payload: {
    projectID: "123",
    resolve: mockResolve,
    reject: mockReject
  }
}
var it = sagaHelper(MemberSagas.getRoles(getRolesAction));
it('test change to fetching status', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('test request to dispatcher', async (result) => {
  expect(result).toEqual(call(MemberDispatchers.getRoles, getRolesAction.payload.projectID));
});
it('test end of send put', async (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBER_SET_STATE,
    payload: {
      fetching: false,
      roles: undefined
    }
  }));
});






var it = sagaHelper(MemberSagas.default());
it('test all member sagas - init', async (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBER_INIT, MemberSagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - addMemberToProject', async (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBER_ADD_MEMBER_REQUESTED, MemberSagas.addMemberToProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - removeMemberFromProject', async (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBER_REMOVE_MEMBER_REQUESTED, MemberSagas.removeMemberFromProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - getRoles', async (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBER_GET_AVAILABLE_ROLES_REQUESTED, MemberSagas.getRoles);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
