import { useState } from "react";
import type { FormEvent } from "react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                setError("Usuário ou senha incorretos.");
                return;
            }

            const token = await response.text();

            localStorage.setItem("adminToken", token);

            window.location.href = "/admin/blog";
        } catch {
            setError("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">
                    Entrar
                </button>

                {error && <p>{error}</p>}
            </form>
        </main>
    );
}