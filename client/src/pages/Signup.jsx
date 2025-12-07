import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from "../context/AuthContext";
import { Code, MapPin, User, Mail, Phone, Lock, Briefcase } from 'lucide-react';

function Signup() {
    const navigate = useNavigate();
    const { signup, googleLogin } = useAuth();

    const [form, setForm] = useState({
        name: "",
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
            await signup(form);
            alert("🎉 Account created successfully!");
            navigate("/home");
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

    const googleSignIn = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                await googleLogin(credentialResponse);
                navigate("/home");
            } catch (error) {
                console.error("Google Login Error", error);
                alert("Google Login Failed");
            }
        },
        onError: () => console.log("Login Failed"),
    });

    const codeSnippets = [
        "function learn() { return 'code'; }",
        "const skills = [...new Set(learnings)];",
        "while(learning) { grow(); }",
        "if(practice) { master(); }",
        "async function succeed() { await learn(); }",
    ];

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center relative overflow-hidden m-0 p-0">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
                {codeSnippets.map((snippet, i) => (
                    <div
                        key={i}
                        className="absolute text-sm text-[#00ff88] font-mono animate-float-signup"
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
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 md:p-10 w-[90%] max-w-[450px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/10 relative z-10 animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl mb-5 shadow-[0_10px_30px_rgba(102,126,234,0.4)] text-white font-bold text-3xl">
                        <Code size={36} />
                    </div>
                    <h1 className="m-0 mb-2.5 text-3xl font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Start Your Journey</h1>
                    <p className="m-0 text-white/70 text-base">Join thousands learning to code</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="relative">
                        <label className="block mb-2 text-white/90 text-sm font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField("")}
                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border-2 text-base bg-white/5 text-white outline-none transition-all duration-300 box-border ${focusedField === "name" ? "border-[#667eea] shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" : "border-white/10"
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* Role Description */}
                    <div className="relative">
                        <label className="block mb-2 text-white/90 text-sm font-medium">What Describes You Best</label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="text"
                                name="role_description"
                                placeholder="Student, Developer, Hobbyist"
                                value={form.role_description}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("role_description")}
                                onBlur={() => setFocusedField("")}
                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border-2 text-base bg-white/5 text-white outline-none transition-all duration-300 box-border ${focusedField === "role_description" ? "border-[#667eea] shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" : "border-white/10"
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block mb-2 text-white/90 text-sm font-medium">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField("")}
                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border-2 text-base bg-white/5 text-white outline-none transition-all duration-300 box-border ${focusedField === "email" ? "border-[#667eea] shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" : "border-white/10"
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <label className="block mb-2 text-white/90 text-sm font-medium">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="text"
                                name="phone"
                                placeholder="+91 9876543210"
                                value={form.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("phone")}
                                onBlur={() => setFocusedField("")}
                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border-2 text-base bg-white/5 text-white outline-none transition-all duration-300 box-border ${focusedField === "phone" ? "border-[#667eea] shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" : "border-white/10"
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block mb-2 text-white/90 text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField("")}
                                className={`w-full py-3.5 pl-12 pr-4 rounded-xl border-2 text-base bg-white/5 text-white outline-none transition-all duration-300 box-border ${focusedField === "password" ? "border-[#667eea] shadow-[0_0_0_4px_rgba(102,126,234,0.1)]" : "border-white/10"
                                    }`}
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    {/* Custom Full-Width Google Button */}
                    <div className="flex justify-center w-full my-2.5">
                        <button
                            type="button"
                            onClick={() => googleSignIn()}
                            className="w-full bg-white text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-2.5 p-4 text-base font-semibold rounded-xl border-none cursor-pointer bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white transition-all duration-300 shadow-[0_10px_30px_rgba(102,126,234,0.3)] hover:transform hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(102,126,234,0.4)] disabled:cursor-not-allowed disabled:opacity-70`}
                    >
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-7 text-center text-white/60 text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-[#667eea] no-underline font-semibold transition-colors duration-300 hover:text-[#764ba2]">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
