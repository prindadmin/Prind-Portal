
import { combineReducers } from 'redux'
import * as authReducer from './awsReducer'
import * as userReducer from './userReducer'
import * as projectsReducer from './projectsReducer'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  auth: authReducer.reducer,
  user: userReducer.reducer,
  project: projectsReducer.reducer,
  form: formReducer,
})

export default reducers
