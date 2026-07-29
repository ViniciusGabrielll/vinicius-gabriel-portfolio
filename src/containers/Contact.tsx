import { useState } from "react";
import Footer from "../components/Footer";
import { data } from "../data/data";
import styles from "./Contact.module.css";

import whatsappBlack from "../assets/icons/whatsappBlack.svg";

function Contact() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const whatsappMessage = `Olá, Vinícius! 

Meu nome: ${name}

Serviço: ${service}

Orçamento: ${budget}

Mensagem:
${message}`;

    const whatsappUrl = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className={styles.container}>
        <article className={styles.ContactContainer}>

          <section className={styles.informationsContainer}>
            <div>
              <h4>CONTATO</h4>
              <h3>
                Entre em contato —<br />
                vamos trabalhar juntos.
              </h3>
            </div>

            <a href={data.whatsappLink}>
              <h4>NÚMERO</h4>
              <p>+55 (81) 9 8583-2291</p>
            </a>

            <a href={data.instagramLink}>
              <h4>INSTAGRAM</h4>
              <p>@{data.instagram}</p>
            </a>
          </section>

          <section className={styles.formContainer}>

            <h4 className={styles.formTitle}>Me conta a sua ideia e podemos construir ela juntos</h4>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.inputContainer}>
                <label>Seu Nome</label>

                <input
                  type="text"
                  placeholder="Qual é o seu nome?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className={styles.selectsContainer}>

                <div className={styles.inputContainer}>
                  <label>Serviço</label>

                  <select
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      No que você está interessado?
                    </option>

                    <option value="Preciso de um site">
                      Preciso de um site
                    </option>

                    <option value="Quero arrumar o meu site">
                      Quero arrumar o meu site
                    </option>

                    <option value="Preciso de um CRM">
                      Preciso de um CRM
                    </option>

                    <option value="Só quero dar um oi!">
                      Só quero dar um oi!
                    </option>

                    <option value="Outro">
                      Outro
                    </option>
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <label>Orçamento</label>

                  <select
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Qual é seu orçamento?
                    </option>

                    <option value="R$200 - R$500">
                      R$200 - R$500
                    </option>

                    <option value="R$500 - R$1000">
                      R$500 - R$1000
                    </option>

                    <option value="R$1000 - R$1500">
                      R$1000 - R$1500
                    </option>

                    <option value="R$1500 ou mais">
                      R$1500 ou mais
                    </option>
                  </select>
                </div>

              </div>

              <div className={styles.inputContainer}>
                <label>Mensagem</label>

                <input
                  type="text"
                  placeholder="Qual é a sua mensagem?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </div>

              <button className={styles.submitBtn} type="submit">
                <img src={whatsappBlack} alt="WhatsApp" />
                <p>Enviar mensagem</p>
              </button>

            </form>
          </section>

        </article>

        <Footer />
      </div>
    </>
  );
}

export default Contact;