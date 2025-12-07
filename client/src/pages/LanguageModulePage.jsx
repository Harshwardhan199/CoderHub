import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicViewer from "../components/LanguageModules/TopicViewer";
import QuestionBank from "../components/LanguageModules/QuestionBank";
import ProjectGrid from "../components/LanguageModules/ProjectGrid";
import RoadmapView from "../components/LanguageModules/RoadmapView";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const LanguageModulePage = () => {
    const { lang, module } = useParams();
    const navigate = useNavigate();
    const [languageData, setLanguageData] = useState(null);
    const [moduleContent, setModuleContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Map URL parameter to Database 'type'
    const typeMap = {
        "basics": "basics",
        "intermediate": "intermediate",
        "advanced": "advanced",
        "practice-questions": "practice",
        "interview-questions": "interview",
        "projects": "projects",
        "learning-roadmap": "roadmap"
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Fetch Language Metadata (Display Name, etc.)
                const langResponse = await axios.get(`${BASE_URL}/languages/${lang}`);
                setLanguageData(langResponse.data);

                // 2. Fetch Module Content
                const dbType = typeMap[module];
                if (!dbType) {
                    throw new Error(`Unknown module type: ${module}`);
                }

                const contentResponse = await axios.get(`${BASE_URL}/languages/${lang}/${dbType}`);
                setModuleContent(contentResponse.data);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.response?.data?.message || err.message || "Error loading content");
            } finally {
                setLoading(false);
            }
        };

        if (lang && module) {
            fetchData();
        }
    }, [lang, module]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0c29] flex flex-col items-center justify-center text-white">
                <h1 className="text-3xl font-bold mb-4">Oops!</h1>
                <p className="text-gray-400 mb-8">{error}</p>
                <button
                    onClick={() => navigate(`/languages/${lang}`)}
                    className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Component Rendering Logic
    const renderContent = () => {
        const dbType = typeMap[module];
        const titlePrefix = languageData?.displayName || lang;

        switch (module) {
            case 'basics':
                return <TopicViewer data={moduleContent} title={`${titlePrefix} Basics`} />;
            case 'intermediate':
                return <TopicViewer data={moduleContent} title={`${titlePrefix} Intermediate`} />;
            case 'advanced':
                return <TopicViewer data={moduleContent} title={`${titlePrefix} Advanced`} />;
            case 'practice-questions':
                console.log(moduleContent);
                return <QuestionBank questions={moduleContent} type="practice" />;
            case 'interview-questions':
                return <QuestionBank questions={moduleContent} type="interview" />;
            case 'projects':
                return <ProjectGrid projects={moduleContent} />;
            case 'learning-roadmap':
                return <RoadmapView steps={moduleContent} />;
            default:
                return <div>Module not found</div>;
        }
    };

    return renderContent();
};

export default LanguageModulePage;
