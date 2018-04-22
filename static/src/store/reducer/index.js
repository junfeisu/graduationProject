import { combineReducers } from 'redux'
import loginReducer from './login'

const rootReducer = combineReducers({
    loginState: loginReducer,
})

export default rootReducer
