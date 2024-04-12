import { useState } from "react";
import "../style/home.css";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router";
import { setter } from "../tokenSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

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
        if (json?.token) {
          localStorage.setItem("token", json.token);
          dispatch(setter(json.token));
          window.location.href = "/ProfilePage";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (localStorage.getItem("token") == null) {
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
  } else {
    return <Navigate to="/ProfilePage" />;
  }
};
export default Register;
