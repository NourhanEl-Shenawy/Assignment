import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";
import { Button } from 'carbon-components-react';
import {FormGroup, TextInput} from 'carbon-components-react';
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
    this.props.addTodo(this.state.input);
    this.setState({
      input: ''
    }); //Item name itself
  // window.location.reload(true);
  //  this.setState({ input: "" });
  };

  render() {
    return (
      <div>
<FormGroup>
      <TextInput
        id="mainInput"
        style={{ width: "400px" }}
        invalidText="A valid value is required"
        placeholder="Please enter your todo-item here"
        onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
      /><Button size='small' className="add-todo" onClick={this.handleAddTodo}>Add Todo</Button>
      {/* <input type="text" value =" Here The Location"/><Button>Click</Button> */}
    </FormGroup>
  
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodo);
// export default AddTodo;
