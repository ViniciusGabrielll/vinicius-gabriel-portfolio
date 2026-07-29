import { useState } from "react";
import styles from "./AboutMe.module.css";

import { data } from "../data/data";
import Footer from "../components/Footer";

import figma from "../assets/icons/figma.svg";
import photoshop from "../assets/icons/photoshop.svg";
import git from "../assets/icons/git.svg";
import gitHub from "../assets/icons/gitHub.svg";
import java from "../assets/icons/java.svg";
import mySQL from "../assets/icons/mySQL.svg";
import typeScript from "../assets/icons/typesScript.svg";
import springBoot from "../assets/icons/springBoot.svg";
import react from "../assets/icons/react.svg";

import sarahLima from "../assets/images/clients/sarahLimaVieira.jpg";
import maxima from "../assets/images/clients/clinicamaxima.jpg";

function AboutMe() {

  const [toolName, setToolName] = useState("");


  return (
    <div className={styles.container}>
      <article className={styles.hero}>
        <section>
          <h4>Algumas palavras sobre mim</h4>
          <h3>Sou Vinícius Gabriel, designer e desenvolvedor web especializado em criar
            landing pages e sites que unem design moderno, alta performance e estratégias
            de conversão. Meu objetivo é transformar ideias em experiências digitais que
            geram resultados reais para cada cliente.</h3>
        </section>
        <section className={styles.feedbackContainer}>
          <div className={styles.feedback}>
            <div className={styles.feedbackPerfil}>
              <img src={maxima} />
              <p>Centro Médico Máxima</p>
            </div>
            <p className={styles.comment}>Um investimento que valeu a pena e continua trazendo resultados.</p>
          </div>
          <div className={styles.feedback}>
            <div className={styles.feedbackPerfil}>
              <img src={sarahLima} />
              <p>Sarah Lima Vieira</p>
            </div>
            <p className={styles.comment}>O melhor que temos!! Muito grata pelo site que fez para meu perfil profissional🙌🏼</p>
          </div>
          <a href={data.whatsappLink} className={`${styles.feedback} ${styles.feedbackLink}`}>
            <div className={styles.feedbackPerfil}>
              <p>Você</p>
            </div>
            <p className={styles.comment}>Sua opinião é muito importante. Deixe seu feedback!</p>
          </a>
        </section>
      </article>

      <article className={styles.services}>
        <div>
          <h4>SERVIÇOS</h4>
          <h3>Web Design  <span className={styles.servicesBar}>/</span>
            Landing Pages <span className={styles.servicesBar}>/</span>
            UI & UX <span className={styles.servicesBar}>/</span>
            Front-end Development <span className={styles.servicesBar}>/</span>
            CRM <span className={styles.servicesBar}>/</span>
            SEO <span className={styles.servicesBar}>/</span>
            Performance <span className={styles.servicesBar}>/</span>
            Motion Design</h3>
        </div>
        <div className={styles.toolsContainer}>
          <h4>FERRAMENTAS</h4>
          <div className={styles.toolsImages}>
            <img
              src={photoshop}
              className={styles.tool}
              onMouseEnter={() => setToolName("Photoshop")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={figma}
              className={styles.tool}
              onMouseEnter={() => setToolName("Figma")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={react}
              className={styles.tool}
              onMouseEnter={() => setToolName("React")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={springBoot}
              className={styles.tool}
              onMouseEnter={() => setToolName("Spring Boot")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={typeScript}
              className={styles.tool}
              onMouseEnter={() => setToolName("TypeScript")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={java}
              className={styles.tool}
              onMouseEnter={() => setToolName("Java")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={mySQL}
              className={styles.tool}
              onMouseEnter={() => setToolName("MySQL")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={git}
              className={styles.tool}
              onMouseEnter={() => setToolName("Git")}
              onMouseLeave={() => setToolName("")}
            />

            <img
              src={gitHub}
              className={styles.tool}
              onMouseEnter={() => setToolName("GitHub")}
              onMouseLeave={() => setToolName("")}
            />
          </div>

          <p className={styles.toolName}>{toolName}</p>
        </div>
      </article >
      <div className="line" />

      <Footer />
    </div >
  )
}

export default AboutMe
