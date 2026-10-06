import { Navigate, Outlet } from "react-router-dom";
import MenuAdmin from "../components/admin/MenuAdmin";

export default function AdminLayout() {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return (
    <div style={{ display: "flex" }}>
      <MenuAdmin />

      <main>
        <Outlet />
      </main>
    </div>
  );
}