import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Courses from './pages/Courses';
import DailyQuiz from './pages/DailyQuiz';
import PremiumProjects from './pages/PremiumProjects';
import ScheduleInterview from './pages/ScheduleInterview';
import Languages from './pages/Languages';
import LanguagePage from './pages/LanguagePage';
import LanguageModulePage from './pages/LanguageModulePage';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/daily_quiz" element={<DailyQuiz />} />
                        <Route path="/premium_projects" element={<PremiumProjects />} />
                        <Route path="/schedule_interview" element={<ScheduleInterview />} />
                        <Route path="/languages" element={<Languages />} />
                        <Route path="/languages/:lang" element={<LanguagePage />} />
                        <Route path="/languages/:lang/:module" element={<LanguageModulePage />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
