
import sagaHelper from 'redux-saga-testing';
import { call, put, takeLatest, fork } from 'redux-saga/effects'

import * as Sagas from './memberSagas'
import * as Actions from '../Actions'
import * as States from '../States'
import * as Dispatchers from '../Dispatchers/members'

// TODO: FUTURE: Test all the rejects from the Sagas (delete the asyncs, dummy)

const defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}

const dispatcherError = new Error({
  "statusCode": 400,
  "Error": {
      "ErrorMessage": "Test error",
      "ErrorCode": "TEST_ERROR",
      "ErrorNumber": "0001"
  }
})

const mockResolve = jest.fn()
const mockReject = jest.fn()

// https://github.com/antoinejaussoin/redux-saga-testing
// You start by overidding the "it" function of your test framework, in this scope.
// That way, all the tests after that will look like regular tests but will actually be
// running the generator forward at each step.
// All you have to do is to pass your generator and call it.
var it = sagaHelper(Sagas.init());
it('test init', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
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
const addMemberToProjectActionWithoutCallbacks = {
  payload: {
    projectID: "123",
    memberDetails: {
      roleId: "1",
      emailAddress: "test@prind.tech"
    }
  }
}

// Success with callbacks
var it = sagaHelper(Sagas.addMemberToProject(addMemberToProjectAction));
it('Member Sagas - addMemberToProject - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - addMemberToProject - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.addMemberToProject, addMemberToProjectAction.payload.projectID, addMemberToProjectAction.payload.memberDetails));
});
it('Member Sagas - addMemberToProject - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false
    }
  }));
});
it('Member Sagas - addMemberToProject - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - addMemberToProject - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.addMemberToProject(addMemberToProjectAction));
it('Member Sagas - addMemberToProject - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - addMemberToProject - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.addMemberToProject, addMemberToProjectAction.payload.projectID, addMemberToProjectAction.payload.memberDetails));
  return dispatcherError
});
it('Member Sagas - addMemberToProject - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - addMemberToProject - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Member Sagas - addMemberToProject - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Success without callbacks
var it = sagaHelper(Sagas.addMemberToProject(addMemberToProjectActionWithoutCallbacks));
it('Member Sagas - addMemberToProject - Success without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - addMemberToProject - Success without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.addMemberToProject, addMemberToProjectActionWithoutCallbacks.payload.projectID, addMemberToProjectActionWithoutCallbacks.payload.memberDetails));
});
it('Member Sagas - addMemberToProject - Success without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false
    }
  }));
});
it('Member Sagas - addMemberToProject - Success without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - addMemberToProject - Success without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure without callbacks
var it = sagaHelper(Sagas.addMemberToProject(addMemberToProjectActionWithoutCallbacks));
it('Member Sagas - addMemberToProject - Failure without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - addMemberToProject - Failure without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.addMemberToProject, addMemberToProjectActionWithoutCallbacks.payload.projectID, addMemberToProjectActionWithoutCallbacks.payload.memberDetails));
  return dispatcherError
});
it('Member Sagas - addMemberToProject - Failure without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_ADD_MEMBERS_REQUEST_FAILED,
    payload: {
      fetching: false,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - addMemberToProject - Failure without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - addMemberToProject - Failure without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});





const removeMemberFromProjectAction = {
  payload: {
    projectID: "123",
    memberUsername: "aaaa-aaaa-aaaaaaaa-aaaa",
    resolve: mockResolve,
    reject: mockReject
  }
}
const removeMemberFromProjectActionWithoutCallbacks = {
  payload: {
    projectID: "123",
    memberUsername: "aaaa-aaaa-aaaaaaaa-aaaa"
  }
}

