import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProfileManager = () => {
  const [profile, setProfile] = useState({ tagline: "", bio: "", email: "", phone: "" });

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/profile");
      if (data) setProfile(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating profile...");
    try {
      const formData = new FormData();
      formData.append("tagline", profile.tagline || "");
      formData.append("bio", profile.bio || "");
      formData.append("email", profile.email || "");
      formData.append("phone", profile.phone || "");
      if (profile.resumeFile) {
        formData.append("resume", profile.resumeFile);
      }

      await axios.put("/api/profile", formData);
      toast.success("Profile updated successfully!", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to update profile.", { id: loadingToast });
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Global Identity</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 glass-panel border border-white/5 p-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hero Tagline</label>
          <input 
            type="text" 
            value={profile.tagline || ""} 
            onChange={(e) => setProfile({...profile, tagline: e.target.value})}
            className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">About Me (Bio)</label>
          <textarea 
            value={profile.bio || ""} 
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            rows="5"
            className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all resize-none"
            required
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Upload Resume (.pdf)</label>
          <input 
            type="file" 
            accept=".pdf"
            onChange={(e) => setProfile({...profile, resumeFile: e.target.files[0]})}
            className="bg-dark-card/50 p-3 border border-white/5 text-gray-400 outline-none focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:bg-primary file:text-white hover:file:bg-purple-600 file:cursor-pointer"
          />
          {profile.resumeUrl && !profile.resumeFile && (
            <span className="text-xs text-secondary font-medium">Currently active: {profile.resumeUrl.split('/').pop()}</span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Contact Email</label>
            <input 
              type="email" 
              value={profile.email || ""} 
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Contact Phone (Optional)</label>
            <input 
              type="text" 
              value={profile.phone || ""} 
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-6">
          <button type="submit" className="bg-primary hover:bg-purple-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20">
            Save Identity
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
