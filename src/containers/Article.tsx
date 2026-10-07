import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../services/api";

interface ArticleData {
    id: number;
    title: string;
    description: string;
    readingTime: number;
    createdAt: string;
    imageUrl: string | null;
    fileUrl: string | null;
    content: string;
    tags: {
        name: string;
    }[];
    relatedLinks: {
        title: string;
        url: string;
    }[];
}

export default function Article() {
    const { id } = useParams();

    const [article, setArticle] = useState<ArticleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadArticle() {
            if (!id) {
                setError("Artigo não encontrado.");
                setLoading(false);
                return;
            }

            try {
                const data = await getArticle(Number(id));
                setArticle(data);
            } catch {
                setError("Não foi possível carregar o artigo.");
            } finally {
                setLoading(false);
            }
        }

        loadArticle();
    }, [id]);

    if (loading) {
        return <main>Carregando artigo...</main>;
    }

    if (error || !article) {
        return (
            <main>
                <p>{error || "Artigo não encontrado."}</p>
                <Link to="/blog">Voltar para o blog</Link>
            </main>
        );
    }

    const date = new Date(article.createdAt).toLocaleDateString("pt-BR");

    return (
        <main>
            <Link to="/blog">← Voltar para o blog</Link>

            <article>
                {article.imageUrl && (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                    />
                )}

                <header>
                    <span>{date}</span>
                    <span>{article.readingTime} min de leitura</span>

                    <h1>{article.title}</h1>

                    <p>{article.description}</p>
                </header>

                {article.tags.length > 0 && (
                    <div>
                        {article.tags.map((tag) => (
                            <span key={tag.name}>
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                <div>
                    {article.content}
                </div>

                {article.fileUrl && (
                    <a
                        href={article.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Baixar arquivo
                    </a>
                )}

                {article.relatedLinks.length > 0 && (
                    <section>
                        <h2>Links relacionados</h2>

                        {article.relatedLinks.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.title}
                            </a>
                        ))}
                    </section>
                )}
            </article>
        </main>
    );
}