import { useState } from "react";
import "../style/start.css"
import { Navigate, useNavigate } from "react-router";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  if (localStorage.getItem("token") != null) {
    navigate("/ProfilePage", { replace: true });
  }

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
    fetch("https://stocks-latest.onrender.com/api/Login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //if we recieve a token. Update it
        localStorage.setItem("token", json.token);
        setSessionExpiration(60);
        navigate("/ProfilePage", { replace: true });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("sessionExpiration");
        setError(true);
        console.error(err);
      });
  };
 
  return (
    <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={e => {submit(e)}}>
        <input type="text" name="username" placeholder="Username" required  onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" name="password" placeholder="Password" required  onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Login" />
    </form>
    <div className="register-link">
        Don't have an account? <a href="/Register">Register</a>
        {error == true && <p>Error with credentials please try again</p>}
    </div>
   
</div>
  );
}

export default Home;
