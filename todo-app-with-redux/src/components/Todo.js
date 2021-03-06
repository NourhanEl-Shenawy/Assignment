import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "../redux/actions";
import {deleteTodo} from "../redux/actions";
import { Button } from 'carbon-components-react';

const Todo = ({ todo, toggleTodo}) => (
  <div>
  <div>
  <li className="todo-item" onClick={() => {toggleTodo(todo.content)}}>
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
  <Button size='small' onClick={() => {deleteTodo(todo.content)}}>Remove {todo.content}</Button>
  </div>
  </div>

);

// export default Todo;
export default connect(
  null,
  { toggleTodo }
)(Todo);
