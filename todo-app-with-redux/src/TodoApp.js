import React, {Component} from 'react'
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import "./styles.css";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './redux/actions'
import {getData} from './redux/actions'
import {withRouter} from 'react-router'
import {Route, Link} from 'react-router-dom'

class TodoApp extends Component {
  constructor(){
    console.log("CONSTRUCTOR");
    super();
  }

  componentDidMount(){
    console.log("COMPONENT DID MOUNT");
    //Here, will fetch the data from Node JS
  //  this.props.dispatch(getData())
    this.props.getData();

  }

render(){
  console.log("RENDER");
  return (
      <div className="todo-app">
        <h1>To-do List</h1>
        <AddTodo />
        <TodoList />
        <VisibilityFilters />
      </div>
    );
}
}
// export default function TodoApp() {
  // return (
  //   <div className="todo-app">
  //     <h1>To-do List</h1>
  //     <AddTodo />
  //     <TodoList />
  //     <VisibilityFilters />
  //   </div>
  // );
// }

function mapStateToProps(state){
  console.log("mapStateToProps");
    //take our state living in the store and map it to props that can be acccessed inside a component  form
return {
    todo: state.todo
}
}

// const mapStateToProps = ({}) => {
//     return{}
//   }

function mapDispatchToProps(dispatch){
return bindActionCreators(actions, dispatch)
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoApp))
//it returns a new connected componennt app. It is a component that is connected to redux store.

export default App
