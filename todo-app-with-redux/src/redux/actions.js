import { ADD_TODO, TOGGLE_TODO, SET_FILTER, GET_TODO, DELETE_TODO} from "./actionTypes";
import axios from 'axios';
import {store} from "../index";
export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });




//To add a new item to the list
export const addTodo = (content) => {
  console.log("ADD NEW ITEM TO THE LIST");
  let added_item = {content: content}; //Will send to Node JS the content only.
  //nextTodoId= nextTodoId+1;
  console.log(added_item);
  return(dispatch) => {
    return axios.post('http://localhost:81/todo/App/api/todo/',added_item).then(response => dispatch(
      {
        type: ADD_TODO, todo: response})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }
}

export const getData = () => {
  console.log("GETTING DATA FROM NODE");
  return(dispatch) => {
    return fetch('http://localhost:81/todo/App/api/todos/').then(response => response.json()).then(json => dispatch(
      {
        type: "GET_DATA", todo: json})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }
}


//To convert the item from incompleted and mark it completed or Vice versa.
export const toggleTodo = (content) => {
  console.log("CHANGE ITEM FROM INCOMPELTE TO COMPLETED");
  console.log(`The Item that will be marked is ${content}`);
  return(dispatch) => {
    return axios.patch('http://localhost:81/todo/App/api/todo/',{content}).then(response => dispatch(
      {
        type: "TOGGLE_TODO", todo: response})).catch(err => dispatch({
          type: "ERROR", msg: "FAILED"}))
  }

}

//

export function DeleteTodoSuccess(todo){
  console.log("DELET SUCCESS");
  console.log(`todo in DeleteTodoSuccess ${todo}`);
    return{
        type: 'DELETE_TODO',
        todo
    }
}

export const deleteTodo = (content) => {
  console.log("REMOVING ITEM");
  console.log(`The Item that will be removed is ${content}`);
  var config = {
            headers: {
                'User-Agent':'',
                'Accept':'',
                'Host':''
            }
        };
        axios.delete('http://localhost:81/todo/App/api/todo', {params: {content: content}}, config).then((res) =>
              {
                console.log(res.data);
               store.dispatch(DeleteTodoSuccess(res.data));
              })
              .catch( function(error) {
                console.log(`error is ${error}`);
                  console.log(JSON.stringify(error, null, 2));
              });

            }
// export const deleteTodo = (content) => {
//   console.log("REMOVE ITEMS");
//   console.log(`The Item that be removed is ${content}`);
//   var config = {
//             headers: {
//                 'User-Agent':'',
//                 'Accept':'',
//                 'Host':''
//             }
//         };
//   return(dispatch) => {
//     axios.delete('http://localhost:81/todo/App/api/todo/',{content}).then(response => dispatch(
//       {
//         type: "DELETE_TODO", todo: response})).catch(err => dispatch({
//           type: "ERROR", msg: "FAILED"}))
//   }
//
//         // axios.delete('http://localhost:81/todo/App/api/todo', {params: {content: content}}, config).then((res) =>
//         //       {
//         //         console.log(res.data);
//         //       const delete2 = DeleteTodoSuccess(res);
//         //       console.log(`delete is ${delete2.type}`);
//         //      this.store.dispatch({});
//         //   //   this.props.dispatch(DeleteTodoSuccess(res.data));
//         //       console.log("After dispatch");
//         //           //this.props.dispatch({type: "DELETE_TODO", todo: res.data});
//         //       })
//         //       .catch( function(error) {
//         //         console.log(`ERROR is ${error}`);
//         //       //    console.log(JSON.stringify(error, null, 2));
//         //       });
//             }
