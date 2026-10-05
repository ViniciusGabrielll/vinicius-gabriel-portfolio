import { Outlet } from "react-router-dom";
import MenuAdmin from "../components/admin/menuAdmin";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <MenuAdmin />

      <main>
        <Outlet />
      </main>
    </div>
  );
}