import styles from "./ProjectCard.module.css";

import arrow from "../assets/icons/arrow.svg";

interface ProjectCardProps {
    image: string;
    title: string;
    year: string;
    link: string;
    CTA: string;
    textColor: string;
}

export default function ProjectCard({ image, title, year, link, CTA, textColor }: ProjectCardProps) {
    return (
        <a href={link} target="_blank" className={styles.container}>
            <div style={{ backgroundImage: `url(${image})` }} className={`${styles.cardImg} ${textColor === "dark" ? styles.darkText : ""
                }`}>
                <span>{year}</span>
                <h3>{title}</h3>
                <p>{CTA} <img src={arrow} /></p>
            </div>
        </a>
    )
}