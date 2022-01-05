import React from "react";
import "./Todo.css";

class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCreating: false, todo: ''};
    }

    onClick() {
        this.setState({isCreating: !this.state.isCreating});
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            const { todo } = this.state;
            this.setState({todo: '', isCreating: false});
            this.props.onSubmit({description: todo, completed: false});
        }
    }

    handleChange(event) {
        this.setState({todo: event.target.value});
    }

    render() {
        return ( this.state.isCreating
            ? <input
                autoFocus
                type="text"
                value={this.state.todo}
                onKeyPress={(e) => this.onKeyUp(e)}
                onChange={(e) => this.handleChange(e)}
              />
            : <div onClick={() => this.onClick()}>+</div>
        );
    }
}

export default CreateTodo;