
import { combineReducers } from 'redux'
import * as auth from './auth'
import * as userReducer from './userReducer'
import * as projectsReducer from './projectsReducer'
import * as memberReducer from './memberReducer'
import * as foundationsReducer from './foundationsReducer'
import { reducer as formReducer } from 'redux-form'
import * as stagePageReducer from './stagePageReducer'

const Reducers = combineReducers({
  auth: auth.reducer,
  user: userReducer.reducer,
  projects: projectsReducer.reducer,
  foundations: foundationsReducer.reducer,
  pageContent: stagePageReducer.reducer,
  members: memberReducer.reducer,
  form: formReducer,
})

export default Reducers
