import React, { useMemo, useState } from "react";
import "./reports.css";

type Status = "Paid" | "Pending" | "Refunded";
type Role = "Student" | "Teacher";

type Txn = {
  id: string;
  date: string;         // ISO date
  name: string;         // payer
  role: Role;
  description: string;
  amount: number;       // in Rands
  status: Status;
};

// TODO: replace with API data later
const DATA: Txn[] = [
  { id:"t1", date:"2025-08-20", name:"Sipho",        role:"Student", description:"Maths Pack",           amount:350,  status:"Paid"     },
  { id:"t2", date:"2025-08-19", name:"Thandi",       role:"Student", description:"Science Pack",         amount:350,  status:"Pending"  },
  { id:"t3", date:"2025-08-18", name:"Mr. Sibiya",   role:"Teacher", description:"Monthly Subscription", amount:2560, status:"Paid"     },
  { id:"t4", date:"2025-08-18", name:"Mrs. Diamini", role:"Teacher", description:"Monthly Subscription", amount:4500, status:"Paid"     },
  { id:"t5", date:"2025-08-16", name:"Nandi",        role:"Student", description:"Maths Pack",           amount:350,  status:"Refunded" },
  { id:"t6", date:"2025-08-15", name:"Ms. Khumalo",  role:"Teacher", description:"Monthly Subscription", amount:2500, status:"Paid"     },
  { id:"t7", date:"2025-08-14", name:"Mwathi",       role:"Student", description:"Science Pack",         amount:350,  status:"Paid"     },
];

export default function Reports() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return DATA.filter(tx => {
      if (s && !(tx.name.toLowerCase().includes(s) || tx.description.toLowerCase().includes(s))) return false;
      if (status !== "All" && tx.status !== status) return false;
      if (from && tx.date < from) return false;
      if (to && tx.date > to) return false;
      return true;
    });
  }, [q, status, from, to]);

  const summary = useMemo(() => {
    const paid = filtered.filter(t => t.status === "Paid");
    const pending = filtered.filter(t => t.status === "Pending");
    const refunded = filtered.filter(t => t.status === "Refunded");
    const revenue = paid.reduce((a,b)=>a+b.amount,0);
    return { revenue, paid: paid.length, pending: pending.length, refunded: refunded.length, total: filtered.length };
  }, [filtered]);

  function ZAR(n: number){ return "R" + n.toLocaleString("en-ZA"); }

  function exportCsv(){
    const rows = [
      ["Date","Name","Role","Description","Amount (R)","Status"],
      ...filtered.map(t => [t.date, t.name, t.role, t.description, String(t.amount), t.status])
    ];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "payments_report.csv";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <header className="content-header reports-header">
        <h1>Payments & Reports</h1>
        <div className="header-actions">
          <button className="btn export" onClick={exportCsv}>Export CSV</button>
        </div>
      </header>

      {/* Summary (API-ready) */}
      <section className="kpi-grid">
        <KPI className="kpi kpi-green"  value={ZAR(summary.revenue)} label="Revenue (filtered)" />
        <KPI className="kpi kpi-blue"   value={String(summary.paid)}     label="Paid" />
        <KPI className="kpi kpi-orange" value={String(summary.pending)}  label="Pending" />
        <KPI className="kpi kpi-tomato" value={String(summary.refunded)} label="Refunded" />
      </section>

      {/* Filters */}
      <section className="filters card">
        <div className="filters-row">
          <div className="searchbar" role="search">
            <span className="search-icon" aria-hidden><SearchIcon /></span>
            <input
              className="search-input"
              type="search"
              placeholder="Search by name or description"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
          </div>

          <div className="range">
            <label>From</label>
            <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} />
          </div>
          <div className="range">
            <label>To</label>
            <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} />
          </div>

          <div className="select-wrap">
            <label>Status</label>
            <select value={status} onChange={(e)=>setStatus(e.target.value as any)}>
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
          </div>
        </div>
      </section>

      {/* Transactions table */}
      <section className="card table-card">
        <div className="table-wrap">
          <table className="table tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Payer</th>
                <th>Role</th>
                <th>Description</th>
                <th className="num">Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td className="name">{t.name}</td>
                  <td>{t.role}</td>
                  <td className="desc">{t.description}</td>
                  <td className="num">{ZAR(t.amount)}</td>
                  <td>
                    <span className={`chip ${t.status.toLowerCase()}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty">No results for current filters.</div>
          )}
        </div>
      </section>

      {/* Recent Activity bar (visual stub) */}
      <section className="card recent-card">
        <header className="hdr hdr-indigo">Recent Activity</header>
        <div className="recent-body" />
      </section>
    </>
  );
}

function KPI({ className, value, label }: { className: string; value: string; label: string }) {
  return (
    <div className={className}>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 20.3 16.8 16a7.5 7.5 0 1 0-1.4 1.4L20.3 21zM10.5 16a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
    </svg>
  );
}
