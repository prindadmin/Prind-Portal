import * as action from '../Actions'
import * as Strings from '../Data/Strings'

const defaultChosenProject = {
  projectName: Strings.NO_PROJECT_SELECTED,
  projectId: "",
  projectType: "",
}

const defaultState = {
  accessibleProjects: {
    projectCreator: [],
    projectRole: []
  },
  chosenProject: defaultChosenProject,
  memberList: [],
  downloadURL: "",
  fileDetails: {},
  fetching: false,
  error: null,
}

const blankChosenState = {
  chosenProject: defaultChosenProject,
  error: null,
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

export const getAccessibleProjects = ( resolve, reject ) => {
  return {
    type: action.PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED,
    payload: {
      resolve,
      reject,
    }
  }
}

export const updateChosenProject = ( project, resolve, reject ) => {
  return {
    type: action.PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED,
    payload: {
      project,
      resolve,
      reject,
    }
  }
}

export const saveProjectID = ( projectId ) => {
  if (projectId === undefined) {
    console.log("projectId was undefined")
    return {
      type: action.PROJECT_SET_STATE,
      payload: blankChosenState
    }
  }
  return {
    type: action.PROJECT_SET_STATE,
    payload: {
      chosenProject: {
        ...defaultChosenProject,
        projectId
      },
    }
  }
}


export const createProject = ( projectValues, resolve, reject ) => {
  return {
    type: action.PROJECT_CREATE_PROJECT_REQUESTED,
    payload: {
      projectValues,
      resolve,
      reject,
    }
  }
}

export const updateProjectDetails = ( projectID, projectValues, resolve, reject ) => {
  return {
    type: action.PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED,
    payload: {
      projectID,
      projectValues,
      resolve,
      reject
    }
  }
}

export const getCurrentMembers = ( projectID, resolve, reject ) => {
  return {
    type: action.PROJECT_GET_CURRENT_MEMBERS_REQUESTED,
    payload: {
      projectID,
      resolve,
      reject
    }
  }
}

export const uploadFile = ( projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject ) => {

  return {
    type: action.PROJECT_UPLOAD_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      fileDetails,
      fieldType,
      resolve,
      reject,
    }
  }
}

export const downloadFile = ( projectID, pageName, fieldID, version, resolve, reject ) => {

  return {
    type: action.PROJECT_DOWNLOAD_FILE_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      version,
      resolve,
      reject,
    }
  }
}


export const createField = ( projectID, pageName, fieldDetails, resolve, reject ) => {

  return {
    type: action.PROJECT_CREATE_FIELD_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldDetails,
      resolve,
      reject,
    }
  }
}

export const updateField = ( projectID, pageName, fieldID, fieldDetails, resolve, reject ) => {

  return {
    type: action.PROJECT_UPDATE_FIELD_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      fieldDetails,
      resolve,
      reject,
    }
  }
}

export const requestSignature = ( projectID, pageName, fieldID, members, resolve, reject ) => {
  return {
    type: action.PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED,
    payload: {
      projectID,
      pageName,
      fieldID,
      members,
      resolve,
      reject,
    }
  }
}


export const deleteProject = ( projectID, resolve, reject ) => {
  return {
    type: action.PROJECT_DELETE_PROJECT_REQUESTED,
    payload: {
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
  [action.PROJECT_DOWNLOAD_FILE_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_CREATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_UPDATE_FIELD_REQUEST_SENT]: (state, action) => { return { ...state, ...action.payload }},
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
  [action.PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),

  [action.PROJECT_RESET_CHOSEN_PROJECT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PROJECT_RESET_DOWNLOAD_URL]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
