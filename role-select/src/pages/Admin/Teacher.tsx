import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";

type Teacher = {
  id: string;
  name: string;
  email: string;
  price: number;        // monthly price in R
  periodDays: number;   // e.g., 30
  assigned: number;     // assigned students count
  color?: string;       // avatar circle color
};

// TODO: replace with API data later
const DATA: Teacher[] = [
  { id: "t1", name: "Sibiya",        email: "sibiya@example.com",   price: 2500, periodDays: 30, assigned: 15, color: "#60a5fa" },
  { id: "t2", name: "Mrs. Diamini",  email: "diamini@example.com",  price: 4500, periodDays: 30, assigned: 8,  color: "#f472b6" },
  { id: "t3", name: "Ms. Khumalo",   email: "khumalo@example.com",  price: 2500, periodDays: 30, assigned: 12, color: "#34d399" },
  { id: "t4", name: "Mr. Mthombeni", email: "mthombeni@example.com",price: 4600, periodDays: 30, assigned: 12, color: "#f59e0b" },
];

export default function Teachers() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DATA;
    return DATA.filter(
      (r) => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <>
      <header className="content-header">
        <h1>Teachers Management</h1>
      </header>

      {/* toolbar: search + Add Teacher */}
      <div className="toolbar">
        <div className="searchbar" role="search">
          <span className="search-icon" aria-hidden><SearchIcon /></span>
          <input
            className="search-input"
            type="search"
            placeholder="Search by name or email"
            aria-label="Search by name or email"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <button
          className="btn add"
          onClick={() => nav("/admin/teachers/new")}
          aria-label="Add Teacher"
        >
          Add Teacher
        </button>
      </div>

      {/* table */}
      <section className="card table-card">
        <div className="table-wrap">
          <table className="table teachers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th className="col-actions">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="name">
                    <Avatar name={t.name} color={t.color} />
                    <span>{t.name}</span>
                  </td>
                  <td className="email">{t.email}</td>
                  <td className="sub">
                    <div className="sub-main">R{t.price.toLocaleString("en-ZA")} / {t.periodDays} days</div>
                    <div className="sub-sub">Assigned Students: {t.assigned}</div>
                  </td>
                  <td className="actions">
                    <button
                      className="btn manage"
                      onClick={() => nav(`/admin/teachers/${t.id}`)}
                      aria-label={`Manage ${t.name}`}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty">
              No teachers found for <strong>{q}</strong>.
            </div>
          )}
        </div>
      </section>

      {/* Recent Activity bar to match your mock */}
      <section className="card recent-card">
        <header className="hdr hdr-indigo">Recent Activity</header>
        <div className="recent-body" />
      </section>
    </>
  );
}

/* small components */
function Avatar({ name, color = "#94a3b8" }: { name: string; color?: string }) {
  return (
    <span className="avatar" style={{ background: color }}>
      <UserIcon />
    </span>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 20.3L16.8 16a7.5 7.5 0 1 0-1.4 1.4L20.3 21zM10.5 16a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11z"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="white" d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z"/>
    </svg>
  );
}
