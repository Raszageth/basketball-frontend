import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import "../../styles.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 201 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        setError("An error occured, please try again");
      }
    }
  };

  return (
    <div className="login-container app-background">
      <h1>Basketball Tournament Login</h1>
      <img src="/images/shilouete.png" alt="Basketball" />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
