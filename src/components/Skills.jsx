import { motion } from "framer-motion";

const Skills = ({ skills }) => {
  // Group skills by category explicitly
  const categorizedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">Capabilities</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">Technologies <span className="text-gray-500">&</span> Tools</h3>
      </div>
      
      <div className="flex flex-col gap-16">
        {categorizedSkills && Object.entries(categorizedSkills).map(([category, items]) => (
          <div key={category} className="flex flex-col">
            <h4 className="text-xl font-bold uppercase tracking-widest text-primary mb-8 border-b border-white/5 pb-4">
              {category}
            </h4>
            <div className="flex flex-wrap gap-4">
              {items.map((skill, index) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  key={skill._id} 
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative px-6 py-3 bg-dark-card border border-white/10 rounded-full flex items-center gap-3 transition-all duration-300 group-hover:border-white/30 group-hover:-translate-y-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <span className="text-sm font-bold tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
