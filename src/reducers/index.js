
import { combineReducers } from 'redux'
import * as authReducer from './awsReducer'

const reducers = combineReducers({
  auth: authReducer.reducer,
})

export default reducers
