import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const todoRef = useRef();
  const [todos, setToDos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setToDos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] // good coding practice! Don't modify the original state variable with a function other than the one defined in the state ('setTodos') in this case
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setToDos(newTodos)
  }

  function handleAddTodo(){
    const name = todoRef.current.value;
    if (name === ''){
      return;
    }
    setToDos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, completed:false}]
    })
    todoRef.current.value = null;
  }

  function removeCompleted(){
    const updatedTodos = todos.filter(todo => !todo.completed)
    setToDos(updatedTodos)
  }

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={removeCompleted}>Remove Completed</button>
      <div>{todos.filter(todo => todo.completed).length} Todos Completed</div>
    </div>
  );
}

export default App;
