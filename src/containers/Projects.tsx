import styles from "./Projects.module.css";

import { data } from "../data/data";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

import viniciusGabriel from "../assets/images/ViniciusGabriel.png";
import Footer from "../components/Footer";

import { useReveal } from "../hooks/useReveal";

function Projects() {

  const hero = useReveal<HTMLElement>();
  const projects = useReveal<HTMLElement>();

  return (
    <div className={styles.container}>

      <article
        ref={hero.ref}
        className={`${styles.hero} ${hero.visible ? "show" : "hidden"}`}
      >
        <div className={styles.heroContent}>
          <div className={styles.heroContentTexts}>
            <div>
              <h2>VINÍCIUS GABRIEL</h2>
              <h1>Criação de Sites Profissionais, Landing Pages e Sistemas Web</h1>
            </div>
            <p>
              Cada projeto é desenvolvido com foco em design, performance e
              conversão, unindo uma experiência visual marcante a resultados
              reais para o seu negócio.
            </p>
          </div>

          <img src={viniciusGabriel} alt="Foto Profissional" />
          <span className={styles.heroSpan}>Desenvolvedor</span>
        </div>

        <div className="line" />

        <div className={styles.heroLinks}>
          <a href="#projects">Ver Projetos</a>
          <p>ou</p>
          <Link to={"/assessment-quote"}>
            Fazer Avaliação de Orçamento
          </Link>
        </div>

        <a href="#projects" className={styles.mouseIndicator}>
          <div />
        </a>
      </article>

      <article
        ref={projects.ref}
        className={`${styles.projectsContainer} ${projects.visible ? "show" : "hidden"}`}
        id="projects"
      >
        <h2>Projetos escolhidos</h2>

        <div className={styles.projects}>
          {data.projects.map((project) => (
            <ProjectCard
              key={project.title}
              image={project.image}
              title={project.title}
              year={project.year}
              link={project.link}
              CTA={project.CTA}
              textColor={project.textColor}
            />
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
}

export default Projects;