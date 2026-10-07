import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../services/api";

import styles from "./Blog.module.css";
import { LuSearch } from "react-icons/lu";

interface Article {
    id: number;
    title: string;
    description: string;
    readingTime: number;
    createdAt: string;
    imageUrl: string | null;
    content: string;
    tags: {
        name: string;
    }[];
    relatedLinks: {
        title: string;
        url: string;
    }[];
}

export default function Blog() {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [latestArticleIndex, setLatestArticleIndex] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState("Todos");

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadArticles() {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch {
                setError("Não foi possível carregar os artigos.");
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, []);

    useEffect(() => {
        if (articles.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setLatestArticleIndex((current) =>
                (current + 1) % articles.length
            );
        }, 15000);

        return () => clearInterval(interval);
    }, [articles]);

    if (loading) {
        return <main>Carregando artigos...</main>;
    }

    if (error) {
        return <main>{error}</main>;
    }

    const sortedArticles = [...articles].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );

    const latestArticle = sortedArticles[latestArticleIndex];

    const tags = Array.from(
        new Set(
            articles.flatMap((article) =>
                article.tags.map((tag) => tag.name)
            )
        )
    );

    const filteredArticles = sortedArticles.filter((article) => {
        const searchTerm = search.toLowerCase().trim();

        const matchesSearch =
            article.title.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm) ||
            article.tags.some((tag) =>
                tag.name.toLowerCase().includes(searchTerm)
            );

        const matchesTag =
            selectedTag === "Todos" ||
            article.tags.some(
                (tag) => tag.name === selectedTag
            );

        return matchesSearch && matchesTag;
    });

    const articlesPerPage = 6;

    const totalPages = Math.ceil(
        filteredArticles.length / articlesPerPage
    );

    const startIndex = (currentPage - 1) * articlesPerPage;

    const currentArticles = filteredArticles.slice(
        startIndex,
        startIndex + articlesPerPage
    );

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                {latestArticle && (
                    <Link
                        key={latestArticle.id}
                        to={`/blog/${latestArticle.id}`}
                        className={styles.latestArticle}
                    >
                        <div className={styles.progress}>
                            <div className={styles.progressBar} />
                        </div>
                        <div
                            className={styles.latestArticleImage}
                            style={{
                                backgroundImage: `url(${latestArticle.imageUrl})`
                            }}
                        />

                        <div className={styles.latestArticleContent}>

                            <div>
                                <h2>{latestArticle.title}</h2>

                                <p>{latestArticle.description}</p>
                            </div>

                            <div className={styles.latestArticleInfo}>
                                <span>
                                    {new Date(
                                        latestArticle.createdAt
                                    ).toLocaleDateString("pt-BR")}
                                </span>

                                <span>
                                    {latestArticle.readingTime} min de leitura
                                </span>
                            </div>
                        </div>
                    </Link>
                )}
            </header>

            <div className={styles.filters}>
                <div
                    className={styles.searchContainer}
                    onClick={() => searchInputRef.current?.focus()}
                >
                    <div className={styles.searchIcon}>
                        <LuSearch />
                    </div>
                    <input
                        ref={searchInputRef}
                        className={styles.searchInput}
                        type="search"
                        placeholder="Pesquisar artigos..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className={styles.tagsFilter}>
                    <button
                        type="button"
                        className={
                            `${styles.tag} 
                                ${selectedTag === "Todos" ? styles.activeFilter : ""
                            }`}

                        onClick={() => setSelectedTag("Todos")}
                    >
                        Todos
                    </button>

                    {tags.map((tag) => (
                        <button
                            type="button"
                            key={tag}
                            className={
                                `${styles.tag} 
                                ${selectedTag === tag ? styles.activeFilter : ""
                                }`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {
                filteredArticles.length === 0 ? (
                    <p>Nenhum artigo encontrado.</p>
                ) : (
                    <section className={styles.articles}>
                        {currentArticles.map((article) => (
                            <Link to={`/blog/${article.id}`} className={styles.article} key={article.id}>
                                <div
                                    className={styles.articleImage}
                                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                                />

                                <div className={styles.articleContent}>
                                    <div>
                                        <div className={styles.articleInfo}>
                                            <span>
                                                {new Date(article.createdAt).toLocaleDateString("pt-BR")}
                                            </span>
                                            <span>{article.readingTime} min de leitura</span>
                                        </div>
                                        <div>
                                            <h3 className={styles.articleTitle}>{article.title}</h3>
                                            <p className={styles.articleDescription}>{article.description}</p>
                                        </div>
                                    </div>

                                    <div className={styles.articleTags}>
                                        {article.tags.map((tag, index) => (
                                            <span key={index} className={styles.articleTag}>
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                )
            }

            <div className={styles.pagination}>
                <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span>
                    {currentPage}/{totalPages}
                </span>

                <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === totalPages}
                >
                    Próximo
                </button>
            </div>
        </main >
    );
}