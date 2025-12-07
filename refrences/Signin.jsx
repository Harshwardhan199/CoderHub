import React, { useState } from "react";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("📩 Sending login request with:", form);

      const res = await axios.post(
        "https://coderhub-backend-1.onrender.com/api/auth/login",
        form
      );

      console.log("✅ Login response:", res);

      if (res.status === 200 && res.data) {
        const user = res.data.user || res.data;
        const userId =
          user?.id || user?.user_id || user?.uid || user?.ID || null;

        if (userId) {
          localStorage.setItem("userId", userId);
          localStorage.setItem("userEmail", user?.email || form.email);
          console.log("✅ Stored userId in localStorage:", userId);
        } else {
          console.warn("⚠️ Login response missing id:", res.data);
          alert("Login successful, but user ID not returned. Please check backend response.");
        }

        alert("🎉 Login successful!");
        navigate("/home");
      } else {
        alert(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);

      if (error.response && error.response.status === 401) {
        alert("Invalid email or password!");
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Server error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const codeSnippets = [
    "function learn() { return 'code'; }",
    "const skills = [...new Set(learnings)];",
    "while(learning) { grow(); }",
    "if(practice) { master(); }",
    "async function succeed() { await learn(); }",
  ];

  return (
    <div className="signup-container">
      {/* Animated Background */}
      <div className="background-animation">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="floating-code"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-icon">{'</>'}</div>
          <h1 className="signup-title">Welcome Back</h1>
          <p className="signup-subtitle">Let's start learning</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${focusedField === "email" ? "focused" : ""
                }`}
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$"
              title="Enter a valid email like example@gmail.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${focusedField === "password" ? "focused" : ""
                }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="signup-footer">
          New to Coderhub?{" "}
          <Link to="/signup" className="signin-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
