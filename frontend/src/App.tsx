import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudyPlan from "./pages/StudyPlan";
import Learn from "./pages/Learn";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import Progress from "./pages/Progress";
import Tests from "./pages/Tests";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;