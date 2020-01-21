import * as action from '../actions'

const defaultState = {
  chosenProject: {
    name: "Please select a project..."
  }
}

export const init = () => {
  return {
    type: action.PROJECT_INIT,
    payload: defaultState
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


const ACTION_HANDLERS = {

  [action.PROJECT_INIT]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_SET_STATE]: (state, action) => { return { ...state, ...action.payload }},
  [action.PROJECT_PROJECT_CHOSEN]: (state, action) => { return { ...state, ...action.payload }},
}


export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
