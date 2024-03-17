import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (response.ok) {
        console.log("User created successfully");
      } else {
        console.log("Something went wrong 1");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong 2");
    }
  }

  if (Auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }


  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="flex justify-center">Sign Up</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create User</button>
      </form>
    </DefaultLayout>
  );
}
