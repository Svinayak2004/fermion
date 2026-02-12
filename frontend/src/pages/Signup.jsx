import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("user created");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "signup failed");
    }
  };

  return (
    <div>
      <h2>signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" onChange={(e) => setForm({...form, name: e.target.value})} />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">signup</button>
      </form>
    </div>
  );
}


export default Signup
