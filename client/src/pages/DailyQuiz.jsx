import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Brain,
    Clock,
    CheckCircle,
    AlertCircle,
    Trophy,
    Zap,
    Target,
    Code,
} from "lucide-react";
import CodeIDE from "../components/CodeIDE";

const API_BASE = "https://coderhub-backend-1.onrender.com/api/dailyquiz";

const DailyQuiz = () => {
    const [userId, setUserId] = useState(null);
    const [quiz, setQuiz] = useState({
        date: new Date().toLocaleDateString(),
        question: {
            id: "1",
            title: "Two Sum",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            starterCode: "function twoSum(nums, target) {\n  // Your code here\n}"
        }
    }); // Placeholder initial state
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showIDE, setShowIDE] = useState(false);
    const [locked, setLocked] = useState(false);

    // Security states
    const [alertMessage, setAlertMessage] = useState("");
    const [cheatingAttempts, setCheatingAttempts] = useState(0);
    const cheatCooldownRef = useRef(false);

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) setUserId(storedId);
    }, []);

    // Security functions (Simplified for brevity, keeping main logic)
    const raiseCheat = (msg) => {
        if (cheatCooldownRef.current) return;
        setAlertMessage(msg);
        setCheatingAttempts((p) => p + 1);
        cheatCooldownRef.current = true;
        setTimeout(() => {
            cheatCooldownRef.current = false;
            setAlertMessage(""); // Clear alert after a while
        }, 2500);
    };

    const setupSecurity = () => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                raiseCheat("⚠️ You switched tabs!");
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        }
    };

    useEffect(() => {
        if (!userId) return; // Uncomment in production to fetch real quiz

        // Mock fetch for development if needed, or keep minimal logic
        // setLoading(true);
        // setTimeout(() => setLoading(false), 1000);
    }, [userId]);

    useEffect(() => {
        if (quiz && !locked) {
            const cleanup = setupSecurity();
            return cleanup;
        }
    }, [quiz, locked]);

    const handleCodeSubmit = async ({ code, output, language, executionTime }) => {
        // Mock submit
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("✅ Code submitted successfully!");
            setShowIDE(false);
            setLocked(true);
        }, 1000);
    };

    if (locked) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center p-10 relative overflow-hidden font-sans">
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(102,126,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,126,234,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-pulse"></div>
                    <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[500px] h-[500px] bg-gradient-to-br from-[#667eea] to-[#764ba2] -top-[10%] -left-[10%]"></div>
                    <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[450px] h-[450px] bg-gradient-to-br from-[#43e97b] to-[#38d167] -bottom-[10%] -right-[10%] [animation-delay:10s]"></div>
                </div>

                <div className="relative z-[2] text-center max-w-[600px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-[60px] animate-scale-in">
                    <div className="w-[100px] h-[100px] mx-auto mb-6 bg-[rgba(67,233,123,0.15)] border-2 border-[rgba(67,233,123,0.3)] rounded-full flex items-center justify-center animate-pulse-slow">
                        <CheckCircle className="w-[50px] h-[50px] text-[#43e97b]" />
                    </div>
                    <h2 className="text-[32px] font-extrabold mb-4 text-white">✅ Quiz Completed!</h2>
                    <p className="text-[16px] text-white/70 leading-[1.7] mb-6">
                        You've already attempted today's quiz. Come back after 24 hours for the next challenge!
                    </p>
                    <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-sm text-white/80">
                        <Clock className="w-[18px] h-[18px] text-[#667eea]" />
                        <span>Next challenge available tomorrow</span>
                    </div>
                </div>
            </div>
        );
    }

    if (showIDE && quiz) {
        return (
            <div className="w-screen h-screen overflow-hidden">
                <CodeIDE
                    initialQuestion={quiz.question}
                    onSubmitCode={handleCodeSubmit}
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center p-10 relative overflow-hidden">
                <div className="text-center animate-fade-in-up">
                    <div className="w-[60px] h-[60px] border-4 border-[rgba(102,126,234,0.2)] border-t-[#667eea] rounded-full animate-spin mx-auto mb-5"></div>
                    <p className="text-lg text-white/80 font-semibold">Loading today's challenge...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center py-10 px-5 relative overflow-hidden font-sans">

            {/* Security Alert */}
            {alertMessage && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a52] text-white py-3 px-5 rounded-lg shadow-[0_4px_15px_rgba(255,107,107,0.4)] z-[10000] flex items-center gap-2.5 font-medium animate-slide-in-down">
                    <AlertCircle className="w-[18px] h-[18px]" />
                    <span>{alertMessage}</span>
                    <span className="text-sm opacity-90">(Attempts: {cheatingAttempts})</span>
                </div>
            )}

            {/* Profile Circle */}
            <Link to="/profile" className="fixed top-5 right-5 w-[52px] h-[52px] z-[1000] group transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-bold text-xl text-white shadow-[0_8px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-[3px] border-white/20 relative group-hover:scale-105 group-hover:shadow-[0_12px_35px_rgba(102,126,234,0.6)] group-hover:border-white/40">
                    <span className="select-none tracking-wide">👤</span>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0f0a1e] shadow-[0_2px_8px_rgba(34,197,94,0.4)] animate-pulse-status"></div>
            </Link>

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(102,126,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,126,234,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-pulse"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[500px] h-[500px] bg-gradient-to-br from-[#667eea] to-[#764ba2] -top-[10%] -left-[10%]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[450px] h-[450px] bg-gradient-to-br from-[#43e97b] to-[#38d167] -bottom-[10%] -right-[10%] [animation-delay:10s]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[400px] h-[400px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] top-1/2 left-1/2 [animation-delay:5s]"></div>
            </div>

            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 top-[15%] left-[10%] animate-float-random-1">
                    <Brain className="w-[30px] h-[30px] text-white/60" />
                </div>
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 top-[25%] right-[15%] animate-float-random-2 [animation-delay:2s]">
                    <Trophy className="w-[30px] h-[30px] text-white/60" />
                </div>
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 bottom-[20%] left-[15%] animate-float-random-1 [animation-delay:4s]">
                    <Target className="w-[30px] h-[30px] text-white/60" />
                </div>
            </div>

            {/* Main Quiz Card */}
            <div className="relative z-[2] max-w-[800px] w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-scale-in">

                {/* Header */}
                <div className="text-center mb-[30px] animate-[fadeInUp_0.8s_ease-out_0.1s_backwards]">
                    <div className="inline-flex items-center gap-2 bg-[rgba(102,126,234,0.15)] border border-[rgba(102,126,234,0.3)] rounded-full px-5 py-2 mb-5">
                        <Zap className="w-[18px] h-[18px] text-[#667eea]" />
                        <span className="text-[13px] text-[#8b9bff] font-bold uppercase tracking-[1.5px]">Daily Challenge</span>
                    </div>
                    <h2 className="text-[36px] font-extrabold mb-4">
                        <span className="bg-gradient-to-br from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">Today's Quiz</span>
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm text-white/80">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.date}</span>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <div className="flex items-center gap-3 bg-[rgba(102,126,234,0.15)] border border-[rgba(102,126,234,0.3)] rounded-xl py-3.5 px-5 mb-[30px] text-[14px] text-[#8b9bff] animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{message}</span>
                    </div>
                )}

                {/* Security Info */}
                <div className="flex items-center gap-2.5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-2.5 px-4 rounded-md mb-6 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Copy, paste, and screenshots are disabled for security</span>
                </div>

                {/* Question Section */}
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.3s_backwards]">
                    <div className="flex items-start gap-3 mb-4">
                        <Brain className="w-7 h-7 text-[#667eea] shrink-0 mt-0.5" />
                        <h3 className="text-[22px] font-bold leading-[1.4] flex-1 text-white">{quiz.question?.title}</h3>
                    </div>
                    {quiz.question?.description && (
                        <p className="text-[16px] text-white/75 leading-[1.7] bg-white/[0.03] p-5 rounded-xl border-l-[3px] border-[#667eea80] mt-4">
                            {quiz.question.description}
                        </p>
                    )}
                </div>

                {/* Solve in IDE Button */}
                <button
                    className="w-full relative overflow-hidden rounded-2xl group border-none p-0 cursor-pointer mb-8 animate-[fadeInUp_0.8s_ease-out_0.4s_backwards] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1 hover:shadow-[0_15px_60px_rgba(102,126,234,0.6)] active:translate-y-0 active:scale-[0.98]"
                    onClick={() => setShowIDE(true)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] z-[1] transition-all duration-400 group-hover:from-[#764ba2] group-hover:to-[#f093fb] group-hover:scale-105"></div>
                    <div className="relative z-[3] flex items-center justify-center gap-3.5 py-[22px] px-10">
                        <Code className="w-7 h-7 text-white" />
                        <span className="text-[20px] font-bold text-white">Solve in IDE</span>
                    </div>
                    <div className="absolute inset-0 z-[2] bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg] animate-shine w-full h-full left-[-150%] pointer-events-none"></div>
                </button>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2.5 pt-6 border-t border-white/10 animate-[fadeInUp_0.8s_ease-out_0.5s_backwards]">
                    <Trophy className="w-5 h-5 text-[#ffd700]" />
                    <p className="text-[14px] text-white/70 font-medium">Solve this challenge to maintain your streak! 🔥</p>
                </div>

            </div>
        </div>
    );
};

export default DailyQuiz;
