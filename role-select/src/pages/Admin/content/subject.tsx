import { Link } from "react-router-dom";
import "./content.css";

export default function Subjects(){
  return (
    <>
      <header className="content-header"><h1>Subjects</h1></header>
      <section className="panel">
        <div className="stack">
          <Link to="/admin/content/physical-sciences/papers" className="big-btn blue">Physical Sciences</Link>
          <Link to="/admin/content/mathematics/papers"       className="big-btn purple">Mathematics</Link>
          <Link to="/admin/content/life-sciences/papers"     className="big-btn indigo">Life Sciences</Link>
        </div>
      </section>
    </>
  );
}
