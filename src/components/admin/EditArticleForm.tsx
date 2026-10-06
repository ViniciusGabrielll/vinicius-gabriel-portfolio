import { useState } from "react";
import type { FormEvent } from "react";
import {
    updateArticle,
    uploadArticleImage,
    uploadArticleFile
} from "../../services/api";

import styles from "./EditArticleForm.module.css";

interface RelatedLink {
    title: string;
    url: string;
}

interface Article {
    id: number;
    title: string;
    description: string;
    readingTime: number;
    content: string;
    tags: {
        name: string;
    }[];
    relatedLinks: RelatedLink[];
}

interface EditArticleFormProps {
    article: Article;
    onCancel: () => void;
    onUpdated: () => void;
}

export default function EditArticleForm({
    article,
    onCancel,
    onUpdated
}: EditArticleFormProps) {
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const [readingTime, setReadingTime] = useState(article.readingTime);
    const [content, setContent] = useState(article.content);

    const [tags, setTags] = useState(
        article.tags.length > 0
            ? article.tags.map((tag) => tag.name)
            : [""]
    );

    const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>(
        article.relatedLinks ?? []
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);

    function updateTag(index: number, value: string) {
        setTags((current) =>
            current.map((tag, tagIndex) =>
                tagIndex === index ? value : tag
            )
        );
    }

    function addTag() {
        if (tags.length < 3) {
            setTags((current) => [...current, ""]);
        }
    }

    function removeTag(index: number) {
        setTags((current) =>
            current.filter((_, tagIndex) => tagIndex !== index)
        );
    }

    function addRelatedLink() {
        if (relatedLinks.length < 3) {
            setRelatedLinks((current) => [
                ...current,
                {
                    title: "",
                    url: ""
                }
            ]);
        }
    }

    function updateRelatedLink(
        index: number,
        field: keyof RelatedLink,
        value: string
    ) {
        setRelatedLinks((current) =>
            current.map((link, linkIndex) =>
                linkIndex === index
                    ? { ...link, [field]: value }
                    : link
            )
        );
    }

    function removeRelatedLink(index: number) {
        setRelatedLinks((current) =>
            current.filter((_, linkIndex) => linkIndex !== index)
        );
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await updateArticle(article.id, {
                title,
                description,
                readingTime,
                content,
                tags: tags.filter((tag) => tag.trim() !== ""),
                relatedLinks: relatedLinks.filter(
                    (link) =>
                        link.title.trim() !== "" &&
                        link.url.trim() !== ""
                )
            });

            if (image) {
                await uploadArticleImage(article.id, image);
            }

            if (file) {
                await uploadArticleFile(article.id, file);
            }

            onUpdated();
        } catch {
            setError("Não foi possível atualizar o artigo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={styles.container}>
            <h2>Editar artigo</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="edit-title">Título</label>
                    <input
                        id="edit-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="edit-description">Descrição</label>
                    <textarea
                        id="edit-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="edit-reading-time">
                        Tempo de leitura
                    </label>
                    <input
                        id="edit-reading-time"
                        type="number"
                        min="1"
                        value={readingTime}
                        onChange={(event) =>
                            setReadingTime(Number(event.target.value))
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="edit-content">Conteúdo</label>
                    <textarea
                        id="edit-content"
                        value={content}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <h3>Tags</h3>

                    {tags.map((tag, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={`Tag ${index + 1}`}
                                value={tag}
                                onChange={(event) =>
                                    updateTag(
                                        index,
                                        event.target.value
                                    )
                                }
                            />

                            {tags.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                >
                                    Remover
                                </button>
                            )}
                        </div>
                    ))}

                    {tags.length < 3 && (
                        <button
                            type="button"
                            onClick={addTag}
                        >
                            Adicionar tag
                        </button>
                    )}
                </div>

                <div>
                    <h3>Links relacionados</h3>

                    {relatedLinks.map((link, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Título do link"
                                value={link.title}
                                onChange={(event) =>
                                    updateRelatedLink(
                                        index,
                                        "title",
                                        event.target.value
                                    )
                                }
                            />

                            <input
                                type="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(event) =>
                                    updateRelatedLink(
                                        index,
                                        "url",
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    removeRelatedLink(index)
                                }
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    {relatedLinks.length < 3 && (
                        <button
                            type="button"
                            onClick={addRelatedLink}
                        >
                            Adicionar link
                        </button>
                    )}

                    <div>
                        <label htmlFor="edit-image">Nova imagem</label>
                        <input
                            id="edit-image"
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                                setImage(event.target.files?.[0] ?? null)
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="edit-file">Novo arquivo para download</label>
                        <input
                            id="edit-file"
                            type="file"
                            onChange={(event) =>
                                setFile(event.target.files?.[0] ?? null)
                            }
                        />
                    </div>
                </div>

                {error && <p>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Salvando..."
                        : "Salvar alterações"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className={styles.quitButton}
                >
                    x
                </button>
            </form>
        </section>
    );
}