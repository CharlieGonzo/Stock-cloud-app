import { useState } from "react";
import "../style/home.css";
import { useSelector,useDispatch } from "react-redux";
import Home from "./Home";import { Navigate } from "react-router";
import { setter } from "../tokenSlice";

const Register = () => {
  const token = useSelector((state) => state.token.value)
  const dispatch = useDispatch();
  console.log('token: ' + token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[getToken,setToken] = useState('');

  
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
        if(json?.token){
          dispatch(setter(json.token))
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };


  if(token == ''){
    return  (

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
    )


  }else{

    return <Navigate to="/"/>

  }
}
export default Register;
