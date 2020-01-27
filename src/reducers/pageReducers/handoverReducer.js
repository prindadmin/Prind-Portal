import * as action from '../../actions'

const defaultState = {
  fetching: false,
  fields: [],
}

export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
  }
}

export const getPageContent = ( identityToken, projectID ) => {
  return {
    type: action.PAGE_GET_CONTENT_HANDOVER_REQUESTED,
    payload: {
      identityToken,
      projectID,
    }
  }
}


const ACTION_HANDLERS = {

  [action.PAGE_GET_CONTENT_HANDOVER_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PAGE_GET_CONTENT_HANDOVER_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_GET_CONTENT_HANDOVER_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_HANDOVER_SET_STATE]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
