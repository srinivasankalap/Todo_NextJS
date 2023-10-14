import classes from './TodoList.module.css';
const TodoList = ({ todos, onDelete }) => {
    return (
      <ul className={classes.list}>
        {todos.map((todo, index) => (
          <li key={index} className={classes.item}>
            {todo}
            <button className={classes.button} onClick={() => onDelete(index)}>Delete Todo</button>
            <button className={classes.complete} >Completed</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;