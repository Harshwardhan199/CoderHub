import React, { useState } from "react";
import { Calendar, Clock, Video, Star, Sparkles, Crown, Zap, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const ScheduleInterview = () => {
    const [selectedInterviewer, setSelectedInterviewer] = useState(null);
    const [googleFormUrl] = useState("https://forms.gle/PFnv9XRdZkdeEoyM9");

    const interviewers = [
        {
            id: 1,
            name: "Amruta Vivek Saharkar",
            role: "AI/ML Intern",
            company: "Genesys International Corporation Ltd",
            experience: "6 months",
            specialization: "AI Developer",
            availability: "Available Today",
            imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            linkedin: "https://www.linkedin.com/in/amruta-saharkar-70bb4b257/",
            tags: ["AI model development", "RAG", "Langchain"],
            price: "₹999",
            badge: "Top Rated"
        }
    ];

    const features = [
        {
            icon: Video,
            title: "Live Video Call",
            description: "High-quality 1-on-1 video sessions"
        },
        {
            icon: Award,
            title: "Get Certified",
            description: "Receive completion certificate"
        },
        {
            icon: Clock,
            title: "Flexible Timing",
            description: "Choose slots that fit your schedule"
        },
        {
            icon: TrendingUp,
            title: "Track Progress",
            description: "Detailed feedback after each session"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center py-20 px-5 relative overflow-x-hidden font-sans">

            {/* Profile Circle */}
            <Link to="/profile" className="fixed top-8 right-8 inline-flex items-center justify-center z-[1000] cursor-pointer transition-all duration-300 hover:scale-105 no-underline">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center relative shadow-[0_4px_15px_rgba(99,102,241,0.3),0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-300">
                    <span className="text-2xl">👤</span>
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#4ade80] border-2 border-[#0f0c29] rounded-full animate-pulse-status"></div>
                </div>
            </Link>

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(102,126,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,126,234,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-pulse"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[500px] h-[500px] bg-gradient-to-br from-[#667eea] to-[#764ba2] -top-[10%] -left-[10%]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[450px] h-[450px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] -bottom-[10%] -right-[10%] [animation-delay:10s]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-30 animate-float w-[400px] h-[400px] bg-gradient-to-br from-[#ffd700] to-[#ffed4e] top-1/2 left-1/2 [animation-delay:5s]"></div>
            </div>

            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                {/* Reusing same floating elements logic */}
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 top-[15%] left-[10%] animate-float-random-1">
                    <Crown className="w-[30px] h-[30px] text-white/60" />
                </div>
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 top-[25%] right-[15%] animate-float-random-2 [animation-delay:2s]">
                    <Star className="w-[30px] h-[30px] text-white/60" />
                </div>
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 bottom-[20%] left-[15%] animate-float-random-1 [animation-delay:4s]">
                    <Zap className="w-[30px] h-[30px] text-white/60" />
                </div>
                <div className="absolute w-[60px] h-[60px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center opacity-60 bottom-[30%] right-[10%] animate-float-random-2 [animation-delay:6s]">
                    <Sparkles className="w-[30px] h-[30px] text-white/60" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-[2] w-full max-w-[1400px] animate-fade-in-up">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2.5 bg-[rgba(255,215,0,0.15)] border border-[rgba(255,215,0,0.3)] rounded-full px-6 py-2.5 mb-6 backdrop-blur-md hover:bg-[rgba(255,215,0,0.25)] hover:-translate-y-0.5 transition-all duration-300">
                        <Sparkles className="w-5 h-5 text-[#ffd700] animate-rotate" />
                        <span className="text-[13px] text-[#ffd700] font-bold uppercase tracking-[1.5px]">Premium Interviews</span>
                    </div>

                    <h1 className="text-[clamp(36px,6vw,56px)] font-extrabold mb-5 tracking-tight leading-[1.1]">
                        Schedule Your <span className="bg-gradient-to-br from-[#667eea] via-[#f093fb] to-[#ffd700] bg-clip-text text-transparent animate-float inline-block">Mock Interview</span>
                    </h1>

                    <p className="text-[clamp(16px,3vw,20px)] text-white/70 leading-[1.6] max-w-[800px] mx-auto">
                        Practice with industry experts from top tech companies and boost your confidence for real interviews
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center transition-all duration-400 animate-scale-in cursor-pointer hover:bg-white/[0.08] hover:border-[rgba(102,126,234,0.4)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[360deg]">
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="text-lg font-bold mb-2.5 text-white">{feature.title}</h4>
                            <p className="text-sm text-white/70 leading-[1.5]">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Interviewers Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mb-12">
                    {interviewers.map((interviewer, index) => (
                        <div
                            key={interviewer.id}
                            className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in-up group hover:bg-white/[0.08] hover:border-[#667eea80] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] ${selectedInterviewer === interviewer.id ? 'border-[#667eea] bg-[#667eea1a] shadow-[0_0_30px_rgba(102,126,234,0.3)]' : 'border-white/10'}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => setSelectedInterviewer(interviewer.id)}
                        >
                            {/* Card Shine Effect */}
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-600 group-hover:left-[200%]"></div>

                            {/* Header */}
                            <div className="flex gap-3 mb-4">
                                <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0 shadow-[0_4px_12px_rgba(102,126,234,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_16px_rgba(102,126,234,0.5)]">
                                    <img src={interviewer.imageUrl} alt={interviewer.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-bold text-white truncate">{interviewer.name}</h3>
                                        <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                                            <Crown className="w-3 h-3 text-[#0f0c29]" />
                                        </div>
                                        <a href={interviewer.linkedin} target="_blank" rel="noopener noreferrer" className="ml-2 text-[#0A66C2] transition-colors hover:text-[#004182] hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zM8.3 8h4.4v1.9h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.4 3 5.4 6.9V22H17V15c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V22H8.3V8z" />
                                            </svg>
                                        </a>
                                    </div>
                                    <p className="text-[13px] text-white/70 mb-1.5 truncate">{interviewer.role}</p>
                                    <span className="bg-[rgba(102,126,234,0.2)] border border-[rgba(102,126,234,0.3)] text-[#667eea] px-2.5 py-0.5 rounded-xl text-[11px] font-semibold inline-block">{interviewer.company}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-3 items-center mb-3 p-2.5 bg-white/[0.03] rounded-lg">
                                <div className="flex items-center gap-1.5 text-[11px] text-[#4ade80] ml-auto">
                                    <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse-status"></div>
                                    <span>Available</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {interviewer.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-white/[0.08] border border-white/[0.12] rounded-xl text-[11px] text-white/85 font-medium transition-all duration-200 hover:bg-[rgba(102,126,234,0.15)] hover:border-[#667eea]">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                                <div className="flex-1">
                                    <span className="text-xl font-extrabold bg-gradient-to-br from-[#ffd700] to-[#ffed4e] bg-clip-text text-transparent">{interviewer.price}</span>
                                </div>
                                <button
                                    className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-none rounded-[10px] px-4 py-2 text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_12px_rgba(102,126,234,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(googleFormUrl, "_blank");
                                    }}
                                >
                                    Fill Booking Form
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-9 animate-[fadeInUp_0.8s_ease-out_0.8s_backwards] mb-10 transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                    <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(102,126,234,0.4)] transition-all duration-300 group-hover:rotate-[10deg] group-hover:scale-110">
                        <Video className="w-9 h-9 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">How It Works?</h4>
                        <p className="text-white/70 leading-[1.6]">
                            Select an interviewer based on your target role, choose your preferred time slot, and join a
                            comprehensive mock interview session. Get detailed feedback,
                            personalized tips, and a performance report to improve your interview skills.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScheduleInterview;
