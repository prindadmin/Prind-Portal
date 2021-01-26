import * as action from '../Actions'

const defaultPageState = {
  fetching: false,
  fields: [],
  error: null,
}

const defaultState = {
  inception: {
    ...defaultPageState
  },
  feasibility: {
    ...defaultPageState
  },
  design: {
    ...defaultPageState
  },
  tender: {
    ...defaultPageState
  },
  construction: {
    ...defaultPageState
  },
  handover: {
    ...defaultPageState
  },
  occupation: {
    ...defaultPageState
  },
  refurbishment: {
    ...defaultPageState
  },
}

export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
  }
}

export const getPageContent = ( projectID, pageName, resolve, reject ) => {
  return {
    type: action.PAGE_GET_CONTENT_REQUESTED,
    payload: {
      projectID,
      pageName,
      resolve,
      reject,
    }
  }
}


const ACTION_HANDLERS = {
  [action.PAGE_GET_CONTENT_REQUESTED]: state => ({ ...state }),
  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PAGE_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
