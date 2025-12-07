import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Code2, Sparkles, TrendingUp, Zap } from "lucide-react";

const languages = [
    { name: "Java", icon: "J", color: "#007396", category: "Enterprise", popularity: 98 },
    { name: "JavaScript", icon: "JS", color: "#F7DF1E", category: "Web", popularity: 99 },
    { name: "Python", icon: "Py", color: "#3776AB", category: "General", popularity: 100 },
];

function Languages() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const filteredSuggestions = languages.filter((lang) =>
                lang.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setFocusedIndex(-1);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (langName) => {
        setSearchTerm(langName);
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setFocusedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            } else if (e.key === "Enter" && focusedIndex >= 0) {
                e.preventDefault();
                handleSuggestionClick(suggestions[focusedIndex].name);
            }
        }
    };

    const filteredLanguages = languages.filter((lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getLink = (name) => {
        const routes = {
            "Java": "/languages/java",
            "JavaScript": "/languages/javascript",
            "Python": "/languages/python",
        };
        return routes[name] || "#";
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col p-10 relative overflow-x-hidden font-sans">

            {/* Profile Circle */}
            <Link to="/profile" className="fixed top-5 right-5 w-[52px] h-[52px] z-[1000] group transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-bold text-xl text-white shadow-[0_8px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-[3px] border-white/20 relative group-hover:scale-105 group-hover:shadow-[0_12px_35px_rgba(102,126,234,0.6)] group-hover:border-white/40">
                    <span className="select-none tracking-wide">👤</span>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0f0a1e] shadow-[0_2px_8px_rgba(34,197,94,0.4)] animate-pulse-status"></div>
            </Link>

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50 animate-pulse-slow"></div>
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[500px] h-[500px] bg-gradient-to-br from-[#667eea] to-[#764ba2] -top-[10%] -left-[10%]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[450px] h-[450px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] -bottom-[10%] -right-[10%] [animation-delay:7s]"></div>
                <div className="absolute rounded-full blur-[120px] opacity-25 animate-float w-[400px] h-[400px] bg-gradient-to-br from-[#4facfe] to-[#00f2fe] top-1/2 left-1/2 [animation-delay:14s]"></div>
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute bottom-[-10px] w-[3px] h-[3px] bg-[rgba(102,126,234,0.6)] rounded-full animate-particle-float" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto py-10 px-5">

                {/* Header Section */}
                <div className="text-center mb-15 animate-fade-in-up w-full">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(102,126,234,0.1)] border border-[rgba(102,126,234,0.3)] backdrop-blur-md mb-6 transition-all duration-300 hover:bg-[rgba(102,126,234,0.15)] hover:-translate-y-0.5">
                        <Sparkles className="w-[18px] h-[18px] text-[#facc15]" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent uppercase tracking-wider">Master Programming</span>
                    </div>

                    <h1 className="text-[56px] font-extrabold mb-5 tracking-tight leading-[1.1]">
                        Programming Languages
                    </h1>

                    <p className="text-[20px] text-white/70 max-w-[700px] mx-auto mb-10 leading-[1.7]">
                        Explore {languages.length} powerful programming languages and accelerate your coding journey
                    </p>

                    {/* Stats Section */}
                    <div className="flex justify-center flex-wrap gap-10 mt-10">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(102,126,234,0.2)]">
                            <Code2 className="w-6 h-6 text-[#22d3ee]" />
                            <div className="flex flex-col gap-0.5">
                                <div className="text-2xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">{languages.length}</div>
                                <div className="text-xs text-white/60 uppercase tracking-wider">Languages</div>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-white/[0.15]"></div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(102,126,234,0.2)]">
                            <TrendingUp className="w-6 h-6 text-[#22d3ee]" />
                            <div className="flex flex-col gap-0.5">
                                <div className="text-2xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">100K+</div>
                                <div className="text-xs text-white/60 uppercase tracking-wider">Developers</div>
                            </div>
                        </div>
                        <div className="w-[1px] h-10 bg-white/[0.15]"></div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(102,126,234,0.2)]">
                            <Zap className="w-6 h-6 text-[#22d3ee]" />
                            <div className="flex flex-col gap-0.5">
                                <div className="text-2xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#a855f7] bg-clip-text text-transparent">24/7</div>
                                <div className="text-xs text-white/60 uppercase tracking-wider">Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="w-full max-w-[700px] mx-auto mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s_backwards] px-5 relative">
                    <div className="relative w-full mt-3">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none z-[2]" />
                        <input
                            type="text"
                            placeholder="Search for a language..."
                            value={searchTerm}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="w-full py-5 px-[60px] rounded-[20px] border-2 border-white/10 outline-none text-base bg-white/5 backdrop-blur-xl text-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.2)] focus:border-[#667eea] focus:shadow-[0_0_0_4px_rgba(102,126,234,0.15),0_8px_30px_rgba(102,126,234,0.3)] focus:bg-white/[0.08] placeholder:text-white/40"
                        />
                        {searchTerm && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-none text-white w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-[2] hover:bg-white/20 hover:-translate-y-1/2 hover:rotate-90"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSuggestions([]);
                                }}
                                aria-label="Clear search"
                            >
                                <X className="w-[18px] h-[18px]" />
                            </button>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[rgba(20,15,40,0.98)] backdrop-blur-xl rounded-[20px] border border-white/10 p-2 max-h-[400px] overflow-y-auto z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-slide-in-down scrollbar-thin scrollbar-thumb-gradient-to-br from-[#667eea] to-[#764ba2] scrollbar-track-white/5">
                            {suggestions.map((lang, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(lang.name)}
                                    className={`flex items-center gap-4 p-3.5 cursor-pointer rounded-[14px] transition-all duration-200 mb-1 relative hover:bg-[rgba(102,126,234,0.15)] hover:translate-x-2 group ${focusedIndex === index ? "bg-[rgba(102,126,234,0.15)] translate-x-2" : ""}`}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shrink-0 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                                        style={{ background: lang.color }}
                                    >
                                        {lang.icon}
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <span className="text-base font-semibold text-white">{lang.name}</span>
                                        <span className="text-[13px] text-white/50 uppercase tracking-wider">{lang.category}</span>
                                    </div>
                                    <div className="text-white/30 text-xl transition-all duration-200 group-hover:text-[#667eea] group-hover:translate-x-1">→</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results Count */}
                    {searchTerm && (
                        <div className="text-left mt-5 text-base text-white/60 font-medium animate-fade-in-up px-5 max-w-[700px] mx-auto">
                            <span className="font-bold text-[#22d3ee] text-lg">{filteredLanguages.length}</span>
                            {" "}{filteredLanguages.length === 1 ? "language" : "languages"} found
                        </div>
                    )}
                </div>

                {/* Language Cards Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7 w-full px-5">
                    {filteredLanguages.map((lang, index) => (
                        <Link
                            key={index}
                            to={getLink(lang.name)}
                            className="relative text-white no-underline block animate-scale-in h-full group"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Background Blur */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 blur-[40px] transition-opacity duration-500 z-0 group-hover:opacity-15" style={{ background: lang.color }}></div>

                            <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] overflow-hidden h-full flex flex-col z-[1] group-hover:-translate-y-3 group-hover:bg-white/[0.08] group-hover:border-white/25 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
                                <div className="flex justify-between items-start mb-6">
                                    <div
                                        className="w-[70px] h-[70px] rounded-[18px] flex items-center justify-center font-bold text-[28px] text-white transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-115 group-hover:rotate-[8deg]"
                                        style={{
                                            background: lang.color,
                                            boxShadow: `0 8px 25px ${lang.color}40`
                                        }}
                                    >
                                        {lang.icon}
                                    </div>

                                    <div className="flex-1 max-w-[80px] p-1.5">
                                        <div className="w-full h-1.5 bg-white/10 rounded-[10px] overflow-hidden">
                                            <div
                                                className="h-full rounded-[10px] transition-all duration-500 ease-out"
                                                style={{
                                                    width: `${lang.popularity}%`,
                                                    background: lang.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#22d3ee] group-hover:to-[#a855f7] group-hover:bg-clip-text group-hover:text-transparent">{lang.name}</h3>
                                <span className="text-[13px] text-white/50 uppercase tracking-wider font-semibold block mb-6">{lang.category}</span>

                                <div className="mt-auto pt-5 border-t border-white/10">
                                    <span className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-all duration-300 group-hover:text-[#22d3ee]">
                                        Learn More
                                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Card Shine */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-1000 pointer-events-none group-hover:opacity-100 group-hover:animate-shine"></div>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {filteredLanguages.length === 0 && (
                    <div className="text-center py-24 px-10 w-full animate-fade-in-up">
                        <div className="flex items-center justify-center w-[120px] h-[120px] mx-auto mb-7 bg-[rgba(102,126,234,0.1)] rounded-full text-white/40">
                            <Search size={64} />
                        </div>
                        <h3 className="text-[32px] font-bold mb-3 text-white">No languages found</h3>
                        <p className="text-lg text-white/60 mb-8 max-w-[500px] mx-auto">
                            Try searching with a different term or browse all languages
                        </p>
                        <button
                            className="py-3.5 px-8 rounded-2xl border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_8px_25px_rgba(102,126,234,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(102,126,234,0.5)] hover:bg-gradient-to-br hover:from-[#764ba2] hover:to-[#667eea]"
                            onClick={() => {
                                setSearchTerm("");
                                setSuggestions([]);
                            }}
                        >
                            View All Languages
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Languages;
