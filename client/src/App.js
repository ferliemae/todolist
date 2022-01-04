import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todo from './components/Todo';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        { data && data.map((todo, index) => {
            return <Todo todo={todo} key={index}/>
        })}
      </header>
    </div>
  );
}

export default App;