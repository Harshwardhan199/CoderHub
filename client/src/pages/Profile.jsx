import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User as UserIcon, Mail, Phone, Info, LogOut, CheckCircle, BarChart2, Layers, Grid, Code, ArrowLeft } from "lucide-react";

function Profile() {
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");

    const languageTotals = {
        Python: 250,
        Java: 200,
        "C++": 150,
        C: 100,
        "C#": 80,
        JavaScript: 120,
        Dart: 60,
    };

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signin");
        }
    }, [user, loading, navigate]);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            logout();
            navigate("/");
        }
    };

    if (loading || !user) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#2d1b4e] gap-5">
                <div className="w-[50px] h-[50px] border-4 border-[rgba(99,102,241,0.1)] border-t-[#6366f1] rounded-full animate-spin"></div>
                <p className="text-white/80 text-base font-medium">Loading your profile...</p>
            </div>
        );
    }

    // Parse progress data
    // Assuming user.progress is { "Python": { percentComplete: 50 }, ... } 
    // or similar structure based on how we save it. 
    // Adapting to current mock structure or transforming it.

    // For now, let's assuming user.progress keys are language names or IDs mapping to names.
    // If user.progress is empty, we fall back to empty array.

    let processedLanguages = [];
    if (user.progress) {
        processedLanguages = Object.keys(user.progress).map(langName => {
            const prog = user.progress[langName];
            const total = languageTotals[langName] || 100; // Default total if not in map
            const percent = prog.percentComplete || 0;
            const solved = Math.round((percent / 100) * total);

            return {
                name: langName,
                solved: solved,
                total: total,
                percent: percent
            };
        });
    }

    // Fallback if no progress found but we want to show something (or just show empty state handled below)
    // If backend progress is empty, processedLanguages is []

    const totalSolved = processedLanguages.reduce((acc, lang) => acc + lang.solved, 0);
    const totalProblems = Object.values(languageTotals).reduce((a, b) => a + b, 0); // Total of all known languages
    // Or simpler: total of started languages? The original code summed totals of user languages.
    // user.languages was used.

    // Let's stick to user languages totals for the "Progress" bar, but for overall progress maybe all supported?
    // The original code:
    // const totalProblems = user.languages.reduce...
    // So it only counted languages the user has started/is tracking.

    const relevantTotalProblems = processedLanguages.reduce((acc, lang) => acc + (languageTotals[lang.name] || lang.total), 0);

    const overallProgress = relevantTotalProblems > 0
        ? Math.round((totalSolved / relevantTotalProblems) * 100)
        : 0;


    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#2d1b4e] text-white py-10 px-5 relative overflow-hidden font-sans">

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse-slow"></div>
                <div className="absolute rounded-full blur-[140px] opacity-15 animate-float w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.4),transparent)] -top-[10%] -left-[15%]"></div>
                <div className="absolute rounded-full blur-[140px] opacity-15 animate-float w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.3),transparent)] -bottom-[15%] -right-[10%] [animation-delay:10s]"></div>
                <div className="absolute rounded-full blur-[140px] opacity-15 animate-float w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent)] top-[40%] right-[20%] [animation-delay:20s]"></div>
            </div>

            {/* Header Navigation */}
            <div className="max-w-[1200px] mx-auto mb-[30px] relative z-10 animate-[fadeInUp_0.5s_ease-out]">
                <button
                    className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] text-white/90 py-3 px-5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-x-1 group"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Dashboard
                </button>
            </div>

            {/* Profile Header */}
            <div className="max-w-[1200px] mx-auto mb-10 relative z-10 animate-[fadeInUp_0.5s_ease-out_0.1s_backwards]">
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                    <div className="h-[100px] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#6366f1] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.05)_50%,transparent_70%)] bg-[size:200%_200%] animate-shimmer"></div>
                    </div>

                    <div className="px-10 pb-10 flex justify-between items-start gap-[30px] -mt-[50px] relative">
                        <div className="flex gap-6 items-start flex-1">
                            <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-[20px] flex items-center justify-center border-[5px] border-[rgba(10,14,39,0.9)] shadow-[0_20px_60px_rgba(99,102,241,0.4)] shrink-0 relative overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-[15px]" />
                                ) : (
                                    <>
                                        <span className="text-[40px] font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">{user.name?.trim().charAt(0).toUpperCase()}</span>
                                        <div className="absolute inset-[-5px] rounded-[20px] p-[5px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-50 mix-blend-overlay"></div>
                                    </>
                                )}
                            </div>

                            <div className="pt-[45px] flex-1">
                                <h1 className="text-[32px] font-bold mb-1.5 text-white tracking-tighter">{user.name}</h1>
                                <p className="text-white/60 text-[15px] mb-4">{user.email}</p>

                                <div className="flex flex-col gap-2.5">
                                    {user.phone && (
                                        <div className="inline-flex items-center gap-2 text-white/70 text-sm max-w-fit">
                                            <Phone className="w-4 h-4 text-[#6366f1CC] shrink-0" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    {user.role_description && (
                                        <div className="inline-flex items-center gap-2 text-white/65 text-sm italic max-w-fit">
                                            <Info className="w-4 h-4 text-[#6366f1CC] shrink-0" />
                                            <span>{user.role_description}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            className="flex items-center gap-2.5 bg-gradient-to-br from-[#ef4444] to-[#dc2626] border-none text-white py-3.5 px-7 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(239,68,68,0.3)] mt-[45px] shrink-0 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(239,68,68,0.4)] hover:bg-gradient-to-br hover:from-[#dc2626] hover:to-[#b91c1c] active:translate-y-0"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-[18px] h-[18px]" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mt-[30px]">
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#3b82f6] to-[#2563eb]">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[13px] text-white/60 font-medium uppercase tracking-wider">Total Solved</p>
                            <p className="text-[28px] font-bold text-white">{totalSolved}</p>
                        </div>
                    </div>

                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[13px] text-white/60 font-medium uppercase tracking-wider">Languages</p>
                            <p className="text-[28px] font-bold text-white">{processedLanguages.length}</p>
                        </div>
                    </div>

                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#10b981] to-[#059669]">
                            <BarChart2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[13px] text-white/60 font-medium uppercase tracking-wider">Progress</p>
                            <p className="text-[28px] font-bold text-white">{overallProgress}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="max-w-[1200px] mx-auto mb-10 relative z-10 animate-[fadeInUp_0.5s_ease-out_0.2s_backwards]">
                <div className="flex gap-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2">
                    <button
                        className={`flex-1 flex items-center justify-center gap-2.5 bg-transparent border-none text-white/60 py-3.5 px-6 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-white/[0.05] hover:text-white/90 ${activeTab === "overview" ? "!bg-gradient-to-br !from-[#6366f1] !to-[#8b5cf6] !text-white shadow-[0_8px_24px_rgba(99,102,241,0.3)]" : ""}`}
                        onClick={() => setActiveTab("overview")}
                    >
                        <Grid className={`w-[18px] h-[18px] transition-transform duration-300 ${activeTab === "overview" ? "scale-110" : ""}`} />
                        Overview
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2.5 bg-transparent border-none text-white/60 py-3.5 px-6 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-white/[0.05] hover:text-white/90 ${activeTab === "languages" ? "!bg-gradient-to-br !from-[#6366f1] !to-[#8b5cf6] !text-white shadow-[0_8px_24px_rgba(99,102,241,0.3)]" : ""}`}
                        onClick={() => setActiveTab("languages")}
                    >
                        <Code className={`w-[18px] h-[18px] transition-transform duration-300 ${activeTab === "languages" ? "scale-110" : ""}`} />
                        Languages
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-[1200px] mx-auto relative z-10 animate-[fadeInUp_0.5s_ease-out_0.3s_backwards]">
                {activeTab === "overview" && (
                    <div className="animate-fade-in">
                        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-10 mb-[30px] text-center">
                            <h2 className="text-[32px] font-bold mb-3 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">Welcome back, {user.name?.split(" ")[0]}!</h2>
                            <p className="text-base text-white/70 leading-[1.6] max-w-[600px] mx-auto">
                                Continue your coding journey and master new skills. You're making excellent progress!
                            </p>
                        </div>

                        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-[35px] mb-[30px]">
                            <h3 className="text-xl font-bold mb-6 text-white">Overall Progress</h3>
                            <div className="h-4 bg-white/[0.08] rounded-xl overflow-hidden mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                                <div
                                    className="h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] bg-[size:200%_100%] rounded-xl transition-[width] duration-1000 ease-out animate-[progressFill_1s_ease-out,shimmer_2s_infinite] shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                                    style={{ width: `${overallProgress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-white/70">{totalSolved} of {Math.max(relevantTotalProblems, 10)} problems solved</span>
                                <span className="text-xl font-bold text-[#6366f1]">{overallProgress}%</span>
                            </div>
                        </div>

                        {processedLanguages.length > 0 && (
                            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-[35px]">
                                <h3 className="text-xl font-bold mb-6 text-white">Quick Stats</h3>
                                <div className="flex flex-col gap-6">
                                    {processedLanguages.slice(0, 3).map((lang, i) => (
                                        <div key={i} className="flex flex-col gap-2.5">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-base font-semibold text-white">{lang.name}</span>
                                                <span className="text-base font-bold text-[#8b5cf6]">{lang.percent}%</span>
                                            </div>
                                            <div className="h-2.5 bg-white/[0.08] rounded-lg overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg transition-[width] duration-800 ease-out animate-progress-fill"
                                                    style={{ width: `${lang.percent}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[13px] text-white/60">{lang.solved} / {lang.total} solved</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "languages" && (
                    <div className="animate-fade-in">
                        <div className="mb-[30px]">
                            <h2 className="text-[28px] font-bold mb-2 text-white">Language Proficiency</h2>
                            <p className="text-[15px] text-white/60">Track your progress across different programming languages</p>
                        </div>

                        {processedLanguages.length > 0 ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                                {processedLanguages.map((lang, i) => (
                                    <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[18px] p-7 transition-all duration-300 animate-slide-in-left hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                                        <div className="flex justify-between items-center mb-5">
                                            <h4 className="text-xl font-bold text-white">{lang.name}</h4>
                                            <span className="bg-[#6366f1]/20 text-[#8b5cf6] px-3 py-1 rounded-lg text-sm font-bold border border-[#6366f1]/30">{lang.percent}%</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="h-2 bg-white/[0.08] rounded-lg overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg transition-[width] duration-1000 ease-out animate-progress-fill"
                                                    style={{ width: `${lang.percent}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white/90 font-medium">{lang.solved} solved</span>
                                                <span className="text-white/50">of {lang.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-20 text-center text-white/40">
                                <Info size={64} className="mb-4 opacity-50" />
                                <p className="text-lg font-medium mb-2">No language progress data available yet.</p>
                                <p className="text-sm">Start solving problems to see your progress here!</p>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
