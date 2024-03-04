import { useState } from "react";
import "../style/home.css";
import axios from "axios";
function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.get("http::lcalhost:8080/api/test/anon");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
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
      <button onClick={login}>Sign In</button>
    </div>
  );
}

export default Home;
