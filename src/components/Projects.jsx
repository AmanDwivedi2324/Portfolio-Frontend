import { motion } from "framer-motion";

const Projects = ({ projects }) => (
  <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
    <div className="absolute -right-1/4 top-1/4 w-[600px] h-[600px] bg-secondary/15 blur-[120px] pointer-events-none"></div>
    <div className="mb-16 md:flex justify-between items-end relative z-10 text-center md:text-left">
      <div>
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Portfolio</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">Featured Projects</h3>
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 relative z-10">
      {projects?.map((project, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1 }}
          key={project._id} 
          className="group glass-panel border border-white/5 overflow-hidden relative transition-all hover:border-white/10 hover:shadow-2xl flex flex-col"
        >
          <div className="h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-b border-white/5 relative overflow-hidden p-8">
             {project.imageUrl ? (
               <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
             ) : (
               <>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
                 <h3 className="text-3xl font-bold text-center text-white/50 group-hover:text-white transition-colors duration-300 relative z-10">{project.title}</h3>
               </>
             )}
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <p className="text-gray-400 mb-8 min-h-[80px] font-light leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack?.map(tech => (
                <span key={tech} className="bg-white/5 border border-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 pt-6 mt-auto border-t border-white/5">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center glass-panel py-3 text-sm font-bold text-white hover:bg-white/10 hover:border-primary/50 transition-colors border border-white/10">
                  View Live
                </a>
              )}
              {/* {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white/5 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  Source Code
                </a>
              )} */}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
