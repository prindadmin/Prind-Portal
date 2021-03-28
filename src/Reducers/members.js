import * as action from '../Actions'

import UserAccreditations from '../Components/Temp/UserAccreditations'

const defaultState = {
  fetching: false,
  currentMember: {
    username: null,
    accreditations: []
  },
  roles: [],
}

export const init = () => {
  return {
    type: action.MEMBERS_INIT,
    payload: defaultState
  }
}

export const addMemberToProject = ( projectID, memberDetails, resolve, reject ) => {
  return {
    type: action.MEMBERS_ADD_MEMBERS_REQUESTED,
    payload: {
      projectID,
      memberDetails,
      resolve,
      reject,
    }
  }
}

export const removeMemberFromProject = ( projectID, memberUsername, resolve, reject ) => {
  return {
    type: action.MEMBERS_REMOVE_MEMBERS_REQUESTED,
    payload: {
      projectID,
      memberUsername,
      resolve,
      reject,
    }
  }
}

export const getRoles = ( projectID, resolve, reject ) => {
  return {
    type: action.MEMBERS_GET_AVAILABLE_ROLES_REQUESTED,
    payload: {
      projectID,
      resolve,
      reject
    }
  }
}

// TODO: Replace with real fetch function
export const tempGetUserAccreditations = ( username, resolve, reject ) => {

  if (resolve !== null) {
    setTimeout(function() {
      resolve()
    }, 1000);
  }

  return {
    type: action.MEMBERS_SET_STATE,
    payload: {
      currentMember: {
        username,
        accreditations: UserAccreditations,
      },
    }
  }
}

const ACTION_HANDLERS = {

  [action.MEMBERS_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.MEMBERS_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.MEMBERS_ADD_MEMBERS_REQUESTED]: state => ({ ...state }),
  [action.MEMBERS_REMOVE_MEMBERS_REQUESTED]: state => ({ ...state }),
  [action.MEMBERS_GET_AVAILABLE_ROLES_REQUESTED]: state => ({ ...state }),

  [action.MEMBERS_ADD_MEMBERS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBERS_REMOVE_MEMBERS_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),

  [action.MEMBERS_ADD_MEMBERS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
