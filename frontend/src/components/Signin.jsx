import api from "../api";
import "../style/Signin.css"
import Navbar from "./Navbar"
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Signin() {
  const [form, setForm] = useState({ username: "", password: "" })
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("login/", form);
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)

      localStorage.setItem("is_staff", res.data.user.is_staff);

      alert("login successfully")
      navigate("/profile")
    } catch (err) {
      console.log(err)
    }

  }

  return (

    <div>
      <Navbar />
      <div className="signin-container section-container">
        <form className="signin-box" onSubmit={submit}>
          <h2 className="signin-title">Sign In</h2>

          <input
            type="text"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
            className="signin-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}

            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            className="signin-input"
          />

          <div className="signin-options">
            
            <span className="forgot">Forgot password?</span>
          </div>

          <button className="signin-btn" type="submit">Login</button>

        
        </form>
      </div>
    </div>

  );
}

export default Signin;
