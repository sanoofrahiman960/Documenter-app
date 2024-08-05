import { combineReducers } from "redux";
import { backendReducer } from "./reducer";


const allReducers = combineReducers({
    backend: backendReducer
})
export default allReducers