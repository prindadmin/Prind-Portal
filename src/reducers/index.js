
import { combineReducers } from 'redux'
import * as authReducer from './awsReducer'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  auth: authReducer.reducer,
  form: formReducer,
})

export default reducers
