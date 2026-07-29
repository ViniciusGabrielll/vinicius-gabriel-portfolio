import { useState } from "react";
import styles from "./AssessmentAndQuote.module.css";
import BudgetSlider from "./BudgetSlider";
import FeaturesSelector from "../components/FeaturesSelector";
import { data } from "../data/data";

import site from "../assets/icons/site.svg";
import adjust from "../assets/icons/adjust.svg";
import fix from "../assets/icons/fix.svg";


function AssessmentAndQuote() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const TOTAL_STEPS = 5;

  const [assessment, setAssessment] = useState({
    need: "",
    budget: {
      min: 500,
      max: 900,
    },
    features: [] as string[],
    name: "",
    phone: "",
    company: "",
    instagram: "",
    segment: "",
    source: "",
  });

  const sendWhatsapp = () => {
    const message = `
📋 *Nova Solicitação de Orçamento*

👤 *Dados do Cliente*

• Nome: ${assessment.name}
• WhatsApp: +55 ${assessment.phone}
• Empresa: ${assessment.company || "Não informado"}
• Instagram: ${assessment.instagram || "Não informado"}
• Segmento: ${assessment.segment}
• Como conheceu: ${assessment.source || "Não informado"}

💼 *Projeto*

• Necessidade: ${assessment.need}

💰 *Investimento Pretendido*

• Entre R$ ${assessment.budget.min} e R$ ${assessment.budget.max}

🚀 *Recursos Desejados*

${assessment.features.map((feature) => `• ${feature}`).join("\n")}

Aguardo seu retorno! 😄
`;

    window.open(
      `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className={styles.container}>
      {step === 0 && (
        <div className={styles.contentContainer}>
          <div className={styles.stepTitle}>
            <h2>Avaliação e Orçamento</h2>
            <p>
              Este é um breve questionário para entender suas necessidades e
              definir a melhor solução para o seu projeto. Clique em começar
              para dar início à avaliação.
            </p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={styles.contentContainer}>
          <div className={styles.stepTitle}>
            <h2>O que você precisa?</h2>
            <p>Escolha a opção que melhor descreve o que você precisa no momento.</p>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.optionCard} ${assessment.need === "Criar um site" ? styles.selected : ""
                }`}
              onClick={() =>
                setAssessment({
                  ...assessment,
                  need: "Criar um site",
                })
              }
            >
              <div className={styles.btnImg}>
                <img src={site} />
              </div>
              <div className={styles.btnContent}>
                <h3>Criar um site</h3>
                <p>Preciso de um site completo do zero.</p>
              </div>
            </button>
            <button
              className={`${styles.optionCard} ${assessment.need === "Corrigir problemas em um site"
                ? styles.selected
                : ""
                }`}
              onClick={() =>
                setAssessment({
                  ...assessment,
                  need: "Corrigir problemas em um site",
                })
              }
            >
              <div className={styles.btnImg}>
                <img src={adjust} />
              </div>
              <div className={styles.btnContent}>
                <h3>Corrigir problemas em um site</h3>
                <p>Meu site tem erros ou não está funcionando como deveria.</p>
              </div>
            </button>
            <button
              className={`${styles.optionCard} ${assessment.need === "Reformular um site" ? styles.selected : ""
                }`}
              onClick={() =>
                setAssessment({
                  ...assessment,
                  need: "Reformular um site",
                })
              }
            >
              <div className={styles.btnImg}>
                <img src={fix} />
              </div>
              <div className={styles.btnContent}>
                <h3>Reformular um site</h3>
                <p>Quero dar um novo visual ou melhorar meu site atual.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.contentContainer}>
          <div className={styles.investContainer}>
            <div className={styles.stepTitle}>
              <h2>Quanto pretende investir?</h2>
              <p>Defina uma faixa de investimento que esteja de acordo com o que você pretende investir no seu projeto.</p>
            </div>
            <BudgetSlider
              onChange={(budget) =>
                setAssessment({
                  ...assessment,
                  budget,
                })
              }
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.contentContainer}>
          <div className={styles.stepTitle}>
            <h2>O que o seu site precisa ter?</h2>
            <p>Clique em um serviço para muda-lo de status</p>
          </div>
          <FeaturesSelector
            onChange={(features) =>
              setAssessment((prev) => ({
                ...prev,
                features,
              }))
            }
          />
        </div>
      )}

      {step === 4 && (
        <div className={styles.contentContainer}>
          <div className={styles.aboutContainer}>
            <div className={styles.stepTitle}>
              <h2>Me fale sobre você</h2>
              <p>
                Preencha seus dados para que eu possa entender melhor sobre o seu
                projeto.
              </p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={assessment.name}
                  onChange={(e) =>
                    setAssessment((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label>WhatsApp *</label>

                <div className={styles.phoneInput}>
                  <span>+55</span>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={assessment.phone}
                    onChange={(e) =>
                      setAssessment((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Nome da Empresa (opcional)</label>
                <input
                  type="text"
                  placeholder="Nome da sua empresa"
                  value={assessment.company}
                  onChange={(e) =>
                    setAssessment((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label>
                  Instagram da Empresa / Pessoal (opcional)
                </label>
                <input
                  type="text"
                  placeholder="@Seu_Instagram"
                  value={assessment.instagram}
                  onChange={(e) =>
                    setAssessment((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Qual o segmento do seu negócio? *</label>

                <select
                  value={assessment.segment}
                  onChange={(e) =>
                    setAssessment((prev) => ({
                      ...prev,
                      segment: e.target.value,
                    }))
                  }
                >
                  <option value="">Selecione o segmento</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Clínica">Clínica</option>
                  <option value="Advocacia">Advocacia</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Como você ouviu falar de mim? (opcional)</label>

                <input
                  type="text"
                  placeholder="Ex: Google, Instagram, Indicação..."
                  value={assessment.source}
                  onChange={(e) =>
                    setAssessment((prev) => ({
                      ...prev,
                      source: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.navigation}>
        {step > 0 && (
          <button
            onClick={previousStep}
            className={styles.previousBtn}
          >
            Anterior
          </button>
        )}

        <button
          onClick={step === 4 ? sendWhatsapp : nextStep}
          className={styles.nextBtn}
        >
          {step === 4 ? "Enviar pelo WhatsApp" : step === 0 ? "Começar" : "Próximo"}
        </button>
      </div>
    </div>
  );
}

export default AssessmentAndQuote;