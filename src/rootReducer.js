import authReducer from './auth/authReducer'
import projectReducer from './project/projectReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    project: projectReducer
})

export default rootReducer