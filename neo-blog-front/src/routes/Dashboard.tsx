import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import DefaultLayout from "../layout/DefaultLayout";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  // console.log(todos);

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
      if (!title.trim()) {
        alert("El título no puede estar vacío");
        return;
      }
    createTodo();
  }
  
  async function createTodo(){
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Contentn-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          title,
        })
      });

      if (response.ok) {
        const json = await response.json();
        setTodos([json, ...todos]);
      } else {
        throw new Error("No se reciben los todos");
      }
    } catch (error) {}
  }

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          "Contentn-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      } else {
        throw new Error("No se reciben los todos");
      }
      // const data = await response.json();
      // setTodos(data);
    } catch (error) {}
  }

  const auth = useAuth();
  return (
    <DefaultLayout>
      <h1>{auth.getUser()?.name || ""}'s Neo Profile</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nuevo todo..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </form>
      <div id="todos-dash">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </DefaultLayout>
  );
}
