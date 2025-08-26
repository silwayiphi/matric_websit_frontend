import React from "react";
import "./dashboard.css";

export default function AdminDashboard() {
  return (
    <>
      <header className="content-header">
        <h1>Dashboard</h1>
      </header>

      {/* KPI cards */}
      <section className="kpi-grid">
        <KPI className="kpi kpi-blue" value="150" label="Total Users" />
        <KPI className="kpi kpi-orange" value="80" label="Active Subscriptions" />
        <KPI className="kpi kpi-green" value="R12,000" label="Revenue" />
        <KPI className="kpi kpi-tomato" value="5" label="Upcoming Expiries" />
      </section>

      {/* Latest tables */}
      <section className="two-col">
        <Card title="Latest Teachers" titleClass="hdr hdr-indigo">
          <Table
            head={["Name", "Status", "Subscription"]}
            rows={[
              ["Mr. Sibiya", "Active", "R2560 / 30 days"],
              ["Mrs. Diamini", "Active", "R4500 / 30 days"],
              ["Ms. Khumalo", "Active", "R2500 / 30 days"],
              ["Mr. Mthombe", "Active", "R4600 / 30 days"],
            ]}
          />
        </Card>

        <Card title="Latest Students" titleClass="hdr hdr-teal">
          <Table
            head={["Name", "Status", "Teacher"]}
            rows={[
              ["Sipho", "Active", "Mr. Sibiya"],
              ["Thandi", "Active", "Mrs. Diamini"],
              ["Mwathi", "Active", "Ms. Khumalo"],
              ["Nandi", "Active", "Mr. Mthombeni"],
            ]}
          />
        </Card>
      </section>

      {/* Recent Activity */}
      <Card title="Recent Activity" titleClass="hdr hdr-orange" padded>
        <ul className="activity">
          <li><span className="dot" /> Ms. Khumalo uploaded “Algebra – Term 3”.</li>
          <li><span className="dot" /> New student “Banele” subscribed to Maths (30 days).</li>
          <li><span className="dot" /> Payment received: R350 for “Science Pack”.</li>
        </ul>
      </Card>
    </>
  );
}

/* ---------- small components ---------- */
function KPI({ className, value, label }: { className: string; value: string; label: string }) {
  return (
    <div className={className}>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function Card({
  title, titleClass, children, padded
}: { title: string; titleClass: string; children: React.ReactNode; padded?: boolean }) {
  return (
    <section className="card">
      <header className={titleClass}>{title}</header>
      <div className={`card-body ${padded ? "padded" : ""}`}>{children}</div>
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string[])[] }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
