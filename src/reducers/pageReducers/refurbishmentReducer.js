import * as action from '../../Actions'

const defaultState = {
  fetching: false,
  fields: [],
  error: null,
}

export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
  }
}

export const getPageContent = ( projectID ) => {
  return {
    type: action.PAGE_GET_CONTENT_REFURBISHMENT_REQUESTED,
    payload: {
      projectID,
    }
  }
}


const ACTION_HANDLERS = {

  [action.PAGE_GET_CONTENT_REFURBISHMENT_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PAGE_GET_CONTENT_REFURBISHMENT_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_GET_CONTENT_REFURBISHMENT_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_REFURBISHMENT_SET_STATE]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
