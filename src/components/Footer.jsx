import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-black/50 border-t border-white/5 glass-panel z-10 relative pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
      
      <div className="flex flex-col items-center md:items-start">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white mb-4 w-max">
          AMAN<span className="text-gradient"> DWIVEDI</span>
        </Link>
        <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
          Full Stack Developer building scalable and optimized web applications.
        </p>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Link to="/about" className="text-gray-500 text-sm hover:text-white transition-colors w-max">About Me</Link>
          <Link to="/projects" className="text-gray-500 text-sm hover:text-white transition-colors w-max">Projects</Link>
          <Link to="/experience" className="text-gray-500 text-sm hover:text-white transition-colors w-max">Experience</Link>
          <Link to="/skills" className="text-gray-500 text-sm hover:text-white transition-colors w-max">Skills</Link>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Social Profiles</h4>
        <div className="flex flex-col gap-3 items-center md:items-start">
          <a href="https://github.com/AmanDwivedi2324" className="text-gray-500 text-sm hover:text-primary transition-colors w-max flex items-center gap-2">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/aman-dwivedi-dev" className="text-gray-500 text-sm hover:text-primary transition-colors w-max flex items-center gap-2">
            LinkedIn
          </a>
          <a href="https://leetcode.com/u/Aman_Dwivedi2003" className="text-gray-500 text-sm hover:text-primary transition-colors w-max flex items-center gap-2">
            LeetCode
          </a>
        </div>
      </div>

    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-gray-500 text-xs font-medium uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Aman Dwivedi. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
