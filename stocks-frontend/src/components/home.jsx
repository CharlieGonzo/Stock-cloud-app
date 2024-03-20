import { useState } from "react";
import "../style/home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setter} from "../tokenSlice.jsx";
import { Link} from "react-router-dom"


function Home() {
  const token = useSelector((state) => state.token.value);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  
  const getInfo = async (e) =>{
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }

    fetch("/api/user-info", {
      method: "GET",
      headers: headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  
  const login = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };
    //post with fetch api
    fetch("/api/Login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        //if we recieve a token. Update it
       
        if (json?.token) {
          dispatch(setter(json.token));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form className="login" onSubmit={login}>
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
      <button><Link to="/Register" >Register</Link></button>
      <button type="button" onClick={getInfo}>show info</button>
    </form>
   
  );
}

export default Home;
