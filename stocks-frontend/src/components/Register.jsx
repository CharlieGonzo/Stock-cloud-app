import { useState } from "react";
import "../style/home.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="login">
        <h1>Register here</h1>
        <div className="inputs">
          <label htmlFor="firstName">Enter first name</label>
          <input type="text" name="first name" id="firstName" />
          <label htmlFor="lastName">Enter last name</label>
          <input type="text" name="last name" id="lastName" />
          <label htmlFor="username">Enter username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Enter password</label>
          <input type="text" name="password" id="password" />
        </div>
        <button>Register</button>
      </div>
    </div>
  );
};

export default Register;
