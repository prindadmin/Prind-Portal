import * as Actions from '../Actions'
import { defaultState } from '../Sagas/procore'

export const init = () => {
  return {
    type: Actions.PROCORE_INIT,
    payload: defaultState
  }
}

export const storeProcoreDetails = ( parameters ) => {
  return {
    type: Actions.PROCORE_SET_STATE,
    payload: parameters
  }
}

export const getProjectFilesAndFolders = ( payload, resolve, reject ) => {
  return {
    type: Actions.PROCORE_GET_PROJECT_FILES_AND_FOLDERS,
    payload: {
      payload,
      resolve,
      reject
    }
  }
}

export const updateCurrentFolder = ( folderNumber ) => {
  return {
    type: Actions.PROCORE_SET_STATE,
    payload: {
      currentFolder: folderNumber
    }
  }
}

export const updateFolderHistory = ( folders ) => {
  return {
    type: Actions.PROCORE_SET_STATE,
    payload: {
      folderHistory: folders
    }
  }
}

export const updateSearchTerm = ( searchTerm ) => {
  return {
    type: Actions.PROCORE_SET_STATE,
    payload: {
      searchTerm
    }
  }
}


const ACTION_HANDLERS = {
  [Actions.PROCORE_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [Actions.PROCORE_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
