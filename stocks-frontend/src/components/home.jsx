import { useState } from "react";
import "../style/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice.jsx";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const token = useSelector((state) => state.token.value);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    login();
  })

  function setSessionExpiration(expirationTimeInMinutes) {
    const currentTime = Date.now();
    const expirationTime = currentTime + expirationTimeInMinutes * 60 * 1000; // Convert minutes to milliseconds
    localStorage.setItem("sessionExpiration", expirationTime.toString());
  }

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    //post with fetch api
    fetch("/api/Login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //if we recieve a token. Update it

        if (json?.token) {
          dispatch(setter(json.token));
        }
        localStorage.setItem("token", json.token);
        setSessionExpiration(60);
        window.location.href = "/ProfilePage"; 
      })
      .catch((err) => {
        localStorage.removeItem('token')
        localStorage.removeItem('sessionExpiration')
        console.error(err);
      });
  };

 


  const login = async () => {

    const payload = {
      username: username,
      password: password,
    };
    //post with fetch api
    fetch("/api/Login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //if we recieve a token. Update it

        if (json?.token) {
          dispatch(setter(json.token));
        }
        localStorage.setItem("token", json.token);
        console.log(json.token);
        setSessionExpiration(60);
        window.location.href = "/ProfilePage"; 
      })
      .catch((err) => {
        localStorage.removeItem('token')
        localStorage.removeItem('sessionExpiration')
        console.error(err);
      });
  };

 

  return (
    <form className="login" onSubmit={(e)=>submit(e)}>
      <h1>please login in</h1>
      <div className="inputs">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign In</button>
      <p>don't have a account?</p>
      <button>
        <Link to="/Register">Register</Link>
      </button>
    </form>
  );
}

export default Home;
