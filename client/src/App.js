import React from "react";
import "./App.css";
import Todo from './components/Todo';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
        <TodoList />
        <CreateTodo />
      </header>
    </div>
    </QueryClientProvider>
  );
}

export default App;