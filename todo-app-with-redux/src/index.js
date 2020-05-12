import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import store from "./redux/store";
import rootReducer from './redux/reducers/index';
import {createStore, applyMiddleware} from 'redux';
import TodoApp from "./TodoApp";
import {BrowserRouter} from 'react-router-dom'
import thunk from "redux-thunk";

console.log('React DOM');

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk))
console.log("STOREEE");
console.log(store.getState());
const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}><BrowserRouter><TodoApp/></BrowserRouter></Provider>,rootElement);
