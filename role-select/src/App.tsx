import { Routes, Route} from "react-router-dom";
import RoleSelect from "./pages/RoleSelect";
import AdminLogin from "./pages/Admin/Login";
import AdminLayout from "./pages/Admin/layouts/AdminLayout";

import AdminDashboard from "./pages/Admin/dashboard";
import Teachers from "./pages/Admin/Teacher";
import Students from "./pages/Admin/Students";
import Content from "./pages/Admin/Content";
import Packages from "./pages/Admin/Packages";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";
import Teacher from "./pages/Teacher/Teacher";

export default function App() {
  return (
    <Routes>


      <Route path="/" element={<RoleSelect />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/teacher" element={<Teacher />} />

      {/* all /admin/* pages inherit the Sidebar via AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="content" element={<Content />} />
        <Route path="packages" element={<Packages />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<div className="page"><h2>Not found</h2></div>} />
    </Routes>
  );
}


