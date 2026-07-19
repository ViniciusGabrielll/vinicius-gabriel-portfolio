import styles from "./Menu.module.css";

import wordmark from "./../../public/wordmark.svg";
import { data } from "../data/data";
import { NavLink } from "react-router-dom";

import whatsapp from "../assets/icons/whatsapp.svg";
import instagram from "../assets/icons/instagram.svg";

function Menu() {

    return (
        <aside className={styles.menu}>
            <img src={wordmark} alt="wordmark" className={styles.wordmark} />

            <nav className={styles.nav}>
                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? styles.active : ""}
                        end
                    >
                        Projetos
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Sobre
                    </NavLink>

                    <NavLink
                        to="/assessment-quote"
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Avaliação e Orçamento
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? styles.active : ""}
                    >
                        Contato
                    </NavLink>
                </nav>
            </nav>

            <div className={styles.menuContactConteiner}>
                <a href={data.whatsapp} className={styles.menuContact}>
                    <img src={whatsapp} alt="WhatsApp" />
                    <span>WhatsApp</span>
                </a>
                <a href={data.instagram} className={styles.menuContact}>
                    <img src={instagram} alt="Instagram" />
                    <span>Instagram</span>
                </a>
            </div>
        </aside >
    )
}

export default Menu
