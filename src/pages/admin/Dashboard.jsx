import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Systems Override</h1>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Access Hub</h2>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-max">
          Unrestricted Mode
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel border border-white/5 p-8 group hover:border-primary/50 transition-all flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] group-hover:bg-primary/20 transition-all"></div>
          <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-2 relative z-10">Identity Center</h3>
          <p className="text-gray-400 font-light mb-8 relative z-10">Update your hero tagline, paragraph bio, email address, and phone details.</p>
          <Link to="/admin/profile" className="mt-auto px-6 py-3 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest w-max transition-colors relative z-10">
            Open Sub-Layer &rarr;
          </Link>
        </div>

        <div className="glass-panel border border-white/5 p-8 group hover:border-secondary/50 transition-all flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[40px] group-hover:bg-secondary/20 transition-all"></div>
          <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-2 relative z-10">Projects Vault</h3>
          <p className="text-gray-400 font-light mb-8 relative z-10">Formulate new featured entries, attach cover photography, and detail tech specs.</p>
          <Link to="/admin/projects" className="mt-auto px-6 py-3 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest w-max transition-colors relative z-10">
            Open Sub-Layer &rarr;
          </Link>
        </div>

        <div className="glass-panel border border-white/5 p-8 group hover:border-white/20 transition-all flex flex-col relative overflow-hidden">
           <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">Experience Flow</h3>
           <p className="text-gray-400 font-light mb-8">Plot specific professional engagements alongside descriptions marking duration blocks.</p>
           <Link to="/admin/experience" className="mt-auto px-6 py-3 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest w-max transition-colors">
            Open Sub-Layer &rarr;
          </Link>
        </div>

        <div className="glass-panel border border-white/5 p-8 group hover:border-white/20 transition-all flex flex-col relative overflow-hidden">
           <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">Skills Lexicon</h3>
           <p className="text-gray-400 font-light mb-8">Maintain active framework tokens highlighting structural knowledge capabilities.</p>
           <Link to="/admin/skills" className="mt-auto px-6 py-3 border border-white/10 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest w-max transition-colors">
            Open Sub-Layer &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
