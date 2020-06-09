import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";

console.log('index.js in Reducers');
const rootReducer = combineReducers({ todos, visibilityFilter });
export default  rootReducer;
