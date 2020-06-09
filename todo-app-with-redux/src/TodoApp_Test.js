import "./styles.scss";
import {Button} from "carbon-components-react";
import React, {Component} from 'react'

class TodoApp extends Component {
    constructor(){
      console.log("CONSTRUCTOR");
      super();
    }
    render(){

        console.log("RENDER NEWWWW");
        return (
            <Button kind='danger'>Button</Button>
          );
      }

}

export default TodoApp
