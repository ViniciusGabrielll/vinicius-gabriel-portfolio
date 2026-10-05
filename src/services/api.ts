const API_URL = "http://localhost:8080/api";

export async function getArticles() {
    const response = await fetch(`${API_URL}/articles`);

    if (!response.ok) {
        throw new Error("Não foi possível carregar os artigos.");
    }

    return response.json();
}

export async function getArticle(id: number) {
    const response = await fetch(`${API_URL}/articles/${id}`);

    if (!response.ok) {
        throw new Error("Não foi possível carregar o artigo.");
    }

    return response.json();
}

export async function createArticle(data: unknown) {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Não foi possível criar o artigo.");
    }

    return response.json();
}

export async function updateArticle(
    id: number,
    data: unknown
) {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Não foi possível atualizar o artigo.");
    }

    return response.json();
}

export async function uploadArticleImage(
    articleId: number,
    file: File
) {
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
        `${API_URL}/articles/${articleId}/image`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Não foi possível enviar a imagem.");
    }

    return response.text();
}

export async function uploadArticleFile(
    articleId: number,
    file: File
) {
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
        `${API_URL}/articles/${articleId}/file`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Não foi possível enviar o arquivo.");
    }

    return response.text();
}

export async function deleteArticle(id: number) {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Não foi possível excluir o artigo.");
    }
}