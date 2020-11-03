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

export const getPageContent = ( identityToken, projectID ) => {
  return {
    type: action.PAGE_GET_CONTENT_INCEPTION_REQUESTED,
    payload: {
      identityToken,
      projectID,
    }
  }
}


const ACTION_HANDLERS = {

  [action.PAGE_GET_CONTENT_INCEPTION_REQUESTED]: state => ({ ...state }),

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PAGE_GET_CONTENT_INCEPTION_REQUEST_FAILED]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_GET_CONTENT_INCEPTION_REQUEST_SENT]: (state, action) => ({ ...state, ...action.payload }),
  [action.PAGE_INCEPTION_SET_STATE]: (state, action) => ({ ...state, ...action.payload }),
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
