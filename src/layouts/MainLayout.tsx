import { Outlet } from "react-router-dom";
import Menu from "../components/Menu.tsx";

export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <main>
        <Outlet />
      </main>
    </div>
  );
}