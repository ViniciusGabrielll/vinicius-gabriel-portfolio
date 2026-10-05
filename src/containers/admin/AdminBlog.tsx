import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
    getArticles,
    getArticle,
    deleteArticle
} from "../../services/api";
import CreateArticleForm from "../../components/admin/CreateArticleForm";
import EditArticleForm from "../../components/admin/EditArticleForm";

import styles from "./Admin.module.css";
import MenuAdmin from "../../components/admin/menuAdmin";

interface Article {
    id: number;
    title: string;
    description: string;
    readingTime: number;
    createdAt: string;
    imageUrl: string | null;
}

interface FullArticle extends Article {
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
    const token = localStorage.getItem("adminToken");

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingArticle, setEditingArticle] = useState<FullArticle | null>(null);

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

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    if (loading) {
        return <main>Carregando artigos...</main>;
    }

    return (
        <main className={styles.admin}>
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
                <div>
                    {articles.map((article) => (
                        <article key={article.id}>
                            {article.imageUrl && (
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                />
                            )}

                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <span>{article.readingTime} min de leitura</span>
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
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}