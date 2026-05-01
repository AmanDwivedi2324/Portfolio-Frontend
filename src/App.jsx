import { BrowserRouter as Router, Routes, Route, useOutletContext } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PortfolioLayout from "./layouts/PortfolioLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";

// Import standalone frontend sections
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Import standalone admin sections
import ProfileManager from "./components/admin/ProfileManager";
import ProjectsManager from "./components/admin/ProjectsManager";
import ExperienceManager from "./components/admin/ExperienceManager";
import SkillsManager from "./components/admin/SkillsManager";
import MessagesManager from "./components/admin/MessagesManager";

// Helper component to supply Outlet Context Data directly to Sub-Routes for public pages
const SectionPage = ({ Component, dataKey }) => {
  const data = useOutletContext() || {};
  let props = {};
  if (dataKey) {
     props = { [dataKey]: data[dataKey] };
  } else if (Component === About || Component === Contact) {
     props = { profile: data.profile };
  }
  return (
    <div className="pt-24 min-h-screen">
      <Component {...props} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<SectionPage Component={About} />} />
          <Route path="skills" element={<SectionPage Component={Skills} dataKey="skills" />} />
          <Route path="experience" element={<SectionPage Component={Experience} dataKey="experiences" />} />
          <Route path="projects" element={<SectionPage Component={Projects} dataKey="projects" />} />
          <Route path="contact" element={<SectionPage Component={Contact} />} />
        </Route>

        {/* Public Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="messages" element={<MessagesManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
