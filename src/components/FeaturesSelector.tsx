import { useEffect, useState } from "react";

import {
    DndContext,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";

import styles from "./FeaturesSelector.module.css";

type FeatureType = "optional" | "recommended" | "required";

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
        type: "required",
        selected: true,
    },
    {
        id: 2,
        title: "Acompanhamento de 15 dias",
        description: "Acompanhamento para mudanças no site durante 15 dias.",
        price: 99,
        type: "recommended",
        selected: true,
    },
    {
        id: 3,
        title: "Páginas complexas",
        description: "Adiciona mais diversidade de páginas ao site.",
        price: 107,
        type: "recommended",
        selected: true,
    },
    {
        id: 4,
        title: "Autonomia para mudanças no site",
        description: "Adiciona formas de edição  no próprio site.",
        price: 154,
        type: "optional",
        selected: false,
    },
    {
        id: 5,
        title: "Blog ou área de notícias",
        description: "Área para adicionar informações livremente.",
        price: 193,
        type: "optional",
        selected: false,
    },
    {
        id: 6,
        title: "Design animado e interativo (Three.js)",
        description: "Animações únicas que deixam o site inesquecível.",
        price: 149,
        type: "optional",
        selected: false,
    },
];

function Card({
    feature,
    available,
}: {
    feature: Feature;
    available: boolean;
}) {
    const disabled = feature.type === "required";

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: feature.id,
        disabled,
    });

    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`${styles.card} ${available ? styles.availableCard : ""
                }`}
        >
            <div className={styles.texts}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
            </div>

            <span>R${feature.price}</span>
        </div>
    );
}

function Column({
    id,
    title,
    items,
    available,
}: {
    id: string;
    title: string;
    items: Feature[];
    available: boolean;
}) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`${styles.column} ${isOver ? styles.over : ""}`}
        >
            <h2>{title}</h2>

            {items.map((feature) => (
                <Card
                    key={feature.id}
                    feature={feature}
                    available={available}
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

    function handleDragEnd(event: DragEndEvent) {
        if (!event.over) return;

        const destination = event.over.id;

        const newFeatures = features.map((feature) => {
            if (feature.id !== event.active.id) {
                return feature;
            }

            if (feature.type === "required") {
                return feature;
            }

            return {
                ...feature,
                selected: destination === "selected",
            };
        });

        updateFeatures(newFeatures);
    }

    const total = selected.reduce(
        (sum, item) => sum + item.price,
        0
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className={styles.container}>
                <Column
                    id="available"
                    title="Disponíveis"
                    items={available}
                    available={true}
                />

                <Column
                    id="selected"
                    title="Selecionados"
                    items={selected}
                    available={false}
                />
            </div>

            <h2 className={styles.total}>
                Total: R${total}
            </h2>
        </DndContext>
    );
}