import { useNavigate } from "react-router-dom";
import "./packages.css";

type Pkg = { id: string; name: string; type: "Teacher" | "Student"; price: number; durationDays: number };


const DATA: Pkg[] = [
  { id: "p1", name: "Basic",    type: "Teacher", price: 100, durationDays: 30 },
  { id: "p2", name: "Standard", type: "Student", price:  50, durationDays: 30 },
  { id: "p3", name: "Premium",  type: "Teacher", price: 200, durationDays: 30 },
];

export default function Packages() {
  const nav = useNavigate();

  return (
    <>
      <header className="content-header packages-header">
        <h1>Packages Management</h1>
        <button className="btn create" onClick={() => nav("/admin/packages/new")}>Create Package</button>
      </header>

      <section className="card pkg-card">
        <div className="table-wrap">
          <table className="table pkg-table">
            <thead>
              <tr>
                <th className="round-l">Name</th>
                <th>Type</th>
                <th>Price</th>
                <th className="round-r">Duration</th>
              </tr>
            </thead>
            <tbody>
              {DATA.map((p) => (
                <tr key={p.id}>
                  <td className="name">{p.name}</td>
                  <td>{p.type}</td>
                  <td>${p.price}</td>
                  <td>{p.durationDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Activity bar like your mock */}
      <section className="card recent-card">
        <header className="hdr hdr-indigo">Recent Activity</header>
        <div className="recent-body" />
      </section>
    </>
  );
}
