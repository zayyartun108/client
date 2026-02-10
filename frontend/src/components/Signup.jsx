import "../style/Signup.css"
import api from "../api"
import React, { useState } from "react";
import Navbar from "./Navbar"
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate(); 
    const [form, setForm] = useState({ username: "", email: "", password: "",first_name:"",last_name:"" })

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("register/", form);
            alert("Register Successfully")
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            navigate("/login");
        } catch (err) {
            console.log(err)
            console.log(err.response?.data || err.message);
            alert("Unsuccess")
        }

    }




    return (
        <div>
            <Navbar />
            <div className="signup-container section-container">
                <form className="signup-box" onSubmit={submit} >
                    <h2 className="signup-title">Create Account</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        required
                        className="signup-input"

                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={e => setForm({ ...form, first_name: e.target.value })}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={e => setForm({ ...form, last_name: e.target.value })}
                        required
                        className="signup-input"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}

                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        className="signup-input"
                    />

                    <input
                        type="password"
                        value={form.password}
                        placeholder="Password"

                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                        className="signup-input"
                    />



                    <button className="signup-btn" type="submit">Sign Up</button>

                    <p className="signup-text">
                        Already have an account? <span>Login</span>
                    </p>
                </form>
            </div>
        </div>

    );
}

export default Signup;
