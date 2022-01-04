import React from "react";
import "./Todo.css";

class Todo extends React.Component {
    render() {
        const { description, completed } = this.props.todo;
        return <div className={completed ? 'completed' : ''}>{description}</div>
    }
}

export default Todo;