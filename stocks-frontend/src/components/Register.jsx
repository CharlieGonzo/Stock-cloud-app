import { useState } from "react";
import "../style/register.css";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router";
import { setter } from "../tokenSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputerror, setInputError] = useState(false);
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);

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
      .then((response) => {
        if (!response.ok) {
          if (response.status == "422") {
            setInputError(true);
          } else {
            setError(true);
          }
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        localStorage.setItem("token", json.token);
        window.location.href = "/ProfilePage";
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
              placeholder="need to be over 6 characters long"
            />

            <label htmlFor="password">Enter password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="need to be over 6 characters long"
            />

            <button type="submit">Register</button>

            <button
              type="button"
              onClick={(e) => {
                window.location.href = "/";
              }}
            >
              return to login page
            </button>
          </div>
        </div>
      </form>
      {inputerror && <h2>input is invalid</h2>}
      {error && <h2>Server error.Try again later</h2>}
    </div>
  );
};

export default Register;
