import styles from "./ProjectCard.module.css";

import arrow from "../assets/icons/arrow.svg";

interface ProjectCardProps {
    image: string;
    title: string;
    year: string;
    link: string;
}

export default function ProjectCard({ image, title, year, link }: ProjectCardProps) {
    return (
        <a href={link} target="_blank" className={styles.container}>
            <div style={{ backgroundImage: `url(${image})` }} className={styles.cardImg}>
                <span>{year}</span>
                <h3>{title}</h3>
                <p>Ver no site <img src={arrow}/></p>
            </div>
        </a>
    )
}