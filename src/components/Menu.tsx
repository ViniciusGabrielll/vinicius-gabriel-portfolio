import styles from "./Menu.module.css";

import wordmark from "./../../public/wordmark.svg";
import { data } from "../data/data";
import { NavLink } from "react-router-dom";

import whatsapp from "../assets/icons/whatsapp.svg";
import instagram from "../assets/icons/instagram.svg";
import { useEffect, useState } from "react";

function Menu() {

    const [open, setOpen] = useState(false);

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (open) {
                setHidden(false);
                lastScrollY = currentScrollY;
                return;
            }

            if (currentScrollY <= 80) {
                setHidden(false);
            } else if (currentScrollY > lastScrollY) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [open]);

    return (
        <>
            <div className={`${styles.menuPhone} ${hidden ? styles.headerHidden : ""}`}>
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

                        <NavLink
                            to="/blog"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
                        >
                            Blog
                        </NavLink>
                    </nav>
                </nav>

                <div className={styles.menuContactConteiner}>
                    <a href={data.whatsappLink} className={styles.menuContact}>
                        <img src={whatsapp} alt="WhatsApp" />
                        <span>WhatsApp</span>
                    </a>
                    <a href={data.instagramLink} className={styles.menuContact}>
                        <img src={instagram} alt="Instagram" />
                        <span>Instagram</span>
                    </a>
                </div>
            </aside >

        </>

    )
}

export default Menu
