import styles from "./Menu.module.css";

import wordmark from "./../../public/wordmark.svg";
import { data } from "../data/data";
import { NavLink } from "react-router-dom";

import whatsapp from "../assets/icons/whatsapp.svg";
import instagram from "../assets/icons/instagram.svg";
import { useState } from "react";

function Menu() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`${styles.menuPhone} ${open ? styles.menuPhoneOpen : ""
                }`}>
                <img src={wordmark} alt="wordmark" className={styles.wordmarkPhone} />
                <button
                    className={styles.hamburger}
                    onClick={() => setOpen(!open)}
                >
                    MENU   <span>☰</span>
                </button>
            </div>


            <aside className={`${styles.menu} ${open ? styles.open : ""
                }`}>
                <div className={styles.phoneOptions}>
                    <img src={wordmark} alt="wordmark" className={styles.wordmark} />

                    <button
                        className={styles.hamburger}
                        onClick={() => setOpen(!open)}
                    >
                        FECHAR   <span>☰</span>
                    </button>
                </div>
                <nav className={styles.nav}>
                    <nav className={styles.nav}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            end
                            onClick={() => setOpen(false)}
                        >
                            Projetos
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
                        >
                            Sobre
                        </NavLink>

                        <NavLink
                            to="/assessment-quote"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
                        >
                            Avaliação e Orçamento
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
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

        </>

    )
}

export default Menu
