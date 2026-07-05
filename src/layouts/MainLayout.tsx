import { Outlet } from "react-router-dom";
import Menu from "../components/menu";

export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}