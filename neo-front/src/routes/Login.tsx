import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";
// import { AuthResponseError } from "src/types/types"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("")
  
  const Auth = useAuth()
  const goTo = useNavigate()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (response.ok) {
        console.log("Log in successfully");
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
    return <Navigate to="/dashboard" />;
  }

  if(Auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <DefaultLayout>
      <form
        action=""
        className="form"
        onSubmit={handleSubmit}
      >
        <h1 className="flex justify-center">Log In</h1>
        { errorResponse && <div className="errorResponse">{errorResponse}</div>}
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      <Link to="/signup">Sign Up</Link>

    </DefaultLayout>
  );
}



