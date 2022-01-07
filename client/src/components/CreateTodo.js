import React, { useState } from 'react';
import useCreateTodo from '../hooks/todos/useCreateTodo';
import './Todo.css';

function CreateTodo() {
    const [isCreating, setIsCreating] = useState(false);
    const [todo, setTodo] = useState('');
    const { createTodo } = useCreateTodo();

    function onClick() {
        setIsCreating(!isCreating);
    }

    function onKeyUp(event) {
        if (event.charCode === 13) {
            setTodo('');
            setIsCreating(false);
            createTodo({description: todo, priority: 1, completed: false});
        }
    }

    function handleChange(event) {
        setTodo(event.target.value);
    }

    return ( isCreating ?
        <input
            autoFocus
            type="text"
            value={todo}
            onKeyPress={onKeyUp}
            onChange={handleChange}
        /> :
        <div onClick={onClick}>+</div>
    );
}

export default CreateTodo;