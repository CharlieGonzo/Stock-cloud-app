import { useState } from "react";

import "../style/start.css"
import { Navigate, useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputerror, setInputError] = useState(false);
  const [error, setError] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };
    //post with fetch api
    fetch("https://stocks-latest.onrender.com/api/Register", {
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
        navigate("/ProfilePage", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="login-container">
    <h2>Register</h2>
    <form onSubmit={(e) => {signUp(e)}}>
        <input type="text" name="username" placeholder="Username" required  onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" name="password" placeholder="Password" required  onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Register" />
    </form>
    <div className="register-link">
         have an account? <a href="/">Login</a>
         {error == true && <p>error with server</p>}
        {inputerror == true && <p>Error with credentials please try again</p>}
    </div>
   
</div>
  );
};

export default Register;
