import React, { useState } from "react";

const ProjectGrid = ({ projects, title }) => {
    const [activeDifficulty, setActiveDifficulty] = useState("All");

    if (!projects || projects.length === 0) {
        return <div className="text-white text-center p-10">No projects available for this module yet.</div>;
    }

    const filteredProjects = activeDifficulty === "All"
        ? projects
        : projects.filter(p => p.difficulty === activeDifficulty);

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white p-6 lg:p-10 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
                        {title}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Build real-world applications to solidify your understanding. From simple utilities to complex systems.
                    </p>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        {["All", "Easy", "Intermediate", "Advanced"].map((level) => (
                            <button
                                key={level}
                                onClick={() => setActiveDifficulty(level)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeDifficulty === level
                                    ? "bg-green-500 text-black shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#1a163a] rounded-3xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(74,222,128,0.2)]"
                        >
                            {/* Image/Icon Placeholder */}
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                                    {project.icon}
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>

                                {/* Difficulty Badge */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md
                    ${project.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                    {project.difficulty}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags && project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>⏱️</span>
                                        <span>{project.duration}</span>
                                    </div>
                                    <button className="text-green-400 text-sm font-bold hover:translate-x-1 transition-transform flex items-center gap-1">
                                        View Project <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectGrid;
