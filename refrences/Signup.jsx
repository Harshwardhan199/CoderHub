import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role_description: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("📩 Sending signup request with:", form);

      const response = await axios.post(
        "https://coderhub-backend-1.onrender.com/api/auth/signup",
        form
      );

      console.log("✅ Signup response:", response);

      if (response.status === 201 || response.data.success) {
        const user = response.data.user || response.data;

        // Support multiple backend response formats (id, user_id, uid)
        const userId =
          user?.id || user?.user_id || user?.uid || user?.ID || null;

        if (userId) {
          localStorage.setItem("userId", userId);
          localStorage.setItem("userEmail", user?.email || form.email);
          console.log("✅ Stored userId in localStorage:", userId);
        } else {
          console.warn(
            "⚠️ No userId found in signup response. Please check backend return data.",
            user
          );
        }

        alert("🎉 Account created successfully! Please login to continue.");
        navigate("/signin");
      } else {
        alert(response.data.message || "Something went wrong during signup.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert(
        error.response?.data?.message ||
        "Server error. Please try again later."
      );
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
          <h1 className="signup-title">Start Your Journey</h1>
          <p className="signup-subtitle">Join thousands learning to code</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="John Doe"
              value={form.full_name}
              onChange={handleChange}
              onFocus={() => setFocusedField("full_name")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${focusedField === "full_name" ? "focused" : ""
                }`}
              required
            />
          </div>

          {/* Role Description */}
          <div className="form-group">
            <label className="form-label">What Describes You Best</label>
            <input
              type="text"
              name="role_description"
              placeholder="Student, Developer, Hobbyist, Professor"
              value={form.role_description}
              onChange={handleChange}
              onFocus={() => setFocusedField("role_description")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${focusedField === "role_description" ? "focused" : ""
                }`}
              required
            />
          </div>

          {/* Email */}
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

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+91 9876543210"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField("")}
              className={`form-input ${focusedField === "phone" ? "focused" : ""
                }`}
              required
              pattern="^((\+91)?[\s-]?)?[6-9]\d{9}$"
              title="Enter a valid Indian phone number"
            />
          </div>

          {/* Password */}
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
              minLength="6"
              title="Password must be at least 6 characters long"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="signup-footer">
          Already have an account?{" "}
          <Link to="/signin" className="signin-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
