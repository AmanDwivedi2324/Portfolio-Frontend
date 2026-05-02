import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PortfolioLayout = () => {
  const [data, setData] = useState({ projects: [], experiences: [], skills: [], profile: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, expRes, skillsRes, profileRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/experience'),
          axios.get('/api/skills'),
          axios.get('/api/profile')
        ]);
        setData({
          projects: projectsRes.data,
          experiences: expRes.data,
          skills: skillsRes.data,
          profile: profileRes.data
        });
      } catch (err) {
        console.error("Failed to load portfolio data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden w-full relative">
      <Navbar />
      <main>
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-primary animate-spin rounded-full mb-6"></div>
            <div className="text-sm font-bold tracking-widest text-primary uppercase animate-pulse">Waking Server...</div>
            <p className="text-xs text-gray-500 max-w-xs text-center mt-2">Free hosting services take ~40 seconds to start on first load. Thanks for your patience!</p>
          </div>
        )}
        <div className={loading ? "opacity-30 pointer-events-none" : ""}>
          <Outlet context={data} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioLayout;
