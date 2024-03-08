import { useState } from "react";
import "../style/home.css";
import { json } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    console.log("here");

    const payload = {
      username: username,
      password: password,
    };
    //post with fetch api
    fetch("/api/Register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <div className="login">
          <h1>Register here</h1>
          <div className="inputs">
            <label htmlFor="username">Enter username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
            />
            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
            />
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
