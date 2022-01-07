import React from 'react';
import Todo from './Todo';
import useGetTodos from '../hooks/todos/useGetTodos';

function TodoList() {
    const { data, status } = useGetTodos({});
    return (
        <div className="todos-wrapper">
            { status === 'success' && data.map((todo, index) => {
                return <Todo
                    todo={todo}
                    key={index}
                />
            })}
        </div>
    );
}

export default TodoList;