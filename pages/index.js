import React, { useEffect, useState } from "react";
import TodoList from "../components/Todo/TodoList";
import AddTodo from "../components/Todo/AddTodo";
import {MongoClient} from 'mongodb';

const Home = ({ todos }) => {
  const [todoList, setTodoList] = useState(todos);

  const addTodo = async (todo) => {
    try {
      console.log(todo);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todo, completed: false }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodoList([...todoList, newTodo]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodoList(todoList.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const completeTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
  
      if (response.ok) {
        setTodoList((prevTodoList) => {
          return prevTodoList.filter((todo) => todo._id !== id);
        });
      }
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todoList} onDelete={deleteTodo} onComplete={completeTodo}/>
    </div>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://First:Cnu7997563693@cluster0.fgvz9og.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todos = await db.collection('todos').find({}).toArray();
  return {
    props: { todos: todos.map((todo)=>({
      text: todo.text,
      completed: todo.completed,
      _id: todo._id.toString(),
    })) },
    revalidate: 1,
  };
}

export default Home;
