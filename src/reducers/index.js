import {combineReducers} from 'redux';      
import authReducer from './auth';
import detailReducer from './userdetails';


export default combineReducers({
    authReducer,detailReducer
});