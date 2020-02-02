import * as action from '../actions'
import * as strings from '../data/Strings'

const defaultState = {
  accessibleProjects: [],
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    id: "",
  },
  memberList: [],
  fileDetails: {},
}

export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
  }
}

export const getAccessibleProjects = ( jwtToken ) => {
  return {
    type: action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      jwtToken: jwtToken,
    }
  }
}

export const updateChosenProject = ( project ) => {
  return {
    type: action.PROJECT_PROJECT_CHOSEN,
    payload: {
      chosenProject: project,
    }
  }
}

export const createProject = ( jwtToken, projectValues ) => {
  return {
    type: action.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      jwtToken,
      projectValues,
    }
  }
}

export const getCurrentMembers = ( jwtToken, projectID ) => {
  return {
    type: action.PROJECT_GET_CURRENT_MEMBERS_REQUESTED,
    payload: {
      jwtToken,
      projectID,
    }
  }
}

export const uploadFile = ( jwtToken, pageName, fileDetails ) => {

  console.log(fileDetails)

  return {
    type: action.PROJECT_UPLOAD_FILE_REQUESTED,
    payload: {
      jwtToken,
      pageName,
      fileDetails,
    }
  }
}

const ACTION_HANDLERS = {

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_CREATE_PROJECT_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_UPLOAD_FILE_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_PROJECT_CHOSEN]: (state, action) => { return { ...state, ...action.payload }},

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_CREATE_PROJECT_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPLOAD_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
