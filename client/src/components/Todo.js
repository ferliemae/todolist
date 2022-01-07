import React, { Fragment, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FcLowPriority, FcHighPriority, FcMediumPriority } from 'react-icons/fc';
import { Menu, MenuItem } from '@mui/material';

import useDeleteTodo from '../hooks/todos/useDeleteTodo';
import useUpdateTodo from '../hooks/todos/useUpdateTodo';
import './Todo.css';

function Todo(props) {
    const { todo } = props;
    const { deleteTodo } = useDeleteTodo();
    const { updateTodo } = useUpdateTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [newValue, setNewValue] = useState(todo.description);

    function onClick() {
        setIsEditing(!isEditing);
    }

    function onKeyUp(event) {
        if (event.charCode === 13) {
            setIsEditing(false);

            if (props.todo.description !== newValue) {
                updating({...props.todo, description: newValue});
            }
        }
    }

    function handleCheckboxChange(e) {
        updating({...props.todo, completed: !props.todo.completed});
    }

    function handleChange(event) {
        setNewValue(event.target.value)
    }

    function handleMouseHover() {
        setIsHovering(true);
    }

    function handleMouseLeave() {
        setIsHovering(false)
    }

    async function deleting() {
        deleteTodo(todo._id)
    }

    async function updating(newTodo) {
        updateTodo({
            todo_id: todo._id,
            data: {
                description: newTodo.description,
                priority: newTodo.priority,
                completed: newTodo.completed
            }
        });
    }

    function handleDelete() {
        deleting();
    }

    function handleShowMenu(e) {
        setIsOpen(true);
        setAnchorEl(e.currentTarget);
    }

    function handleCloseMenu() {
        setIsOpen(false);
        setAnchorEl(null);
    }

    function handleSelectMenuItem(priority) {
        handleCloseMenu();
        updating({...props.todo, priority: priority});
    }

    function getPriorityIcon(priority) {
        switch (priority) {
            case 3:
                return <FcHighPriority className="priority-icon" onClick={handleShowMenu}/>
            case 2:
                return <FcMediumPriority className="priority-icon" onClick={handleShowMenu} />
            default:
                return <FcLowPriority className="priority-icon" onClick={handleShowMenu} />
        }
    }

    function getClassName(todo) {
        let classname = todo.completed ? 'completed' : '';

        switch (todo.priority) {
            case 3:
                return classname + ' high';
            case 2:
                return classname + ' medium';
            default:
                return classname + ' low';
        }
    }
    const textColor = getClassName(props.todo);

    return ( isEditing ?
        <input
            type="text"
            autoFocus
            value={newValue}
            onChange={handleChange}
            onKeyPress={onKeyUp}
        /> :
        <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
            <input
                name="isGoing"
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckboxChange}
            />
            <span onClick={onClick} className={textColor}>{todo.description}</span>
            { isHovering &&
                <Fragment>
                    { getPriorityIcon(todo.priority) }
                    <FaTrashAlt onClick={handleDelete}className="delete-button"/>
                </Fragment>
            }
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleCloseMenu}
            >
                <MenuItem className="menu-item" onClick={() => handleSelectMenuItem(1)}>
                    <FcLowPriority/><span>Low</span>
                </MenuItem>
                <MenuItem className="menu-item" onClick={() => handleSelectMenuItem(2)}>
                    <FcMediumPriority/><span>Medium</span>
                </MenuItem>
                <MenuItem className="menu-item" onClick={() =>  handleSelectMenuItem(3)}>
                    <FcHighPriority/><span>High</span>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Todo;