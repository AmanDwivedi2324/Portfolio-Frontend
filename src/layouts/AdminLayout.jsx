import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("adminAuth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "9305234316") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid Access Code");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <div className="glass-panel p-8 border border-white/10 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-center text-white">Admin Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-dark-card/50 p-4 text-white border border-white/5 outline-none focus:border-primary text-center tracking-widest transition-all" 
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}
            <button type="submit" className="bg-primary hover:bg-purple-600 text-white p-4 font-bold uppercase tracking-widest transition-all text-xs">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col md:flex-row selection:bg-primary/30">
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-primary uppercase tracking-widest flex items-center justify-between">
          <span>CMS</span>
          <span className="w-2 h-2 bg-secondary animate-pulse shadow-[0_0_8px_#06B6D4]"></span>
        </h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/admin" className="hover:text-primary transition-colors font-bold text-sm tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Dashboard Hub</Link>
          <Link to="/admin/projects" className="hover:text-primary transition-colors font-bold text-xs tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Manage Projects</Link>
          <Link to="/admin/experience" className="hover:text-primary transition-colors font-bold text-xs tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Manage Experience</Link>
          <Link to="/admin/skills" className="hover:text-primary transition-colors font-bold text-xs tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Manage Skills</Link>
          <Link to="/admin/profile" className="hover:text-primary transition-colors font-bold text-xs tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Manage Identity</Link>
          <Link to="/admin/messages" className="hover:text-primary transition-colors font-bold text-xs tracking-wider uppercase border-l-2 border-transparent hover:border-primary pl-4">Manage Messages</Link>
        </nav>
        <div className="mt-auto border-t border-white/10 pt-6 flex flex-col gap-4">
          <button onClick={handleLogout} className="text-gray-400 text-xs font-bold uppercase tracking-widest text-left hover:text-red-400 transition-colors">
            End Session
          </button>
          <Link to="/" className="text-secondary text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-secondary transition-colors pb-1 w-max">
            &larr; View Live Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-black bg-opacity-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
