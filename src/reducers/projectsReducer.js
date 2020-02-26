import * as action from '../actions'
import * as strings from '../data/Strings'

const defaultState = {
  accessibleProjects: {
    projectOwner: [],
    projectRole: []
  },
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    projectId: "",
  },
  memberList: [],
  downloadURL: "",
  fileDetails: {},
}

const blankChosenState = {
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    id: "",
  }
}


export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
  }
}

export const resetChosenProject = () => {
  return {
    type: action.PROJECT_RESET_CHOSEN_PROJECT,
    payload: blankChosenState
  }
}

export const resetDownloadURL = () => {
  return {
    type: action.PROJECT_RESET_DOWNLOAD_URL,
    payload: {
      downloadURL: "",
    }
  }
}

export const getAccessibleProjects = ( identityToken ) => {
  return {
    type: action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      identityToken: identityToken,
    }
  }
}

export const updateChosenProject = ( identityToken, project ) => {
  return {
    type: action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      identityToken,
      project,
    }
  }
}

export const createProject = ( identityToken, projectValues ) => {
  return {
    type: action.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      identityToken,
      projectValues,
    }
  }
}

export const updateProjectDetails = ( identityToken, projectID, projectValues ) => {
  return {
    type: action.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED,
    payload: {
      identityToken,
      projectID,
      projectValues,
    }
  }
}

export const getCurrentMembers = ( identityToken, projectID ) => {
  return {
    type: action.PROJECT_GET_CURRENT_MEMBERS_REQUESTED,
    payload: {
      identityToken,
      projectID,
    }
  }
}

export const uploadFile = ( identityToken, projectID, pageName, fieldID, fileDetails ) => {

  return {
    type: action.PROJECT_UPLOAD_FILE_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      fileDetails,
    }
  }
}

export const downloadFile = ( identityToken, projectID, pageName, fieldID, version ) => {

  return {
    type: action.PROJECT_DOWNLOAD_FILE_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      version,
    }
  }
}


export const createField = ( identityToken, projectID, pageName, fieldDetails ) => {

  return {
    type: action.PROJECT_CREATE_FIELD_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldDetails,
    }
  }
}

export const updateField = ( identityToken, pageName, fileDetails ) => {

  return {
    type: action.PROJECT_UPDATE_FIELD_REQUESTED,
    payload: {
      identityToken,
      pageName,
      fileDetails,
    }
  }
}


const ACTION_HANDLERS = {

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_CREATE_PROJECT_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_UPLOAD_FILE_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_DOWNLOAD_FILE_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_CREATE_FIELD_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_UPDATE_FIELD_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_CREATE_PROJECT_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPLOAD_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_CREATE_FIELD_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPDATE_FIELD_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),

  [action.PROJECT_RESET_CHOSEN_PROJECT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_RESET_DOWNLOAD_URL]: (state, action) => ({ ...state, ...action.payload }),

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_CREATE_PROJECT_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPLOAD_FILE_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_CREATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_DOWNLOAD_FILE_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
