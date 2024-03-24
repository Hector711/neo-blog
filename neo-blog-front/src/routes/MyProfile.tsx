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
  console.log(todos);

  useEffect(() => {
    loadTodos();
  }, []);

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
        //mostrar error de conexion
      }
      // const data = await response.json();
      // setTodos(data);
    } catch (error) {}
  }

  const auth = useAuth();
  return (
    <DefaultLayout>
      <h1>{auth.getUser()?.name || ""}'s Neo Profile</h1>

      <div id="todos-dash">
        {todos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </DefaultLayout>
  );
}
