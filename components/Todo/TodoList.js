    import classes from './TodoList.module.css';
    const TodoList = ({ todos, onDelete, onComplete }) => {
        console.log("todos: ",todos);
        const incompleteTodos = todos.filter((todo) => !todo.completed);
        console.log(incompleteTodos);
        return (
        <ul className={classes.list}>
            {incompleteTodos.map((todo) => (
            <li key={todo._id} className={classes.item}>
                {todo.text}
                <button className={classes.button} onClick={() => onDelete(todo._id)}>Delete Todo</button>
                <button className={classes.complete} onClick={() => onComplete(todo._id)} >Completed</button>
            </li>
            ))}
        </ul>
        );
    };
    
    export default TodoList;