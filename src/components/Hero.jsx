import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = ({ profile }) => {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const bioText = profile?.bio || "";
  const isLongBio = bioText.length > 150;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto pt-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 blur-[120px] pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 glass-panel border border-white/10 text-sm font-medium text-gray-300 w-max mb-8"
      >
        <span className="w-2 h-2 bg-secondary animate-pulse shadow-[0_0_8px_#06B6D4]"></span>
        Available for new opportunities
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6"
      >
        {profile?.tagline?.split(" ").slice(0, -2).join(" ")} <br /> 
        <span className="text-gradient">{profile?.tagline?.split(" ").slice(-2).join(" ")}</span>
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light"
      >
        <span className="transition-all duration-300">
          {isBioExpanded ? bioText : (isLongBio ? `${bioText.substring(0, 150)}...` : bioText)}
        </span>
        {isLongBio && (
          <button 
            onClick={() => setIsBioExpanded(!isBioExpanded)} 
            className="ml-2 inline-flex items-center justify-center text-primary hover:text-secondary transition-colors"
            title={isBioExpanded ? "Show less" : "Read more"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-6 h-6 transition-transform duration-300 ${isBioExpanded ? "-rotate-90" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <Link to="/projects" className="bg-primary text-white px-8 py-4 font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-purple-500 hover:-translate-y-1 transition-all text-center w-full sm:w-auto">
          Explore Work
        </Link>
        <a 
          href={profile?.resumeUrl || "/Aman_Dwivedi_Resume.pdf"} 
          download="Aman_Dwivedi_Resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-white px-8 py-4 font-bold border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all text-center w-full sm:w-auto"
        >
          Download Resume
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
