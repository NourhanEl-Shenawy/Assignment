//import { createStore } from "redux";
import rootReducer from "./reducers/index.js";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';


export const middlewares=[ReduxThunk];

export const createStoreWithMiddleware=applyMiddleware(...middlewares)(createStore)
export const store=createStoreWithMiddleware(rootReducer);

console.log('store.js');
// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     createLogger(),
//     thunkMiddleware
//   )
// );
export default store;
