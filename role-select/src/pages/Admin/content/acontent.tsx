import { Link, useParams } from "react-router-dom";
import "./content.css";

type Params = { subject?: string; paper?: string };

export default function ContentPage() {
  const { subject = "", paper = "" } = useParams<Params>();
  const s = (x: string) => x.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const topics = [
    { slug: "algebra",        label: "Algebra",                   cls: "blue"   },
    { slug: "number-pattern", label: "Number Pattern",            cls: "purple" },
    { slug: "function",       label: "Function",                  cls: "indigo" },
    { slug: "sequences",      label: "Sequences",                 cls: "blue"   },
    { slug: "full-exam",      label: "Full Exam Question Paper",  cls: "purple" },
  ];

  return (
    <>
      <header className="content-header">
        <h1>{s(subject)} — {s(paper)}</h1>
      </header>

      <section className="panel">
        <div className="stack">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to={`/admin/content/${subject}/${paper}/${t.slug}/upload`}
              className={`big-btn ${t.cls}`}
              role="button"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
