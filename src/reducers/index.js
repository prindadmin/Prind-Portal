
import { combineReducers } from 'redux'
import * as authReducer from './awsReducer'
import * as userReducer from './userReducer'
import * as projectsReducer from './projectsReducer'
import pageContent from './pageReducers'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer,
  projects: projectsReducer.reducer,
  pageContent,
  form: formReducer,
})

export default reducers
