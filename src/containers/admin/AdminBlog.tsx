import { useEffect, useState } from "react";
import {
    getArticles,
    getArticle,
    deleteArticle
} from "../../services/api";
import CreateArticleForm from "../../components/admin/CreateArticleForm";
import EditArticleForm from "../../components/admin/EditArticleForm";

import styles from "./AdminBlog.module.css";

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

export default function AdminBlog() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

    if (loading) {
        return <main>Carregando artigos...</main>;
    }

    return (
        <main className={styles.container}>
            <CreateArticleForm />

            {error && <p>{error}</p>}
            {editingArticle && (
                <EditArticleForm
                    article={editingArticle}
                    onCancel={() => setEditingArticle(null)}
                    onUpdated={() => {
                        setEditingArticle(null);
                        window.location.reload();
                    }}
                />
            )}

            <h2>Artigos Cadastrados</h2>
            {articles.length === 0 ? (
                <p>Nenhum artigo cadastrado.</p>
            ) : (
                <div className={styles.articles}>
                    {articles.map((article) => (
                        <article className={styles.article} key={article.id}>
                            {article.imageUrl && (
                                <div
                                    className={styles.articleImage}
                                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                                />
                            )}

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
                                        <p>{article.description}</p>
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

                            <div className={styles.articleAdminButtons}>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            const fullArticle = await getArticle(article.id);
                                            setEditingArticle(fullArticle);
                                        } catch {
                                            setError("Não foi possível carregar o artigo.");
                                        }
                                    }}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={async () => {
                                        const confirmed = window.confirm(
                                            "Tem certeza que deseja excluir este artigo?"
                                        );

                                        if (!confirmed) {
                                            return;
                                        }

                                        try {
                                            await deleteArticle(article.id);
                                            setArticles((current) =>
                                                current.filter((item) => item.id !== article.id)
                                            );
                                        } catch {
                                            setError("Não foi possível excluir o artigo.");
                                        }
                                    }}
                                >
                                    Excluir
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}