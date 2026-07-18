import styles from "./Footer.module.css";

import { data } from "../data/data";

import arrow from "../assets/icons/arrow2.svg";
import { Link } from "react-router-dom";
import Coffee from "./Coffe";


export default function Footer() {
    return (
        <footer className={styles.container}>
            <Link to="/contact" className={styles.footerCTA}>
                <h4>PRECISA DE UM SITE?</h4>
                <h1>Vamos trabalhar juntos <img src={arrow} /></h1>
            </Link>

            <Coffee />

            <div className={styles.footer}>
                <div className="line" />
                <div className={styles.footerContent}>
                    <div className={styles.footerCard}>
                        <h3>Informações Contato -</h3>
                        <p>Estou disponível para conversar a qualquer momento. É só me chamar no WhatsApp que eu explico tudo!</p>
                        <div>
                            <p><strong>W</strong>: {data.phone}</p>
                            <p><strong>IN</strong>: @vinigabrieloli</p>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>Informações Contato -</h3>
                        <p>Estou disponível para conversar a qualquer momento. É só me chamar no WhatsApp que eu explico tudo!</p>
                        <div>
                            <p><strong>W</strong>: {data.phone}</p>
                            <p><strong>IN</strong>: @vinigabrieloli</p>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>Informações Contato -</h3>
                        <p>Estou disponível para conversar a qualquer momento. É só me chamar no WhatsApp que eu explico tudo!</p>
                        <div>
                            <p><strong>W</strong>: {data.phone}</p>
                            <p><strong>IN</strong>: @vinigabrieloli</p>
                        </div>
                    </div>
                    <div className={styles.footerCard}>
                        <h3>Informações Contato -</h3>
                        <p>Estou disponível para conversar a qualquer momento. É só me chamar no WhatsApp que eu explico tudo!</p>
                        <div>
                            <p><strong>W</strong>: {data.phone}</p>
                            <p><strong>IN</strong>: @vinigabrieloli</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}