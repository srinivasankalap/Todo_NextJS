import { useState } from "react";
import classes from './AddTodo.module.css';

const AddTodo = ({ onAdd }) => {
    const [todo, setTodo] = useState('');
  
    const handleAdd = () => {
      if (todo.trim() !== '') {
        onAdd(todo);
        setTodo('');
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new todo"
          className={classes.input}
        />
        <button onClick={handleAdd} className={classes.button}>Add Todo</button>
      </div>
    );
  };
  
  export default AddTodo;
  