import * as action from '../Actions'
import * as strings from '../Data/Strings'

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    projectId: "",
  },
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

const blankChosenState = {
  chosenProject: {
    projectName: strings.NO_PROJECT_SELECTED,
    projectId: "",
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

export const getAccessibleProjects = ( identityToken,  ) => {
  return {
    type: action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      identityToken: identityToken,
    }
  }
}

export const updateChosenProject = ( identityToken, project, resolve, reject ) => {
  return {
    type: action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      identityToken,
      project,
      resolve,
      reject,
    }
  }
}

export const saveProjectID = ( projectId ) => {
  return {
    type: action.PROJECT_SET_STATE,
    payload: {
      chosenProject: {
        projectId
      },
    }
  }
}


export const createProject = ( identityToken, projectValues, resolve, reject ) => {
  return {
    type: action.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      identityToken,
      projectValues,
      resolve,
      reject,
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

export const downloadFile = ( identityToken, projectID, pageName, fieldID, version, resolve, reject ) => {

  return {
    type: action.PROJECT_DOWNLOAD_FILE_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      version,
      resolve,
      reject,
    }
  }
}


export const createField = ( identityToken, projectID, pageName, fieldDetails, resolve, reject ) => {

  return {
    type: action.PROJECT_CREATE_FIELD_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldDetails,
      resolve,
      reject,
    }
  }
}

export const updateField = ( identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject ) => {

  return {
    type: action.PROJECT_UPDATE_FIELD_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      fieldDetails,
      resolve,
      reject,
    }
  }
}

export const requestSignature = ( identityToken, projectID, pageName, fieldID, members, resolve, reject ) => {
  return {
    type: action.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      identityToken,
      projectID,
      pageName,
      fieldID,
      members,
      resolve,
      reject,
    }
  }
}


export const deleteProject = ( identityToken, projectID, resolve, reject ) => {
  return {
    type: action.PROJECT_DELETE_PROJECT_REQUESTED,
    payload: {
      identityToken,
      projectID,
      resolve,
      reject,
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
  [action.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_DELETE_PROJECT_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_CREATE_PROJECT_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPLOAD_FILE_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_CREATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_DOWNLOAD_FILE_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_DELETE_PROJECT_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},

  [action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_CREATE_PROJECT_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPLOAD_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_DOWNLOAD_FILE_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_CREATE_FIELD_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_UPDATE_FIELD_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_DELETE_PROJECT_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),

  [action.PROJECT_RESET_CHOSEN_PROJECT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_RESET_DOWNLOAD_URL]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
