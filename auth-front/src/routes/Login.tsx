import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Auth = useAuth()

  if(Auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <DefaultLayout>
      <form
        action=""
        className="form"
      >
        <h1 className="flex justify-center">Log In</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          title="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          title="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button">Log In</button>
      </form>
    </DefaultLayout>
  );
}
