import { useRouter } from 'next/router';
import classes from '../components/Todo/TodoList.module.css';
import { MongoClient } from 'mongodb';
const Completed = ({ todos }) => {
  const router = useRouter();
  const { completed } = router.query;

  const completedTodos = todos.filter((todo) => !!todo.completed);

  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul className={classes.list}>
        {completedTodos.map((todo) => (
          <li key={todo._id} className={classes.item}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
export async function getServerSideProps(context) {
    const client = await MongoClient.connect('mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority');
    const db = client.db();
    const todos = await db.collection('todos').find({}).toArray();
    client.close();
  
    return {
      props: {
        todos: todos.map((todo) => ({
            ...todo,
          _id: todo._id.toString(),
        })),
      },
    };
  }

export default Completed;
