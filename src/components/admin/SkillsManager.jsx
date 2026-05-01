import { useState, useEffect } from "react";
import axios from "axios";

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", category: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get("/api/skills");
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/skills", form);
      setForm({ name: "", category: "" });
      setIsFormOpen(false);
      fetchSkills();
    } catch (err) {
      console.error("Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await axios.delete(`/api/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Skills Lexicon</h3>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-purple-600 text-white px-6 py-2 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20">
            + New
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-4 bg-black/20 p-6 border border-white/5 relative">
            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">Initialize Skill Token</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Skill Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. React.js"
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Category</label>
                <input 
                  type="text" 
                  placeholder="e.g. Frontend"
                  value={form.category} 
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4 border-t border-white/5 pt-6">
              <button type="submit" className="bg-primary hover:bg-purple-600 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all">
                Append Record
              </button>
              <button type="button" onClick={() => setIsFormOpen(false)} className="border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto glass-panel border border-white/5 animate-in fade-in duration-500">
          <table className="w-full text-left font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Name</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{s.name}</td>
                  <td className="p-4 text-secondary text-sm">{s.category}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(s._id)} 
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-400/20 hover:bg-red-400/10 px-4 py-2 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500 uppercase tracking-widest text-sm">No registry entries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
