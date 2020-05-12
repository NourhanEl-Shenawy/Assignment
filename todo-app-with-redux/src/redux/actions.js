import { ADD_TODO, TOGGLE_TODO, SET_FILTER, GET_TODO} from "./actionTypes";
import axios from 'axios';
// import {todo_length} from "./reducers/todos";
//import {getstateIndex} from "./reducers/todo";
//import {getstateIndex} from "./reducers/todos";
let nextTodoId = Math.floor(Math.random() * 100) + 1;
//let nextTodoId = getstateIndex();
// console.log(`ACTIONS ${todo_length}`);
//
 console.log(`NextToId will be: ${nextTodoId}`);

// export const addTask = task => ({ type: types.ADD_TASK, task });
// export const getTasks = tasks => ({ type: types.GET_TASKS, tasks });
// export const deleteTask = id => ({ type: types.DELETE_TASK, id });
// export const toggleTask = id => ({ type: types.TOGGLE_TASK, id });

// export const addTodo = content => ({
//   type: ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content
//   }
// });

// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });




// export const getTodo = byIds => ({
//   type: ADD_TODO,
//   payload: {byIds}
// });

//export const getTasks = tasks => ({ type: types.GET_TASKS, tasks });

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });


export const getData = () => {
  console.log("GETTING DATA FROM NODE");
  return(dispatch) => {
    return fetch('http://localhost:81/todo/App/api/todos/').then(response => response.json()).then(json => dispatch(
      {
        type: "GET_DATA", todo: json})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }
}

//To add a new item to the list
export const addTodo = (content) => {
  console.log("ADD NEW ITEM TO THE LIST");
  let added_item = {id: nextTodoId, content: content};
  nextTodoId= nextTodoId+1;
  console.log(added_item);
  return(dispatch) => {
    return axios.post('http://localhost:81/todo/App/api/todo/',added_item).then(response => response.json()).then(json => dispatch(
      {
        type: "ADD_TODO", todo: json})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }
}
//To remove the item from incompleted and mark it completed or Vice versa.
export const toggleTodo = (id) => {
  console.log("CHANGE ITEM FROM INCOMPELTE TO COMPLETED");
  console.log(`The ID that will be removed is ${id}`);
  return(dispatch) => {
    return axios.patch('http://localhost:81/todo/App/api/todo/',{id}).then(response => response.json()).then(json => dispatch(
      {
        type: "TOGGLE_TODO", todo: json})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }
  
}
