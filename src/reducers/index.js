
import { combineReducers } from 'redux'
import * as auth from './auth'
import * as userReducer from './userReducer'
import * as projects from './projects'
import * as members from './members'
import * as foundations from './foundations'
import { reducer as formReducer } from 'redux-form'
import * as stagePageReducer from './stagePageReducer'

const Reducers = combineReducers({
  auth: auth.reducer,
  foundations: foundations.reducer,
  members: members.reducer,
  projects: projects.reducer,
  pageContent: stagePageReducer.reducer,
  user: userReducer.reducer,
  form: formReducer,
})

export default Reducers
