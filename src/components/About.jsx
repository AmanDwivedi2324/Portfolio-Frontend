const About = ({ profile }) => (
  <div id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
    <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3 text-center">Introduction</h2>
    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-12 text-center">About Me</h3>
    <div className="glass-panel border border-white/10 p-8 md:p-12 relative overflow-hidden group max-w-4xl mx-auto hover:border-white/20 transition-colors">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-secondary"></div>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light z-10 relative">
        {profile?.bio}
      </p>
    </div>
  </div>
);

export default About;
