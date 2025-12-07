import React from "react";
import { Lock, Sparkles, Crown, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const PremiumProjects = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center p-10 relative overflow-hidden font-sans">

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
            <div className="relative z-[2] text-center max-w-[700px] animate-fade-in-up">
                {/* Lock Icon with Animation */}
                <div className="flex justify-center mb-[30px] animate-[fadeInUp_0.8s_ease-out_0.1s_backwards]">
                    <div className="w-[140px] h-[140px] bg-gradient-to-br from-[rgba(102,126,234,0.2)] to-[rgba(118,75,162,0.2)] backdrop-blur-xl border-2 border-white/20 rounded-full flex items-center justify-center relative animate-glow">
                        <div className="absolute w-full h-full rounded-full border-2 border-[rgba(102,126,234,0.6)] animate-pulse-ring"></div>
                        <div className="absolute w-full h-full rounded-full border-2 border-[rgba(102,126,234,0.6)] animate-pulse-ring [animation-delay:1s]"></div>
                        <Lock className="w-[60px] h-[60px] text-[#667eea] drop-shadow-[0_0_20px_rgba(102,126,234,0.5)] animate-float [animation-duration:3s]" />
                    </div>
                </div>

                {/* Main Title */}
                <h1 className="text-[clamp(36px,6vw,56px)] font-extrabold mb-5 tracking-tight leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.3s_backwards]">
                    No <span className="bg-gradient-to-br from-[#667eea] via-[#f093fb] to-[#ffd700] bg-clip-text text-transparent">Premium Projects</span> for You
                </h1>

                {/* Features List */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-10 animate-[fadeInUp_0.8s_ease-out_0.5s_backwards]">
                    {[
                        { icon: Crown, text: "Exclusive Premium Projects" },
                        { icon: Sparkles, text: "Industry Given Projects" },
                        { icon: Star, text: "Industry Certifications" }
                    ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-[rgba(102,126,234,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center shrink-0">
                                <feature.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[14px] font-semibold text-white/90 text-left">{feature.text}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PremiumProjects;
