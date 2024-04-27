import { useState } from "react";
import "../style/home.css";
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

  const submit = async () => {
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
    <div className="login">
      <h1>Stock-Cloud</h1>
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
      <button onClick={submit}>Sign In</button>
      <p>don't have a account?</p>
      <button
        onClick={() => {
          navigate("/Register", { replace: true });
        }}
      >
        Register
      </button>
      {error && (
        <h4 className="error">Wrong login credentials. Please try again</h4>
      )}{" "}
    </div>
  );
}

export default Home;
