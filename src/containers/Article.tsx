import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, getArticles } from "../services/api";
import blogStyles from "./Blog.module.css";
import styles from "./Article.module.css";
import { LuArrowLeft, LuArrowUpRight, LuDownload } from "react-icons/lu";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

interface ArticleSummary {
    id: number;
    title: string;
    description: string;
    readingTime: number;
    createdAt: string;
    imageUrl: string | null;
    tags: {
        name: string;
    }[];
}

export default function Article() {

    const { id } = useParams();

    const [article, setArticle] = useState<ArticleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [moreArticles, setMoreArticles] = useState<ArticleSummary[]>([]);

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

    useEffect(() => {
        async function loadMoreArticles() {
            try {
                const data: ArticleSummary[] = await getArticles();

                const recentArticles = data
                    .filter((item) => item.id !== Number(id))
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .slice(0, 4);

                setMoreArticles(recentArticles);
            } catch {
                setMoreArticles([]);
            }
        }

        if (id) {
            loadMoreArticles();
        }
    }, [id]);

    if (loading) {
        return <main className={blogStyles.carregando}>Carregando artigo...</main>;
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
        <main className={styles.container}>
            <Link to="/blog" className={styles.backBtn}><LuArrowLeft /></Link>

            <header className={styles.articleHeader}>

                <h1>{article.title}</h1>

                <p>{article.description}</p>
                <div className={styles.articleInfo}>
                    <span>{date}</span>
                    <span>{article.readingTime} min de leitura</span>
                </div>
            </header>

            <div
                className={styles.articleImage}
                style={{
                    backgroundImage: `url(${article.imageUrl})`
                }}
            />

            <div className={styles.articleContent}>
                <article className={styles.content}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {article.content}
                    </ReactMarkdown>
                </article>

                {article.fileUrl && (
                    <a
                        href={article.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.downloadBtn}
                    >
                        <LuDownload />Baixar arquivo
                    </a>
                )}
            </div>

            {article.relatedLinks.length > 0 && (
                <section className={styles.linksSection}>
                    <h2>Conteúdos relacionados</h2>

                    <div className={styles.linksContainer}>
                        {article.relatedLinks.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                title={link.url}
                            >
                                <LuArrowUpRight size={20} />
                                <div>
                                    <span>{link.title}</span>
                                    <small>{new URL(link.url).hostname}</small>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}


            {moreArticles.length > 0 && (
                <section className={styles.moreArticles}>
                    <div className={styles.moreArticlesHeader}>
                        <h2>Mais artigos</h2>

                        <Link to="/blog">
                            Ver todos os artigos
                        </Link>
                    </div>

                    <div className={blogStyles.articles}>
                        {moreArticles.map((item) => (
                            <Link
                                to={`/blog/${item.id}`}
                                className={blogStyles.article}
                                key={item.id}
                            >
                                <div
                                    className={blogStyles.articleImage}
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`
                                    }}
                                />

                                <div className={styles.articleContent}>
                                    <div>
                                        <div className={blogStyles.articleInfo}>
                                            <span>
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleDateString("pt-BR")}
                                            </span>

                                            <span>
                                                {item.readingTime} min de leitura
                                            </span>
                                        </div>

                                        <h3 className={blogStyles.articleTitle}>
                                            {item.title}
                                        </h3>

                                        <p className={blogStyles.articleDescription}>
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className={blogStyles.articleTags}>
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag.name}
                                                className={blogStyles.articleTag}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link to="/blog" className={styles.pagination}>
                        <span>
                            Ver todos
                        </span>
                    </Link>
                </section>
            )}

        </main >
    );
}