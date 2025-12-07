import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Code2, BookOpen, TrendingUp, Users, Award, Zap,
    ArrowRight, Sparkles, Star, Award as AwardIcon
} from "lucide-react";

function Home() {
    const [hoveredLang, setHoveredLang] = useState(null);
    const [hoveredCourse, setHoveredCourse] = useState(null);

    const trendingLanguages = [
        { name: "JavaScript", icon: "JS", color: "#f7df1e", popularity: 98 },
        { name: "Python", icon: "Py", color: "#3776ab", popularity: 100 },
        { name: "Java", icon: "J", color: "#007396", popularity: 95 },
    ];

    const trendingCourses = [
        { name: "Real-Time Chat Server", icon: "💬", students: "50K+", rating: 4.9 },
        { name: "File Encryption and Decryption tool", icon: "🛡️", students: "35K+", rating: 4.8 },
        { name: "Deepfake Detection Software", icon: "🧠", students: "42K+", rating: 4.9 },
        { name: "Online Banking System", icon: "🏦", students: "28K+", rating: 4.7 },
        { name: "CRUD Console App with JSON", icon: "📂", students: "45K+", rating: 4.8 }
    ];

    const features = [
        { icon: Users, title: "Expert Instructors", desc: "Learn from industry professionals" },
        { icon: Award, title: "Certification", desc: "Get recognized credentials" },
        { icon: Zap, title: "Fast Learning", desc: "Accelerated course structure" }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1e0d3d] to-[#0f0a1e] text-white font-sans relative overflow-hidden">

            {/* Profile Circle */}
            <Link to="/profile" className="fixed top-5 right-5 w-[52px] h-[52px] z-[1000] group transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-bold text-xl text-white shadow-[0_8px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-[3px] border-white/20 relative group-hover:scale-105 group-hover:shadow-[0_12px_35px_rgba(102,126,234,0.6)] group-hover:border-white/40">
                    <span className="select-none tracking-wide">👤</span>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0f0a1e] shadow-[0_2px_8px_rgba(34,197,94,0.4)] animate-pulse-status"></div>
            </Link>

            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50 animate-pulse-slow"></div>

                {/* Orbs */}
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[500px] h-[500px] bg-gradient-to-br from-[#667eea] to-[#764ba2] -top-[10%] -left-[10%]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[450px] h-[450px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] -bottom-[10%] -right-[10%] [animation-delay:7s]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[400px] h-[400px] bg-gradient-to-br from-[#4facfe] to-[#00f2fe] top-1/2 left-1/2 [animation-delay:14s]"></div>
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bottom-[-10px] w-[3px] h-[3px] bg-[#667eea]/60 rounded-full animate-particle-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 px-10 py-20 w-full max-w-[1400px] mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-24 animate-fadeInUp">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#667eea]/10 border border-[#667eea]/30 backdrop-blur-md mb-8 transition-all duration-300 hover:bg-[#667eea]/15 hover:-translate-y-0.5">
                        <Sparkles className="w-[18px] h-[18px] text-yellow-400" />
                        <span className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Start Your Coding Journey</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
                        Master the Art of <span className="bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">Coding</span>
                    </h1>

                    <p className="text-[22px] text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
                        Transform your career with industry-leading courses and hands-on practice
                    </p>

                    <div className="flex gap-5 justify-center mb-16 flex-wrap">
                        <Link to="/courses" className="btn-primary group">
                            <span>Explore Courses</span>
                            <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link to="/languages" className="btn-secondary">
                            <span>View Languages</span>
                        </Link>
                    </div>

                    <div className="flex justify-center gap-10 flex-wrap">
                        <div className="stat-card">
                            <Users className="w-8 h-8 text-cyan-400" />
                            <div className="text-left">
                                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent leading-none mb-1">100K+</div>
                                <div className="text-xs text-white/60 uppercase tracking-wide">Active Students</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <Code2 className="w-8 h-8 text-cyan-400" />
                            <div className="text-left">
                                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent leading-none mb-1">3</div>
                                <div className="text-xs text-white/60 uppercase tracking-wide">Languages</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mb-20 animate-fadeInUp [animation-fill-mode:backwards] [animation-delay:0.2s]">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="feature-card flex flex-col items-center justify-center gap-1">
                                <div className="flex flex-col items-center justify-center">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/60">{feature.desc}</p>
                            </div>
                        );
                    })}
                </section>

                {/* Main Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fadeInUp [animation-fill-mode:backwards] [animation-delay:0.4s]">
                    {/* Card 1 */}
                    <Link to="/languages" className="group relative block h-[300px] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:col-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] opacity-10 transition-opacity duration-500 group-hover:opacity-20 z-0"></div>
                        <div className="relative h-full p-10 flex flex-col z-1 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:border-white/25">
                            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[18px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[8deg]">
                                <Code2 className="w-9 h-9 text-white" />
                            </div>
                            <h2 className="text-[28px] font-bold mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">Programming Languages</h2>
                            <p className="text-base text-white/70 leading-relaxed mb-auto">Explore to kickstart your coding journey</p>
                            <div className="pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-400">
                                    Start Learning
                                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shine"></div>
                    </Link>

                    {/* Card 2 */}
                    <Link to="/courses" className="group relative block h-[300px] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] opacity-10 transition-opacity duration-500 group-hover:opacity-20 z-0"></div>
                        <div className="relative h-full p-10 flex flex-col z-1 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:border-white/25">
                            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[18px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[8deg]">
                                <BookOpen className="w-9 h-9 text-white" />
                            </div>
                            <h2 className="text-[28px] font-bold mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">Premium Courses</h2>
                            <p className="text-base text-white/70 leading-relaxed mb-auto">Find curated courses to level up your skills</p>
                            <div className="pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-400">
                                    Browse Courses
                                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shine"></div>
                    </Link>

                    {/* Card 3 */}
                    <Link to="/daily_quiz" className="group relative block h-[300px] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] opacity-10 transition-opacity duration-500 group-hover:opacity-20 z-0"></div>
                        <div className="relative h-full p-10 flex flex-col z-1 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:border-white/25">
                            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[18px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[8deg]">
                                <Star className="w-9 h-9 text-white" />
                            </div>
                            <h2 className="text-[28px] font-bold mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">Daily Tasks</h2>
                            <p className="text-base text-white/70 leading-relaxed mb-auto">Personalised questions for you</p>
                            <div className="pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-400">
                                    Try Now
                                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shine"></div>
                    </Link>

                    {/* Card 4 */}
                    <Link to="/premium_projects" className="group relative block h-[300px] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] opacity-10 transition-opacity duration-500 group-hover:opacity-20 z-0"></div>
                        <div className="relative h-full p-10 flex flex-col z-1 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:border-white/25">
                            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[18px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[8deg]">
                                <AwardIcon className="w-9 h-9 text-white" />
                            </div>
                            <h2 className="text-[28px] font-bold mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">Premium Projects</h2>
                            <p className="text-base text-white/70 leading-relaxed mb-auto">Find Industry given projects up your skills</p>
                            <div className="pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-400">
                                    Browse Projects
                                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shine"></div>
                    </Link>

                    {/* Card 5 */}
                    <Link to="/schedule_interview" className="group relative block h-[300px] rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] md:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] opacity-10 transition-opacity duration-500 group-hover:opacity-20 z-0"></div>
                        <div className="relative h-full p-10 flex flex-col z-1 bg-white/5 backdrop-blur-xl border border-white/10 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:border-white/25">
                            <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[18px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[8deg]">
                                <Users className="w-9 h-9 text-white" />
                            </div>
                            <h2 className="text-[28px] font-bold mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">Schedule Interview</h2>
                            <p className="text-base text-white/70 leading-relaxed mb-auto">Schedule mock interviews with experts</p>
                            <div className="pt-5 border-t border-white/10">
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors duration-300 group-hover:text-cyan-400">
                                    Browse Experts
                                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 group-hover:animate-shine"></div>
                    </Link>

                </section>

                {/* Trending Languages */}
                <section className="mb-20 animate-fadeInUp [animation-fill-mode:backwards] [animation-delay:0.6s]">
                    <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="w-8 h-8 text-cyan-400" />
                            <div>
                                <h3 className="text-4xl font-bold mb-1">Trending Languages</h3>
                                <p className="text-base text-white/60">Most popular programming languages in 2025</p>
                            </div>
                        </div>
                        <Link to="/Languages" className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10 hover:translate-x-1">
                            View All <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
                        {trendingLanguages.map((lang, index) => {
                            const path = `/languages/${lang.name.toLowerCase().replace("++", "pp")}`;
                            return (
                                <Link
                                    to={path}
                                    key={index}
                                    className="group relative block p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(102,126,234,0.2)]"
                                    onMouseEnter={() => setHoveredLang(index)}
                                    onMouseLeave={() => setHoveredLang(null)}
                                >
                                    <div className="absolute inset-0 opacity-10 z-0 transition-opacity duration-500 group-hover:opacity-25" style={{ background: lang.color }}></div>

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center font-bold text-xl text-white mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" style={{
                                            background: lang.color,
                                            boxShadow: `0 8px 25px ${lang.color}40`
                                        }}>
                                            {lang.icon}
                                        </div>

                                        <h4 className="text-lg font-semibold mb-3 text-white">{lang.name}</h4>

                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${lang.popularity}%`,
                                                    background: lang.color
                                                }}
                                            ></div>
                                        </div>

                                        <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-yellow-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                                            <Star className="w-3.5 h-3.5 text-yellow-400" />
                                            <span>Popular</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 opacity-0 rounded-2xl transition-opacity duration-500 z-0 group-hover:opacity-40 shadow-[0_0_60px_10px_currentColor]" style={{ color: lang.color, background: 'transparent' }}></div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Trending Courses */}
                <section className="mb-20 animate-fadeInUp [animation-fill-mode:backwards] [animation-delay:0.8s]">
                    <div className="flex justify-between items-center mb-8 flex-wrap gap-5">
                        <div className="flex items-center gap-4">
                            <BookOpen className="w-8 h-8 text-cyan-400" />
                            <div>
                                <h3 className="text-4xl font-bold mb-1">Trending Projects</h3>
                                <p className="text-base text-white/60">Top projects chosen by students worldwide</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
                        {trendingCourses.map((course, index) => (
                            <div
                                key={index}
                                className="group relative block p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(102,126,234,0.2)]"
                                onMouseEnter={() => setHoveredCourse(index)}
                                onMouseLeave={() => setHoveredCourse(null)}
                            >
                                <div className="relative z-10 flex flex-col items-start text-left">
                                    <div className="text-4xl mb-3">{course.icon}</div>

                                    <h4 className="text-lg font-semibold mb-3 text-white">{course.name}</h4>

                                    <div className="flex items-center gap-4 my-2.5">
                                        <div className="flex items-center gap-1.5 text-sm text-white/80">
                                            <Users className="w-4 h-4 text-cyan-400" />
                                            <span>{course.students}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-white/80">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span>{course.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center px-5 py-24 bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 rounded-[30px] my-32 mx-auto max-w-[1000px] animate-fadeInUp [animation-fill-mode:backwards] [animation-delay:0.8s]">
                    <div className="flex flex-col items-center gap-5">
                        <h2 className="text-[42px] font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Ready to Start Learning?</h2>
                        <p className="text-lg text-white/70 max-w-[600px] leading-relaxed">
                            Join thousands of students already learning on our platform
                        </p>
                    </div>
                </section>
            </div >
        </div >
    );
}

export default Home;
