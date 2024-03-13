import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DefaultLayout>
      <form
        action=""
        className="form"
      >
        <h1 className="flex justify-center">Sign Up</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          title="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="button">Create User</button>
      </form>
    </DefaultLayout>
  );
}
