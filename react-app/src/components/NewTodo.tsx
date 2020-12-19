import React, { useRef } from 'react';

import './NewTodo.css';

// interfaceでもtypeでもいい
type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (textInputRef.current) {
      const enterdText = textInputRef.current.value;
      props.onAddTodo(enterdText);
    }
  };
  return <form onSubmit={todoSubmitHandler}>
    <div className="form-control">
      <label htmlFor="todo-text">Todo内容</label>
      <input type="text" id="todo-text" ref={textInputRef} />
    </div>
    <button type="submit">TODO追加</button>
  </form>;
}

export default NewTodo;