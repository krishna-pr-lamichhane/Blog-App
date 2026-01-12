import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password
      });

      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Register</h1>

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
        className="bg-green-500 text-white px-4 py-2"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}
