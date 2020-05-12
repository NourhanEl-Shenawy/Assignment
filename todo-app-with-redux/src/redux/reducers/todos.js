import { ADD_TODO, TOGGLE_TODO, GET_DATA } from "../actionTypes";
import axios from 'axios';
import querystring from 'querystring';
import { addTodo, toggleTodo, getTodo, setFilter, getData} from "../actions";
// const initialState = {
//   allIds: [1,2,3],
//   byIds: {1:{
//     content: "Make bed",
//     completed: false
//   },
// 2: {
//   content: "Breakfast",
//   completed: false
// },
// 3: {
//   content: "STUDY",
//   completed: false
// }}
// };
// const data =  fetchDataFromBackend();
// console.log("DATAA RETREIVED");
// console.log(data);

//How to fetch from node js:
// const initialState = function fetchDataFromBackend(){
// return  Axios.get('http://localhost:81/todo/App/api/todos/')
//   .then((response) => {
//   //  console.log(response.data);
//   //  console.log(response.status);
//   //  console.log(response.statusText);
//   console.log(response.headers);
//   //  console.log(response.config);
//   console.log("response");
//   console.log(response.data);
//   });
//
//
// }
//


// function getUserData() {
//   return new Promise((resolve, reject) => {
//       Axios.get('http://localhost:81/todo/App/api/todos/')
//         .then(res => resolve(res.data))
//         .catch(err => reject(err));
//     }
//   );
// }

// let data;
// const initialState= getUserData().then(function(userData) {
//   data = {
//     userData: userData, // ' ' or axios result
//   };
//   console.log("AXIOSs")
//   console.log(data.userData)
// }).userData;
//
// console.log(data);
// console.log(initialState);
//const initialState = data;

//Initializing the initial State
const initialState = {
  allIds: [],
  byIds: {}
}
  console.log("todos.js");
// export function getstateIndex(){
//  return (initialState.allIds.length);
// }
export default function(state = initialState, action) {
  console.log("state function ");
  console.log(state);
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case GET_DATA: {
      return action.todo;
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      console.log("TOGGLE_TODO");
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    default:
      return state;
  }
}

//export default todos;

// export const gettodo = () => dispatch => {
//   console.log("GET TODO List From Server");
//   axios.get('/http://localhost:81/todo/api/todos')
//     .then((response) => response.data)
//     .then((tasks) => dispatch(getTasks(tasks)))
//     .catch((err) => console.error.bind(err));
// };
