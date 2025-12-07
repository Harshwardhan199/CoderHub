import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LanguagePage() {
    const { lang } = useParams();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Default data structure for fallback
    const defaultData = {
        name: lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : "Unknown",
        type: "Programming Language",
        title: `Practice ${lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : "Coding"}`,
        subtitle: "Start your journey to mastery with our comprehensive curriculum.",
        stats: { modules: "?", topics: "?", projects: "?" },
        orbs: [
            { color: "from-cyan-400 to-blue-500", position: "-top-[10%] -left-[10%]", size: "w-[500px] h-[500px]", delay: "0s" },
            { color: "from-purple-400 to-pink-500", position: "top-[40%] -right-[10%]", size: "w-[400px] h-[400px]", delay: "8s" },
            { color: "from-green-400 to-teal-500", position: "-bottom-[10%] left-[30%]", size: "w-[350px] h-[350px]", delay: "16s" }
        ],
        cards: []
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch from backend
                const response = await axios.get(`http://localhost:5000/api/languages/${lang}`);
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching language data:", err);
                // Fallback logic could go here, or just set error
                // For now, we'll maintain the "no data" state or partial default
                // But specifically for Python (since we seeded it), we expect it to work.
                setError("Language not found or server error");
            } finally {
                setLoading(false);
            }
        };

        if (lang) {
            fetchData();
        }
    }, [lang]);

    const currentData = data || defaultData;

    const getLink = (name) => {
        const baseUrl = `/languages/${lang || 'code'}`;
        // Normalize name to create valid URL segments if needed
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        return `${baseUrl}/${slug}`;
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center">
                <div className="w-[50px] h-[50px] border-4 border-white/20 border-t-[#667eea] rounded-full animate-spin"></div>
            </div>
        );
    }

    // Optional: Render error state if strictly required, 
    // but current design falls back to defaultData structure if data is null.
    // However, if we want to show a clear "Not Found" message:
    if (error && !data) {
        // You might want to show defaultData here instead of an error screen 
        // depending on requirements. For now, let's use defaultData as fallback
        // so the page isn't broken for unseeded languages.
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center py-[60px] px-10 relative overflow-x-hidden font-sans">

            {/* Profile Circle */}
            <Link to="/profile" className="fixed top-5 right-5 w-[52px] h-[52px] z-[1000] group transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-bold text-xl text-white shadow-[0_8px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-[3px] border-white/20 relative group-hover:scale-105 group-hover:shadow-[0_12px_35px_rgba(102,126,234,0.6)] group-hover:border-white/40">
                    <span className="select-none tracking-wide">👤</span>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0f0a1e] shadow-[0_2px_8px_rgba(34,197,94,0.4)] animate-pulse-status"></div>
            </Link>


            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse-slow"></div>

                {currentData.orbs && currentData.orbs.map((orb, index) => (
                    <div
                        key={index}
                        className={`absolute rounded-full blur-[100px] opacity-30 animate-float bg-gradient-to-br ${orb.color} ${orb.position} ${orb.size}`}
                        style={{ animationDelay: orb.delay }}
                    ></div>
                ))}
            </div>

            {/* Hero Section */}
            <div className="text-center mb-[70px] z-10 w-full max-w-[1200px] animate-[fadeInUp_0.8s_ease-out]">
                <div className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[50px] px-5 py-2 mb-[25px] animate-[slideInLeft_0.8s_ease-out_0.2s_backwards]">
                    <span className="text-xl font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{currentData.name || "Language"}</span>
                    <span className="text-sm text-white/80 font-medium">{currentData.type}</span>
                </div>
                <h1 className="text-[56px] font-extrabold mb-5 tracking-tight leading-[1.2]">
                    {currentData.title}
                </h1>
                <p className="text-white/75 text-lg max-w-[700px] mx-auto mb-10 leading-[1.7]">
                    {currentData.subtitle}
                </p>
                <div className="flex justify-center items-center gap-[30px] mt-10 flex-wrap">
                    <div className="flex flex-col items-center">
                        <span className="text-[40px] font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{currentData.stats?.modules || 0}</span>
                        <span className="text-[13px] text-white/60 uppercase tracking-widest mt-1">Modules</span>
                    </div>
                    <div className="w-px h-[45px] bg-white/20 hidden sm:block"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[40px] font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{currentData.stats?.topics || 0}</span>
                        <span className="text-[13px] text-white/60 uppercase tracking-widest mt-1">Topics</span>
                    </div>
                    <div className="w-px h-[45px] bg-white/20 hidden sm:block"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[40px] font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">{currentData.stats?.projects || 0}</span>
                        <span className="text-[13px] text-white/60 uppercase tracking-widest mt-1">Projects</span>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[30px] w-full max-w-[1400px] z-10 mb-20">
                {currentData.cards && currentData.cards.map((card, index) => (
                    <div
                        key={index}
                        className={`group relative animate-[scaleIn_0.6s_ease-out_backwards]`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className={`relative h-full p-[35px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer overflow-hidden ${hoveredCard === index ? "-translate-y-3 scale-[1.02] shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-white/30 bg-white/[0.08]" : ""}`}>

                            {/* Shine Effect */}
                            <div className={`absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-all duration-600 ${hoveredCard === index ? "left-full" : "-left-full"}`}></div>

                            {/* Card Header */}
                            <div className="flex justify-between items-center mb-5">
                                <div
                                    className={`w-[70px] h-[70px] rounded-[18px] flex items-center justify-center text-4xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-400 ease-out ${hoveredCard === index ? "scale-115 rotate-[10deg] shadow-[0_15px_40px_rgba(0,0,0,0.4)]" : ""}`}
                                    style={{ background: card.color }}
                                >
                                    {card.icon}
                                </div>
                                <div className="text-[48px] font-extrabold text-white/[0.08] leading-none">
                                    0{index + 1}
                                </div>
                            </div>

                            <h2 className="text-[26px] font-bold mb-3 text-white">{card.title}</h2>
                            <p className="text-[15px] text-white/70 leading-[1.6] mb-5 flex-grow">{card.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {card.topics && card.topics.map((topic, idx) => (
                                    <span key={idx} className={`px-3.5 py-1.5 rounded-[20px] text-xs font-medium border border-white/15 bg-white/10 text-white/80 transition-all duration-300 ${hoveredCard === index ? "bg-white/15 border-white/30" : ""}`}>
                                        {topic}
                                    </span>
                                ))}
                            </div>

                            <button
                                className="w-full py-3.5 px-6 rounded-xl text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 z-10 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
                                style={{ background: card.color }}
                                onClick={() => navigate(getLink(card.title))}
                            >
                                <span>Explore Module</span>
                                <span className={`text-lg transition-transform duration-300 ${hoveredCard === index ? "translate-x-1" : ""}`}>→</span>
                            </button>

                            <div className={`absolute inset-0 rounded-3xl transition-opacity duration-400 pointer-events-none ${hoveredCard === index ? "opacity-5" : "opacity-0"}`} style={{ background: card.color }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="w-full max-w-[1400px] text-center py-[70px] px-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[30px] z-10 animate-[fadeInUp_0.8s_ease-out_0.6s_backwards]">
                <h2 className="text-[40px] font-bold mb-4">Ready to Master {currentData.name}?</h2>
                <p className="text-lg text-white/70 mb-9">Start your journey from fundamentals to advanced concepts</p>
            </div>
        </div>
    );
}

export default LanguagePage;
