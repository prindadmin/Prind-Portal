import * as action from '../Actions'

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
    type: action.MEMBER_INIT,
    payload: defaultState
  }
}

export const addMemberToProject = ( identityToken, projectID, memberDetails, resolve, reject ) => {
  return {
    type: action.MEMBER_ADD_MEMBER_REQUESTED,
    payload: {
      identityToken,
      projectID,
      memberDetails,
      resolve,
      reject,
    }
  }
}

export const removeMemberFromProject = ( identityToken, projectID, memberUsername, resolve, reject ) => {
  return {
    type: action.MEMBER_REMOVE_MEMBER_REQUESTED,
    payload: {
      identityToken,
      projectID,
      memberUsername,
      resolve,
      reject,
    }
  }
}

export const getRoles = ( identityToken, projectID ) => {
  return {
    type: action.MEMBER_GET_AVAILABLE_ROLES_REQUESTED,
    payload: {
      identityToken,
      projectID,
    }
  }
}


export const tempGetUserAccreditations = ( username, accreditations ) => {
  return {
    type: action.MEMBER_SET_STATE,
    payload: {
      currentMember: {
        username,
        accreditations,
      },
    }
  }
}

const ACTION_HANDLERS = {

  [action.MEMBER_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.MEMBER_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.MEMBER_ADD_MEMBER_REQUESTED]: state => ({ ...state }),
  [action.MEMBER_REMOVE_MEMBER_REQUESTED]: state => ({ ...state }),
  [action.MEMBER_GET_AVAILABLE_ROLES_REQUESTED]: state => ({ ...state }),

  [action.MEMBER_ADD_MEMBER_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBER_REMOVE_MEMBER_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBER_GET_AVAILABLE_ROLES_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),

  [action.MEMBER_ADD_MEMBER_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBER_REMOVE_MEMBER_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.MEMBER_GET_AVAILABLE_ROLES_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
