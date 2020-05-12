//import { createStore } from "redux";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

console.log('store.js');
const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger(),
    thunkMiddleware
  )
);
export default store;
