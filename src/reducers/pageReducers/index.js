
import { combineReducers } from 'redux'
import * as inceptionReducer from './inceptionReducer'
import * as feasibilityReducer from './feasibilityReducer'
import * as designReducer from './designReducer'
import * as tenderReducer from './tenderReducer'
import * as constructionReducer from './constructionReducer'
import * as handoverReducer from './handoverReducer'
import * as occupationReducer from './occupationReducer'
import * as refurbishmentReducer from './refurbishmentReducer'

export default combineReducers({
  inception: inceptionReducer.reducer,
  feasibility: feasibilityReducer.reducer,
  design: designReducer.reducer,
  tender: tenderReducer.reducer,
  construction: constructionReducer.reducer,
  handover: handoverReducer.reducer,
  occupation: occupationReducer.reducer,
  refurbishment: refurbishmentReducer.reducer,
})
