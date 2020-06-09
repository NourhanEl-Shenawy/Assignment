import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { VISIBILITY_FILTERS } from "../constants";

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
        console.log(`IDS: ${todo.id}`);
        console.log(index);
        console.log(todo);
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);

const mapStateToProps = state => {
  console.log("mapStateToProps");
  const { visibilityFilter } = state;
  console.log(state);

  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  console.log("getTodosByVisibilityFilter");
  console.log(todos);
  return { todos };
};
// export default TodoList;
export default connect(mapStateToProps)(TodoList);
