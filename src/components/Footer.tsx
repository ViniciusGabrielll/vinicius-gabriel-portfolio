import styles from "./Footer.module.css";

import { data } from "../data/data";

import arrow from "../assets/icons/arrow2.svg";
import { Link } from "react-router-dom";
import Coffee from "./Coffe";

import mark from "../../public/mark.svg";

import { FaHeart } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className={styles.container}>
            <Link to="/contact" className={styles.footerCTA}>
                <h4>PRECISA DE UM SITE?</h4>
                <h2>Vamos trabalhar juntos <img src={arrow} /></h2>
            </Link>

            <div className={styles.coffeeContainer}>
                <Coffee />
            </div>

            <div className={styles.footer}>
                <div className="line" />
                <div className={styles.footerContent}>
                    <div className={styles.footerCard}>
                        <h3>Informações <br />Contato -</h3>
                        <p>Estou disponível para conversar a qualquer momento. É só me chamar no WhatsApp que eu explico tudo!</p>
                        <div>
                            <p><strong>W</strong>: {data.phone}</p>
                            <p><strong>IN</strong>: @vinigabrieloli</p>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>O que eu<br />faço -</h3>
                        <div className={styles.skills}>
                            <p>Landing Page</p>
                            <p>CRM</p>
                            <p>UI/UX Design</p>
                            <p>Reformulação / Restauração de Sites</p>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>Disponibilidade<br />atual -</h3>
                        <p>Trabalho por demanda, então consigo atender projetos de diferentes portes. Dependendo da complexidade, apenas o prazo de entrega pode ser maior.</p>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>Avaliação e<br />Orçamento -</h3>
                        <p>Avalie através desse site quanto e como ficaria o seu site.</p>
                    </div>
                </div>

                <div className={styles.copywriting}>
                    <img src={mark} />
                    <div>
                        <span>© 2026 Vinícius Gabriel</span>
                        <span>Feito com <FaHeart /></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}