// Success with callbacks
var it = sagaHelper(Sagas.removeMemberFromProject(removeMemberFromProjectAction));
it('Member Sagas - removeMemberFromProject - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.removeMemberFromProject, removeMemberFromProjectAction.payload.projectID, removeMemberFromProjectAction.payload.memberUsername));
  return {}
});
it('Member Sagas - removeMemberFromProject - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false,
      currentMember: {}
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - removeMemberFromProject - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.removeMemberFromProject(removeMemberFromProjectAction));
it('Member Sagas - removeMemberFromProject - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.removeMemberFromProject, removeMemberFromProjectAction.payload.projectID, removeMemberFromProjectAction.payload.memberUsername));
  return dispatcherError
});
it('Member Sagas - removeMemberFromProject - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Member Sagas - removeMemberFromProject - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Success without callbacks
var it = sagaHelper(Sagas.removeMemberFromProject(removeMemberFromProjectActionWithoutCallbacks));
it('Member Sagas - removeMemberFromProject - Success without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Success without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.removeMemberFromProject, removeMemberFromProjectActionWithoutCallbacks.payload.projectID, removeMemberFromProjectActionWithoutCallbacks.payload.memberUsername));
  return {}
});
it('Member Sagas - removeMemberFromProject - Success without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false,
      currentMember: {}
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Success without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - removeMemberFromProject - Success without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure without callbacks
var it = sagaHelper(Sagas.removeMemberFromProject(removeMemberFromProjectActionWithoutCallbacks));
it('Member Sagas - removeMemberFromProject - Failure without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Failure without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.removeMemberFromProject, removeMemberFromProjectActionWithoutCallbacks.payload.projectID, removeMemberFromProjectActionWithoutCallbacks.payload.memberUsername));
  return dispatcherError
});
it('Member Sagas - removeMemberFromProject - Failure without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - removeMemberFromProject - Failure without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - removeMemberFromProject - Failure without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});



const getRolesAction = {
  payload: {
    projectID: "123",
    resolve: mockResolve,
    reject: mockReject
  }
}
const getRolesActionWithoutCallbacks = {
  payload: {
    projectID: "123"
  }
}

// Success with callbacks
var it = sagaHelper(Sagas.getRoles(getRolesAction));
it('Member Sagas - getRoles - Success - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - getRoles - Success - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getRoles, getRolesAction.payload.projectID));
  return {
    statusCode: 200,
    body: ["1", "2", "3"]
  }
});
it('Member Sagas - getRoles - Success - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false,
      roles: ["1", "2", "3"]
    }
  }));
});
it('Member Sagas - getRoles - Success - callback', (result) => {
  expect(mockResolve).toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - getRoles - Success - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure with callbacks
var it = sagaHelper(Sagas.getRoles(getRolesAction));
it('Member Sagas - getRoles - Failure - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - getRoles - Failure - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getRoles, getRolesAction.payload.projectID));
  return dispatcherError
});
it('Member Sagas - getRoles - Failure - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - getRoles - Failure - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).toHaveBeenCalled()
});
it('Member Sagas - getRoles - Failure - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Success without callbacks
var it = sagaHelper(Sagas.getRoles(getRolesActionWithoutCallbacks));
it('Member Sagas - getRoles - Success without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - getRoles - Success without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getRoles, getRolesActionWithoutCallbacks.payload.projectID));
  return {
    statusCode: 200,
    body: ["1", "2", "3"]
  }
});
it('Member Sagas - getRoles - Success without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_SET_STATE,
    payload: {
      fetching: false,
      roles: ["1", "2", "3"]
    }
  }));
});
it('Member Sagas - getRoles - Success without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - getRoles - Success without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});

// Failure without callbacks
var it = sagaHelper(Sagas.getRoles(getRolesActionWithoutCallbacks));
it('Member Sagas - getRoles - Failure without callbacks - set fetching status', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT,
    payload: {
      fetching: true
    }
  }));
});
it('Member Sagas - getRoles - Failure without callbacks - send dispatcher', (result) => {
  expect(result).toEqual(call(Dispatchers.getRoles, getRolesActionWithoutCallbacks.payload.projectID));
  return dispatcherError
});
it('Member Sagas - getRoles - Failure without callbacks - set final state', (result) => {
  expect(result).toEqual(put({
    type: Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED,
    payload: {
      ...defaultState,
      error: dispatcherError
    }
  }));
});
it('Member Sagas - getRoles - Failure without callbacks - callback', (result) => {
  expect(mockResolve).not.toHaveBeenCalled()
  expect(mockReject).not.toHaveBeenCalled()
});
it('Member Sagas - getRoles - Failure without callbacks - reached end of generator', (result) => {
  expect(result).toBeUndefined()
});




var it = sagaHelper(Sagas.default());
it('test all member sagas - init', (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBERS_INIT, Sagas.init);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - addMemberToProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBERS_ADD_MEMBERS_REQUESTED, Sagas.addMemberToProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - removeMemberFromProject', (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBERS_REMOVE_MEMBERS_REQUESTED, Sagas.removeMemberFromProject);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
it('test all member sagas - getRoles', (result) => {
  var expectedResult = fork(takeLatest, Actions.MEMBERS_GET_AVAILABLE_ROLES_REQUESTED, Sagas.getRoles);
  result.payload.fn = takeLatest
  expect(result).toEqual(expectedResult);
});
