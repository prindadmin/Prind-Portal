
import { combineReducers } from 'redux'
import * as inceptionReducer from './inceptionReducer'
import * as feasibilityReducer from './feasibilityReducer'

export default combineReducers({
  inception: inceptionReducer.reducer,
  feasibility: feasibilityReducer.reducer,
})
