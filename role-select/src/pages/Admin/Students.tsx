import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Students.css";

type Student = {
  id: string;
  name: string;
  teacher: string | null;
  status: "Active" | "Expired";
};

// TODO: replace with API data later
const DATA: Student[] = [
  { id: "s1", name: "John Doe",   teacher: "Mr. Sibiya",  status: "Active"  },
  { id: "s2", name: "Jane Smith", teacher: null,          status: "Expired" },
  { id: "s3", name: "Sam Leonard",teacher: "Mrs. Diamini",status: "Active"  },
  { id: "s4", name: "Linda Johnson", teacher: "Ms. Khumalo", status: "Expired" },
];

export default function Students() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DATA;
    return DATA.filter((r) => r.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <>
      <header className="content-header">
        <h1>Students Management</h1>
      </header>

      {/* search */}
      <div className="searchbar" role="search">
        <span className="search-icon" aria-hidden><SearchIcon /></span>
        <input
          className="search-input"
          type="search"
          placeholder="Search by name"
          aria-label="Search by name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* table */}
      <section className="card table-card">
        <div className="table-wrap">
          <table className="table students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Linked Teacher</th>
                <th>Subscription</th>
                <th className="col-actions">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="name">{s.name}</td>
                  <td>{s.teacher ?? "None"}</td>
                  <td>
                    <span className={`status ${s.status === "Active" ? "active" : "expired"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn manage"
                      onClick={() => nav(`/admin/students/${s.id}`)}
                      aria-label={`Manage ${s.name}`}
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
              No students found for <strong>{q}</strong>.
            </div>
          )}
        </div>
      </section>

      {/* recent activity bar (visual stub like your mock) */}
      <section className="card recent-card">
        <header className="hdr hdr-indigo">Recent Activity</header>
        <div className="recent-body" />
      </section>
    </>
  );
}

/* small inline icon */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 20.3L16.8 16a7.5 7.5 0 1 0-1.4 1.4L20.3 21zM10.5 16a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11z"/>
    </svg>
  );
}
