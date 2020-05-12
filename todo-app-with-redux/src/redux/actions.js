import { ADD_TODO, TOGGLE_TODO, SET_FILTER, GET_TODO} from "./actionTypes";
//import {getstateIndex} from "./reducers/todo";
//import {getstateIndex} from "./reducers/todos";
let nextTodoId = 0;
//let nextTodoId = getstateIndex();

console.log(`NextToId will be: ${nextTodoId}`);

// export const addTask = task => ({ type: types.ADD_TASK, task });
// export const getTasks = tasks => ({ type: types.GET_TASKS, tasks });
// export const deleteTask = id => ({ type: types.DELETE_TASK, id });
// export const toggleTask = id => ({ type: types.TOGGLE_TASK, id });

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const getTodo = byIds => ({
  type: ADD_TODO,
  payload: {byIds}
});

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
