import styles from "./MenuAdmin.module.css";

import { NavLink } from "react-router-dom";

import { useState } from "react";

function MenuAdmin() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.menuPhone}>
                <span>Painel Administrativo</span>
                <button
                    className={styles.hamburger}
                    onClick={() => setOpen(!open)}
                >
                    MENU   <span>☰</span>
                </button>
            </div>


            <aside className={`${styles.menu} ${open ? styles.open : ""
                }`}>
                <div className={styles.phoneOptions}>
                    <span>Painel Administrativo</span>

                    <button
                        className={styles.hamburger}
                        onClick={() => setOpen(!open)}
                    >
                        FECHAR   <span>☰</span>
                    </button>
                </div>
                <nav className={styles.nav}>
                    <nav className={styles.nav}>
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/admin/blog"
                            className={({ isActive }) => isActive ? styles.active : ""}
                            onClick={() => setOpen(false)}
                        >
                            Blog
                        </NavLink>
                    </nav>
                </nav>

                <button
                    type="button"
                    onClick={() => {
                        localStorage.removeItem("adminToken");
                        window.location.href = "/admin/login";
                    }}
                    className={styles.logoutButton}
                >
                    Sair
                </button>
            </aside >

        </>

    )
}

export default MenuAdmin;
