import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "src/types/types";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("")
  const Auth = useAuth();
  const goTo = useNavigate();

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

      const json = (await response.json()) as AuthResponseError;

      if (response.ok) {
        console.log("User created successfully");
        goTo( "/" );
      } else {
        setErrorResponse(json.body.error || "Error desconocido");
        console.log("json:", json);
        return 
      }
    } catch (error) {
      console.log(error);
      alert("Fetch went wrong");
    }
  }

  if (Auth.isAuthenticated) {
    goTo( "/dashboard" );

    return <Navigate to="/dashboard" />;
  }


  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="flex justify-center">Sign Up</h1>
        { errorResponse && <div className="errorMessage">{errorResponse}</div> }

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
