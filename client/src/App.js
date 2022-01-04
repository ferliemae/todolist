import React from "react";
import "./App.css";
import Todo from './components/Todo';
import CreateTodo from "./components/CreateTodo";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getTodos();
  }, []);

  function handleUpdateTodoStatus(todo) {
    fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify({completed: todo.completed, description: todo.description}),
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
    })
      .then(res => {
        getTodos();
      })
  }

  function handleCreateTodo(todo) {
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({completed: todo.completed, description: todo.description}),
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
    })
      .then(res => {
        getTodos();
      })
  }
  function getTodos() {
    fetch("/api/todos")
    .then((res) => res.json())
    .then((data) => setData(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="todos-wrapper">
          { data && data.map((todo, index) => {
            return <Todo todo={todo} key={index} onClick={handleUpdateTodoStatus} onSubmit={handleUpdateTodoStatus}/>
          })}
        </div>
        <CreateTodo onSubmit={handleCreateTodo}/>
      </header>
    </div>
  );
}

export default App;