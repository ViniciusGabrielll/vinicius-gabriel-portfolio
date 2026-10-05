import { useState } from "react";
import type { FormEvent } from "react";
import {
    createArticle,
    uploadArticleImage,
    uploadArticleFile
} from "../../services/api";

interface RelatedLink {
    title: string;
    url: string;
}

export default function CreateArticleForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [readingTime, setReadingTime] = useState(1);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const [tags, setTags] = useState([""]);
    const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([]);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        setTags((current) => current.filter((_, tagIndex) => tagIndex !== index));
    }

    function addRelatedLink() {
        if (relatedLinks.length < 3) {
            setRelatedLinks((current) => [
                ...current,
                { title: "", url: "" }
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

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const article = await createArticle({
                title,
                description,
                readingTime,
                content,
                tags: tags.filter((tag) => tag.trim() !== ""),
                relatedLinks: relatedLinks.filter(
                    (link) => link.title.trim() !== "" && link.url.trim() !== ""
                )
            });

            if (image) {
                await uploadArticleImage(article.id, image);
            }

            if (file) {
                await uploadArticleFile(article.id, file);
            }

            setTitle("");
            setDescription("");
            setReadingTime(1);
            setContent("");
            setImage(null);
            setFile(null);
            setTags([""]);
            setRelatedLinks([]);

            setMessage("Artigo criado com sucesso.");
        } catch {
            setError("Não foi possível criar o artigo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2>Novo artigo</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="readingTime">
                        Tempo de leitura (minutos)
                    </label>
                    <input
                        id="readingTime"
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
                    <label htmlFor="content">Conteúdo</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
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
                                    updateTag(index, event.target.value)
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
                        <button type="button" onClick={addTag}>
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
                                onClick={() => removeRelatedLink(index)}
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    {relatedLinks.length < 3 && (
                        <button type="button" onClick={addRelatedLink}>
                            Adicionar link
                        </button>
                    )}
                </div>

                <div>
                    <label htmlFor="image">Imagem do artigo</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            setImage(event.target.files?.[0] ?? null);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="file">Arquivo para download</label>
                    <input
                        id="file"
                        type="file"
                        onChange={(event) => {
                            setFile(event.target.files?.[0] ?? null);
                        }}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Criando..." : "Criar artigo"}
                </button>

                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </form>
        </section>
    );
}