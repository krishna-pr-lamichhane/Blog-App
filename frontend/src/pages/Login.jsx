import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        className="border p-2 block mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
