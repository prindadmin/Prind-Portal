
import { combineReducers } from 'redux'
import * as authReducer from './awsReducer'
import * as userReducer from './userReducer'
import * as projectsReducer from './projectsReducer'
import * as memberReducer from './memberReducer'
import * as foundationsReducer from './foundationsReducer'
import pageContent from './pageReducers'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer,
  projects: projectsReducer.reducer,
  foundations: foundationsReducer.reducer,
  pageContent,
  members: memberReducer.reducer,
  form: formReducer,
})

export default reducers
