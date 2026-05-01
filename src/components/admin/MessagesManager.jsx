import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("/api/contact");
      setMessages(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    const loadingToast = toast.loading("Deleting message...");
    try {
      await axios.delete(`/api/contact/${id}`);
      fetchMessages();
      toast.success("Message deleted!", { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message", { id: loadingToast });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Inquiries Hub</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-500">
        {messages.map((msg) => (
          <div key={msg._id} className="glass-panel border border-white/5 p-6 flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
              <div>
                <h4 className="text-lg font-bold text-white tracking-widest">{msg.name}</h4>
                <a href={`mailto:${msg.email}`} className="text-sm font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors">
                  {msg.email}
                </a>
              </div>
              <button 
                onClick={() => handleDelete(msg._id)} 
                className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-400/20 hover:bg-red-400/10 px-3 py-1 transition-all"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-bold text-gray-500 tracking-widest uppercase">
              <span>Received:</span>
              <span>{new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="col-span-full p-12 text-center text-gray-500 uppercase tracking-widest text-sm glass-panel border border-white/5">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
