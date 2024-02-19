import React from 'react'

export default function Todo({todo, toggleTodo}) {
    console.log(todo.id);
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.completed} onChange={handleTodoClick} />
            {todo.name}
        </label>
        </div>
  )
}
