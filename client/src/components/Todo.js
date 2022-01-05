import React from "react";
import "./Todo.css";
import { FaTrashAlt } from "react-icons/fa";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isEditing: false, newValue: props.todo.description, isHovering: false};
    }

    onClick() {
        this.setState({isEditing: !this.state.isEditing});
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            const { newValue } = this.state;
            this.setState({isEditing: false});

            if (this.props.todo.description !== newValue) {
                this.props.onSubmit({...this.props.todo, description: newValue});
            }
        }
    }

    handleCheckboxChange(e) {
        this.props.onClick({...this.props.todo, completed: !this.props.todo.completed});
    }

    handleChange(event) {
        this.setState({newValue: event.target.value});
    }

    handleMouseHover() {
        this.setState({isHovering: true});
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    handleDelete() {
        this.props.onDelete(this.props.todo)
    }

    render() {
        const { description, completed } = this.props.todo;

        return ( this.state.isEditing
            ? <input
                  type="text"
                  autoFocus
                  onKeyPress={(e) => this.onKeyUp(e)}
                  value={this.state.newValue}
                  onChange={(e) => this.handleChange(e)}
              />
            : <div onMouseEnter={() => this.handleMouseHover()} onMouseLeave={() => this.handleMouseLeave()}>
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => this.handleCheckboxChange(e)}
                />
                <span onClick={() => this.onClick()} className={completed ? 'completed' : ''}>{description}</span>
                { this.state.isHovering && <FaTrashAlt onClick={() => this.handleDelete()}className="delete-button"/> }
            </div>
        );
    }
}

export default Todo;