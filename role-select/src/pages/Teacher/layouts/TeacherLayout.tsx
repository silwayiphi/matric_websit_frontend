// src/pages/Teacher/layouts/TeacherLayout.tsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Home, BookOpen, Users, FileText, BarChart3, Settings, LogOut } from "lucide-react";
import "./TeacherLayout.css";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/TeacherLogin");

  const navItems = [
    { path: "/teacher/dashboard", label: "Dashboard", icon: Home },
    { path: "/teacher/subjects", label: "My Subjects", icon: BookOpen },
    { path: "/teacher/students", label: "Students", icon: Users },
    { path: "/teacher/lessons", label: "My Lessons", icon: FileText },
    { path: "/teacher/performance", label: "Performance", icon: BarChart3 },
    { path: "/teacher/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="teacher-layout">
      {/* Sidebar ONLY */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="avatar">AS</div>
          <div>
            <h2>Mr Mathonsi</h2>
            <p>Grade 12 Maths Teacher</p>
          </div>
        </div>

        <nav className="nav">
          {navItems.map(({path,label,icon:Icon})=>(
            <NavLink key={path} to={path} className={({isActive})=>`nav-item ${isActive?"active":""}`}>
              <Icon size={18}/> {label}
            </NavLink>
          ))}
        </nav>

        <div className="logout">
          <button className="btn danger full" onClick={handleLogout}>
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Main content = page body */}
      <main className="main">
        <Outlet />  {/* Teacher pages render here */}
      </main>
    </div>
  );
}