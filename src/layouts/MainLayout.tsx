import { Outlet } from "react-router-dom";
import Menu from "../components/temp";

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