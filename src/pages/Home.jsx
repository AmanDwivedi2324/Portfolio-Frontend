import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
  const { profile, skills, experiences, projects } = useOutletContext() || {};

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Contact profile={profile} />
    </>
  );
};

export default Home;
