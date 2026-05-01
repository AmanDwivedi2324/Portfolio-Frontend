import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b border-white/5 transition-all bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-extrabold tracking-tighter text-white">
          AMAN<span className="text-gradient"> DWIVEDI</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">
          <Link to="/about" className="hover:text-white transition-colors relative group py-2">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/skills" className="hover:text-white transition-colors relative group py-2">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/experience" className="hover:text-white transition-colors relative group py-2">
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/projects" className="hover:text-white transition-colors relative group py-2">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="px-5 py-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all">
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: -1 }}>
        <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform">About</Link>
        <Link to="/skills" onClick={() => setIsOpen(false)} className="text-white text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform">Skills</Link>
        <Link to="/experience" onClick={() => setIsOpen(false)} className="text-white text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform">Experience</Link>
        <Link to="/projects" onClick={() => setIsOpen(false)} className="text-white text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform">Projects</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className="text-primary text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform mt-4">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
