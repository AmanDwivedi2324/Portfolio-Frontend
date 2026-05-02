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

  if(loading) return (
    <div className="h-screen flex items-center justify-center bg-dark-bg text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-white/10 border-t-primary animate-spin"></div>
        <div className="text-sm font-bold tracking-widest text-primary uppercase animate-pulse">Initializing System...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden w-full relative">
      <Navbar />
      <main>
        <Outlet context={data} />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioLayout;
