import { NavLink } from "react-router-dom";
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand"><span>Admin</span></div>

      <nav className="nav">
        <Item to="/admin" label="Home" icon={<HomeIcon />} end />
        <Item to="/admin/teachers" label="Teachers Management" icon={<TeachersIcon />} />
        <Item to="/admin/students" label="Students Management" icon={<StudentsIcon />} />
        <Item to="/admin/content" label="Content Management" icon={<ContentIcon />} />
        <Item to="/admin/packages" label="Packages Management" icon={<PackagesIcon />} />
        <Item to="/admin/reports" label="Payments & Reports" icon={<ReportsIcon />} />
        <Item to="/admin/settings" label="System Settings" icon={<SettingsIcon />} />
        <Item to="/admin/logout" label="Logout" icon={undefined}  />
      </nav>
    </aside>
  );
}

function Item({
  to, label, icon, end
}: { to: string; label: string; icon: React.ReactNode; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

/* tiny inline icons */
function HomeIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3 3 10h3v11h6v-7h0v7h6V10h3z"/></svg>); }
function TeachersIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8v-1a7 7 0 0 1 14 0v1z"/></svg>); }
function StudentsIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 3 10 6-10 6L2 9z"/><path fill="currentColor" d="M22 12v6h-2v-5.1z"/></svg>); }
function ContentIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v4H4zm0 6h16v4H4zm0 6h16v4H4z"/></svg>); }
function PackagesIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 9 4-9 4L3 6l9-4Zm9 6v10l-9 4V12ZM3 8v10l9 4V12Z"/></svg>); }
function ReportsIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h10l4 4v14H5z"/><path fill="currentColor" d="M9 13h2v5H9zm4-3h2v8h-2zM7 16h2v2H7z"/></svg>); }
function SettingsIcon(){ return (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8a4 4 0 1 1-4 4a4 4 0 0 1 4-4m8.94 4a7 7 0 0 0-.14-1.5l2.11-1.65l-2-3.46l-2.49 1a7 7 0 0 0-2.6-1.5L15.5 1h-4l-.32 2.89a7 7 0 0 0-2.6 1.5l-2.49-1l-2 3.46L5.7 10.5A7 7 0 0 0 5.56 12a7 7 0 0 0 .14 1.5l-2.11 1.65l2 3.46l2.49-1a7 7 0 0 0 2.6 1.5L11.5 23h4l.32-2.89a7 7 0 0 0 2.6-1.5l2.49 1l2-3.46L20.3 13.5A7 7 0 0 0 20.44 12Z"/></svg>); }
