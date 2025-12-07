import React, { useState } from "react";
import { Link } from "react-router-dom";

const RoadmapView = ({ steps, title }) => {
    const [hoveredStep, setHoveredStep] = useState(null);

    if (!steps || steps.length === 0) {
        return <div className="text-white text-center p-10">No roadmap available for this module yet.</div>;
    }

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white p-6 lg:p-10 flex flex-col items-center relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent blur-[120px]"></div>
            </div>

            <div className="max-w-5xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-400">Your step-by-step guide to mastery.</p>
                </div>

                {/* Roadmap Steps */}
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -ml-0.5 md:ml-0"></div>

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                onMouseEnter={() => setHoveredStep(index)}
                                onMouseLeave={() => setHoveredStep(null)}
                            >
                                {/* Content Side */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 mb-4 md:mb-0">
                                    <Link to={step.link} className={`block p-6 rounded-2xl border transition-all duration-300 transform group
                                ${hoveredStep === index
                                            ? "bg-[#1a163a] border-purple-500/50 scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                        }`}>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-4xl">{step.icon}</div>
                                            <div>
                                                <h3 className={`text-2xl font-bold transition-colors ${hoveredStep === index ? "text-purple-400" : "text-white"}`}>
                                                    {step.title}
                                                </h3>
                                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                                                    {step.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {step.description}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-purple-400/80 group-hover:text-purple-400">
                                            Start Module <span>→</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0f0c29] z-10 transition-all duration-300"
                                    style={{
                                        backgroundColor: hoveredStep === index ? '#a855f7' : '#4b5563',
                                        transform: hoveredStep === index ? 'translateX(-50%) scale(1.5)' : 'translateX(-50%)'
                                    }}>
                                </div>

                                {/* Empty Side (for layout balance) */}
                                <div className="w-full md:w-1/2"></div>
                            </div>
                        ))}
                    </div>

                    {/* Finale */}
                    <div className="mt-12 text-center relative z-10">
                        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                            <span className="text-3xl">🏆</span>
                        </div>
                        <h3 className="text-xl font-bold mt-4 text-purple-300">Mastery Achieved</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapView;
