import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending message...");
    try {
      await axios.post('/api/contact', formData);
      toast.success('Message sent successfully!', { id: loadingToast });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send. Please try again later.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10 w-full">
      <div className="max-w-7xl mx-auto glass-panel border border-white/10 p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Let's build <br/><span className="text-gradient">the future.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 font-light max-w-md">
              Ready to transform your ideas into reality? Whether it's a new project or an ongoing collaboration, let's connect.
            </p>
            
            <div className="flex flex-col gap-4">
              {/* Genuine SVG Email Formatter */}
              <div className="flex items-center gap-5 border border-white/5 bg-black/40 p-5 w-full max-w-md hover:border-primary/30 transition-colors group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Email</div>
                    <div className="font-semibold text-white truncate">{profile?.email || "amandwivedi@example.com"}</div>
                  </div>
                </div>

                {/* Genuine SVG Phone Formatter */}
                {profile?.phone && (
                  <div className="flex items-center gap-5 border border-white/5 bg-black/40 p-5 w-full max-w-md hover:border-primary/30 transition-colors group">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.077-7.077l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Phone</div>
                      <div className="font-semibold text-white truncate">{profile.phone}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 glass-panel border border-white/5 p-6 md:p-10 w-full shadow-2xl shadow-black/50">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">Send a Message</h3>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-widest">Message</label>
              <textarea 
                placeholder="Enter details..." 
                required 
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-dark-card/50 p-4 border border-white/5 text-white outline-none focus:border-primary transition-all resize-none w-full"
              ></textarea>
            </div>
            <button disabled={loading} type="submit" className={`text-white p-5 font-bold uppercase tracking-widest shadow-lg transition-all mt-2 w-full ${loading ? 'bg-gray-600' : 'bg-primary shadow-primary/20 hover:shadow-primary/40 hover:bg-purple-600'}`}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
