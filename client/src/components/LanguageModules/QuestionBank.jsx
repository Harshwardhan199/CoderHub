import React, { useState } from "react";

const QuestionBank = ({ questions, title, type = "practice" // "practice" or "interview"
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("All");
    const [activeQuestionId, setActiveQuestionId] = useState(null); // For Interview type (expansion)

    if (!questions || questions.length === 0) {
        return <div className="text-white text-center p-10">No questions available for this module yet.</div>;
    }

    const filteredData = questions.filter(item => {
        const matchesSearch = (item.title || item.q).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = filterDifficulty === "All" || item.difficulty === filterDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white p-6 lg:p-10 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[80px]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                            {title}
                        </h1>
                        <p className="text-gray-400 max-w-2xl">
                            {type === "practice"
                                ? "Sharpen your coding skills with our curated collection of problems."
                                : "Master your interview skills with these frequently asked questions."}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white focus:outline-none focus:border-blue-500 w-full md:w-64 transition-all"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        </div>

                        <select
                            value={filterDifficulty}
                            onChange={(e) => setFilterDifficulty(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option value="All">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={`grid gap-4 ${type === 'practice' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 group ${type === 'interview' ? 'cursor-pointer' : ''
                                }`}
                            onClick={type === 'interview' ? () => setActiveQuestionId(activeQuestionId === index ? null : index) : undefined}
                        >
                            {type === "practice" ? (
                                // PRACTICE CARD
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${item.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                                item.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'}`}>
                                            {item.difficulty}
                                        </span>
                                        {item.solved && <span className="text-green-400">✓ Solved</span>}
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                                    <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                                        <span>Success: {item.successRate}</span>
                                        <span>{item.submissions} submissions</span>
                                    </div>

                                    <button className="w-full mt-4 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-white py-2 rounded-lg transition-all font-medium">
                                        Solve Problem
                                    </button>
                                </>
                            ) : (
                                // INTERVIEW CARD
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium pr-8">{item.q}</h3>
                                        <span className={`text-2xl transition-transform duration-300 ${activeQuestionId === index ? "rotate-45" : ""}`}>
                                            +
                                        </span>
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-300 ${activeQuestionId === index ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                                        <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-blue-500/50">
                                            {item.a}
                                        </p>
                                        <div className="flex gap-2 mt-4">
                                            <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">
                                                {item.category || "General"}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded bg-white/5 ${item.difficulty === 'Easy' ? 'text-green-400' :
                                                item.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                {item.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No results found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionBank;
