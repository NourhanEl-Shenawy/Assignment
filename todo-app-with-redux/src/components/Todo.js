import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "../redux/actions";
import {deleteTodo} from "../redux/actions";

const Todo = ({ todo, toggleTodo}) => (
  <div>
  <div>
  <li className="todo-item" onClick={() => {toggleTodo(todo.content);window.location.reload(true);}}>
    {todo && todo.completed ? "👌" : "👋"}{" "}
    <span
      className={cx(
        "todo-item__text",
        todo && todo.completed && "todo-item__text--completed"
      )}
    >
      {todo.content}
    </span>
  </li>
  </div>
  <div>
  <button onClick={() => {deleteTodo(todo.content);window.location.reload(true);}}>Remove {todo.content}</button>
  </div>
  </div>

);

// export default Todo;
export default connect(
  null,
  { toggleTodo }
)(Todo);
