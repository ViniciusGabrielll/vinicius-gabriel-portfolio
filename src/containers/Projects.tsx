import styles from "./Projects.module.css";

import { data } from "../data/data";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

import viniciusGabriel from "../assets/images/ViniciusGabriel.png";
import Footer from "../components/Footer";


function Projects() {

  return (
    <div className={styles.container}>
      <article className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroContentTexts}>
            <div>
              <h2>ESPECIALISTA EM</h2>
              <h1>Desenvolvimento<br />Web</h1>
            </div>
            <p>Cada projeto é desenvolvido com foco em design, performance e conversão, unindo uma experiência visual marcante a resultados reais para o seu negócio.</p>
          </div>
          <img src={viniciusGabriel} alt="Foto Profissional" />
          <span className={styles.heroSpan}>Desenvolvedor</span>
        </div>
        <div className="line" />
        <div className={styles.heroLinks}>
          <a href="#projects">Ver Projetos</a>
          <p>ou</p>
          <Link to={"/assessment-quote"}>Fazer Avaliação de Orçamento</Link>
        </div>

        <a href="#projects" className={styles.mouseIndicator}>
          <div />
        </a>
      </article>

      <article className={styles.projectsContainer} id="projects">
        <h1>Projetos escolhidos</h1>

        <div className={styles.projects}>

          {data.projects.map((project) => (
            <ProjectCard
              key={project.title}
              image={project.image}
              title={project.title}
              year={project.year}
              link={project.link}
            />
          ))}
        </div>
      </article>

      <Footer />
    </div>
  )
}

export default Projects
