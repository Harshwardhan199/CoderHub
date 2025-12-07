import React, { useState } from "react";


const TopicViewer = ({ data, title }) => {
    const [activeTopic, setActiveTopic] = useState(data && data.length > 0 ? data[0].id : null);
    const [searchTerm, setSearchTerm] = useState("");

    if (!data || data.length === 0) {
        return <div className="flex min-h-screen h-screen w-full bg-[#0a0f1f] justify-center items-center text-[#e0e0e0] font-[Poppins]">No content available for this module yet.</div>;
    }

    const currentContent = data.find(t => t.id === activeTopic) || data[0];

    const filteredTopics = data.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen h-screen w-full bg-gradient-to-br from-[#0a0f1f] via-[#1a1f35] to-[#0f1428] font-[Poppins] text-[#e0e0e0]">
            {/* Sidebar */}
            <aside className="w-[300px] bg-gradient-to-br from-[#0d1117] to-[#1a1f35] border-r-2 border-[#2d3748] flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.3)]">
                {/* Header */}
                <div className="p-6 border-b-2 border-[#2d3748] bg-gradient-to-br from-[#3776AB] to-[#2563eb]">
                    <h1 className="text-2xl font-bold text-white mb-1 mt-0">{title}</h1>
                    <p className="text-[#a0c4ff] text-[13px] m-0">Complete Learning Guide</p>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-[#2d3748]">
                    <input
                        type="text"
                        placeholder="Search topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-[14px] py-[10px] border border-[#3d4758] rounded-lg bg-[#1a1f35] text-[#e0e0e0] text-sm outline-none box-border font-[Poppins] focus:border-[#3776AB] focus:ring-2 focus:ring-[#3776ab33]"
                    />
                </div>

                {/* Topics List */}
                <nav className="flex-1 overflow-auto p-4">
                    <ul className="list-none p-0 m-0">
                        {filteredTopics.map((topic, index) => (
                            <li key={topic.id} className="mb-1">
                                <button
                                    onClick={() => setActiveTopic(topic.id)}
                                    className={`w-full px-4 py-3 bg-transparent border-none rounded-lg text-[#b0b8c8] cursor-pointer flex items-center gap-3 text-sm font-medium transition-all duration-200 text-left font-[Poppins] hover:bg-[rgba(55,118,171,0.1)] ${activeTopic === topic.id ? "bg-[#3776AB] text-white shadow-[0_2px_8px_rgba(55,118,171,0.4)]" : ""}`}
                                >
                                    <span className={`w-7 h-7 rounded-full bg-[#2d3748] text-[#8892a0] flex items-center justify-center text-xs font-semibold shrink-0 ${activeTopic === topic.id ? "bg-white text-[#3776AB]" : ""}`}>
                                        {index + 1}
                                    </span>
                                    <span className="font-medium">{topic.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-[#2d3748] bg-[#0d1117] text-center">
                    <p className="text-xs text-[#6b7280] m-0">
                        {data.length} topics available
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="w-full px-12 py-10 box-border">
                    {/* Content Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-white mb-2 mt-0">
                            {currentContent.title}
                        </h2>
                        <div className="h-1 w-[60px] bg-gradient-to-r from-[#3776AB] to-[#2563eb] rounded-sm"></div>
                    </div>

                    {/* Content Body */}
                    <div className="bg-gradient-to-br from-[#1a1f35] to-[#151929] rounded-xl w-full p-8 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-[#2d3748]">
                        <div className="text-base leading-[1.8]">
                            {currentContent.content.split("\n").map((line, i) => {
                                const trimmedLine = line.trim();

                                if (!trimmedLine) {
                                    return <div key={i} className="h-4"></div>;
                                }

                                if (line.startsWith("    ")) {
                                    return (
                                        <pre key={i} className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto my-4 border border-[#2d3748]">
                                            <code className="font-mono text-sm text-[#a0c4ff]">{line.trim()}</code>
                                        </pre>
                                    );
                                }

                                if (trimmedLine.endsWith(":") && !trimmedLine.match(/^\d/)) {
                                    return (
                                        <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">
                                            {trimmedLine}
                                        </h3>
                                    );
                                }

                                if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
                                    return (
                                        <li key={i} className="text-[#d0d7e0] leading-[1.8] ml-6 mb-2">
                                            {trimmedLine.substring(1).trim()}
                                        </li>
                                    );
                                }

                                if (trimmedLine.match(/^\d+\./)) {
                                    return (
                                        <p key={i} className="text-[#d0d7e0] mb-3 ml-4 leading-[1.8]">
                                            {trimmedLine}
                                        </p>
                                    );
                                }

                                return (
                                    <p key={i} className="text-[#d0d7e0] mb-4 leading-[1.8]">
                                        {trimmedLine}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 gap-4">
                        <button
                            onClick={() => {
                                const currentIndex = data.findIndex(t => t.id === activeTopic);
                                if (currentIndex > 0) {
                                    setActiveTopic(data[currentIndex - 1].id);
                                }
                            }}
                            disabled={data.findIndex(t => t.id === activeTopic) === 0}
                            className="px-6 py-3 bg-[#2d3748] border border-[#3d4758] text-[#e0e0e0] rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 font-[Poppins] hover:bg-[#3d4758] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ← Previous
                        </button>

                        <button
                            onClick={() => {
                                const currentIndex = data.findIndex(t => t.id === activeTopic);
                                if (currentIndex < data.length - 1) {
                                    setActiveTopic(data[currentIndex + 1].id);
                                }
                            }}
                            disabled={data.findIndex(t => t.id === activeTopic) === data.length - 1}
                            className="px-6 py-3 bg-gradient-to-br from-[#3776AB] to-[#2563eb] border-none text-white rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 font-[Poppins] hover:from-[#2563eb] hover:to-[#3776AB] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TopicViewer;
