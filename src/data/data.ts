import projectEquipeCyberTech from "../assets/images/projects/projectEquipeCyberTech.png";
import projectTheraKids from "../assets/images/projects/projectTheraKids.png";
import projectProximo from "../assets/images/projects/projectProximo.png";
import projectSarahLima from "../assets/images/projects/projectSarahLima.png";

const whatsappLink = "https://wa.me/5581985832291";

export const data = {
    phone: "+55 (81) 9 8583-2291",
    whatsappNumber: "5581985832291",
    whatsappLink: whatsappLink,
    instagram: "vinigabrieloli",
    instagramLink: "https://www.instagram.com/vinigabrieloli/",

    projects: [
        {
            image: projectTheraKids,
            title: "Site para a Clínica TheraKids",
            year: "2026",
            link: "https://therakidsmanaus.netlify.app/",
            CTA: "Ver no site",
            textColor: "light",
        },
        {
            image: projectSarahLima,
            title: "Site para a Fisioterapeuta Sarah Lima",
            year: "2026",
            link: "https://therakidsmanaus.netlify.app/",
            CTA: "Ver no site",
            textColor: "dark",
        },
        {
            image: projectEquipeCyberTech,
            title: "Site para Equipe CyberTech",
            year: "2025",
            link: "https://cybertech31168.netlify.app/",
            CTA: "Ver no site",
            textColor: "light",
        },
        {
            image: projectProximo,
            title: "O próximo pode ser o seu",
            year: "",
            link: whatsappLink,
            CTA: "Ir para o WhatsApp",
            textColor: "light",
        }
    ],
}