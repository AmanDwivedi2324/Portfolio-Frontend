import { motion } from "framer-motion";

const Experience = ({ experiences }) => (
  <section id="experience" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
    <div className="mb-16 text-center md:text-left">
      <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">My Journey</h2>
      <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">Professional Experience</h3>
    </div>
    <div className="relative pl-6 md:pl-0">
      <div className="absolute left-[31px] md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent"></div>
      
      <div className="flex flex-col gap-12">
        {experiences?.map((exp, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            key={exp._id} 
            className="relative md:pl-24 pl-12"
          >
            <div className="absolute left-0 md:left-2 top-0 w-12 h-12 md:w-14 md:h-14 glass-panel border border-white/10 flex items-center justify-center font-bold text-lg md:text-xl text-white shadow-lg bg-dark-card z-10">
              0{index + 1}
            </div>
            
            <div className="glass-panel border border-white/5 p-6 md:p-8 hover:border-white/10 transition-colors group">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                {exp.duration}
              </span>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all">{exp.role}</h3>
              <h4 className="text-lg text-gray-400 mb-6 font-medium">{exp.company}</h4>
              <p className="text-gray-300 leading-relaxed font-light">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
