import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";
import { Button } from 'carbon-components-react';
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    console.log("HandleAddTodo");
    console.log(this.state);
    this.props.addTodo(this.state.input); //Item name itself
   window.location.reload(true);
  //  this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <Button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodo);
// export default AddTodo;
