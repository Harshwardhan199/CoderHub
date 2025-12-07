import React, { useState } from "react";
import { Code, Play, RefreshCw, Save } from "lucide-react";

const CodeIDE = ({ initialQuestion, onSubmitCode }) => {
    const [code, setCode] = useState(initialQuestion?.starterCode || "// Write your code here...");
    const [output, setOutput] = useState("");

    const handleRun = () => {
        setOutput("Running code...\nOutput: Hello World!"); // Placeholder output
    };

    const handleSubmit = () => {
        onSubmitCode({
            code,
            output,
            language: "javascript",
            executionTime: 100,
        });
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white overflow-hidden rounded-lg border border-gray-700">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-sm">JS Solution</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCode(initialQuestion?.starterCode || "")}
                        className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                        title="Reset"
                    >
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                        onClick={handleRun}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                    >
                        <Play className="w-4 h-4" /> Run
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                    >
                        <Save className="w-4 h-4" /> Submit
                    </button>
                </div>
            </div>

            {/* Editor Area (Placeholder) */}
            <div className="flex-1 flex">
                <div className="flex-1 p-4 font-mono text-sm">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent resize-none outline-none leading-relaxed"
                        spellCheck="false"
                    />
                </div>

                {/* Output Panel */}
                <div className="w-1/3 border-l border-gray-700 bg-[#1e1e1e] flex flex-col">
                    <div className="px-4 py-2 bg-[#252526] border-b border-gray-700 font-semibold text-sm text-gray-300">
                        Console Output
                    </div>
                    <div className="p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap flex-1 overflow-auto">
                        {output || "Output will appear here..."}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeIDE;
