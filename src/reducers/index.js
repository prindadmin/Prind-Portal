
import { combineReducers } from 'redux'
import * as auth from './auth'
import * as user from './user'
import * as projects from './projects'
import * as members from './members'
import * as foundations from './foundations'
import * as procore from './procore'
import { reducer as formReducer } from 'redux-form'
import * as stagePage from './stagePage'

const Reducers = combineReducers({
  auth: auth.reducer,
  foundations: foundations.reducer,
  members: members.reducer,
  projects: projects.reducer,
  pageContent: stagePage.reducer,
  user: user.reducer,
  form: formReducer,
  procore: procore.reducer,
})

export default Reducers
