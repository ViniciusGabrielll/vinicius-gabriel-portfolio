import { useEffect, useState } from "react";

import styles from "./FeaturesSelector.module.css";

type FeatureType = "opicional" | "recomendado" | "obrigatório";

interface Feature {
    id: number;
    title: string;
    description: string;
    price: number;
    type: FeatureType;
    selected: boolean;
}

const initialFeatures: Feature[] = [
    {
        id: 1,
        title: "Landing Page",
        description: "Página inicial do site focada em converter clientes.",
        price: 297,
        type: "obrigatório",
        selected: true,
    },
    {
        id: 2,
        title: "Acompanhamento de 15 dias",
        description: "Acompanhamento para mudanças no site durante 15 dias.",
        price: 99,
        type: "recomendado",
        selected: true,
    },
    {
        id: 3,
        title: "Páginas complexas",
        description: "Adiciona mais diversidade de páginas ao site.",
        price: 107,
        type: "recomendado",
        selected: true,
    },
    {
        id: 4,
        title: "Autonomia para mudanças no site",
        description: "Adiciona formas de edição  no próprio site.",
        price: 154,
        type: "opicional",
        selected: false,
    },
    {
        id: 5,
        title: "Blog ou área de notícias",
        description: "Área para adicionar informações livremente.",
        price: 193,
        type: "opicional",
        selected: false,
    },
    {
        id: 6,
        title: "Design animado e interativo (Three.js)",
        description: "Animações únicas que deixam o site inesquecível.",
        price: 149,
        type: "opicional",
        selected: false,
    },
];

function Card({
    feature,
    available,
    onToggle,
}: {
    feature: Feature;
    available: boolean;
    onToggle: (id: number) => void;
}) {
    const disabled = feature.type === "obrigatório";

    return (
        <div
            className={`${styles.card} ${available ? styles.availableCard : ""
                }`}
            onClick={() => onToggle(feature.id)}
        >
            <div className={styles.texts}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <p
                    style={{
                        color:
                            feature.type === "obrigatório"
                                ? "var(--primary-color)"
                                : "var(--secondary-text-color)",
                        fontWeight:
                            feature.type === "obrigatório"
                                ? "bold"
                                : "normal",
                    }}
                >
                    {feature.type}
                </p>
            </div>

            <span>R${feature.price}</span>
        </div>
    );
}

function Column({
    title,
    items,
    available,
    onToggle,
}: {
    title: string;
    items: Feature[];
    available: boolean;
    onToggle: (id: number) => void;
}) {
    return (
        <div className={styles.column}>
            <h2>{title}</h2>

            {items.map((feature) => (
                <Card
                    key={feature.id}
                    feature={feature}
                    available={available}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

interface FeaturesSelectorProps {
    onChange: (features: string[]) => void;
}

export default function FeaturesSelector({
    onChange,
}: FeaturesSelectorProps) {

    useEffect(() => {
        onChange(
            features
                .filter((feature) => feature.selected)
                .map((feature) => feature.title)
        );
    }, []);



    const updateFeatures = (newFeatures: Feature[]) => {
        setFeatures(newFeatures);

        onChange(
            newFeatures
                .filter((feature) => feature.selected)
                .map((feature) => feature.title)
        );
    };
    const [features, setFeatures] =
        useState<Feature[]>(initialFeatures);

    const available = features.filter(
        (feature) => !feature.selected
    );

    const selected = features.filter(
        (feature) => feature.selected
    );

    const total = selected.reduce(
        (sum, item) => sum + item.price,
        0
    );

    function toggleFeature(id: number) {
        const newFeatures = features.map((feature) => {
            if (feature.id !== id) return feature;

            if (feature.type === "obrigatório") {
                return feature;
            }

            return {
                ...feature,
                selected: !feature.selected,
            };
        });

        updateFeatures(newFeatures);
    }

    return (
        <>
            <div className={styles.container}>
                <Column
                    title="Disponíveis"
                    items={available}
                    available={true}
                    onToggle={toggleFeature}
                />

                <Column
                    title="Selecionados"
                    items={selected}
                    available={false}
                    onToggle={toggleFeature}
                />
            </div>

            <h2 className={styles.total}>
                Total: R${total}
            </h2>
        </>
    );
}