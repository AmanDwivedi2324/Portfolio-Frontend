import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", techStack: "", liveLink: "", githubLink: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading(editingId ? "Updating project..." : "Deploying project...");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("techStack", form.techStack);
      formData.append("liveLink", form.liveLink);
      formData.append("githubLink", form.githubLink);
      if (image) formData.append("image", image);

      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, formData, { headers: { "Content-Type": "multipart/form-data" }});
        toast.success("Project updated successfully!", { id: loadingToast });
      } else {
        await axios.post("/api/projects", formData, { headers: { "Content-Type": "multipart/form-data" }});
        toast.success("Project deployed successfully!", { id: loadingToast });
      }
      
      setForm({ title: "", description: "", techStack: "", liveLink: "", githubLink: "" });
      setImage(null);
      setIsFormOpen(false);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? "Failed to update project" : "Failed to add project", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    const loadingToast = toast.loading("Deleting project...");
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
      toast.success("Project deleted!", { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project", { id: loadingToast });
    }
  };

  const handleEdit = (proj) => {
    setForm({
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack?.join(", ") || "",
      liveLink: proj.liveLink || "",
      githubLink: proj.githubLink || ""
    });
    setEditingId(proj._id);
    setImage(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm({ title: "", description: "", techStack: "", liveLink: "", githubLink: "" });
    setImage(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Projects Vault</h3>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-purple-600 text-white px-6 py-2 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20">
            + New
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-4 bg-black/20 p-6 border border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">{editingId ? "Update Project Protocol" : "Initialize Project Protocol"}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Project Title</label>
                <input 
                  type="text" 
                  value={form.title} 
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, Node, MongoDB"
                  value={form.techStack} 
                  onChange={(e) => setForm({...form, techStack: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Description</label>
              <textarea 
                value={form.description} 
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all resize-none"
                rows="4"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Live Link</label>
                <input 
                  type="text" 
                  value={form.liveLink} 
                  onChange={(e) => setForm({...form, liveLink: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Github Link</label>
                <input 
                  type="text" 
                  value={form.githubLink} 
                  onChange={(e) => setForm({...form, githubLink: e.target.value})}
                  className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Cover Image</label>
                <input 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-dark-card/50 p-3 border border-white/5 text-white text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4 border-t border-white/5 pt-6">
              <button disabled={loading} type="submit" className={`text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all ${loading ? 'bg-gray-600' : 'bg-primary hover:bg-purple-600'}`}>
                {loading ? (editingId ? "Updating..." : "Uploading...") : (editingId ? "Update Project" : "Deploy Project")}
              </button>
              <button type="button" onClick={handleCancel} className="border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all">
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
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Title</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400">Tech Stack</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div className="flex items-center gap-3">
                      {proj.imageUrl ? <img src={proj.imageUrl} alt="" className="w-10 h-10 object-cover border border-white/10" /> : <div className="w-10 h-10 bg-white/5 border border-white/10" />}
                      {proj.title}
                    </div>
                  </td>
                  <td className="p-4 text-secondary text-sm">{proj.techStack?.join(", ")}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleEdit(proj)} 
                      className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary border border-secondary/20 hover:bg-secondary/10 px-4 py-2 transition-all mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(proj._id)} 
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-400/20 hover:bg-red-400/10 px-4 py-2 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500 uppercase tracking-widest text-sm">No project entries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
