import styles from "./menu.module.css"

import wordmark from "./../../public/wordmark.svg"

function Menu() {

    return (
        <aside className={styles.menu}>
            <img src={wordmark} alt="wordmark" className={styles.wordmark} />

            <nav className={styles.nav}>
                <a href="/">Projetos</a>
                <a href="/about">Sobre</a>
                <a href="/assessment-quote">Avaliação e Orçamento</a>
                <a href="/contact">Contato</a>
            </nav>
        </aside >
    )
}

export default Menu
