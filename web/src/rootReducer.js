import authReducer from './auth/authReducer'
import projectReducer from './project/projectReducer'
import { reducer as formReducer} from 'redux-form'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer, 
    project: projectReducer,
    form: formReducer
})

export default rootReducer