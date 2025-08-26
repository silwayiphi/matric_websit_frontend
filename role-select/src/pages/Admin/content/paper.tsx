import { Link, useParams } from "react-router-dom";
import "./content.css";

export default function Papers(){
  const { subject = "" } = useParams();
  const title = subject.replace(/-/g," ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <>
      <header className="content-header"><h1>{title} — Papers</h1></header>
      <section className="panel">
        <div className="stack">
          <Link to={`/admin/content/${subject}/paper-1/content`} className="big-btn blue">Paper 1</Link>
          <Link to={`/admin/content/${subject}/paper-2/content`} className="big-btn purple">Paper 2</Link>
        </div>
      </section>
    </>
  );
}
