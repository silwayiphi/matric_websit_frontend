import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./content.css";

type Params = { subject?: string; paper?: string };
type Topic = { slug: string; label: string; cls: "blue" | "purple" | "indigo" };

export default function ContentPage() {
  const { subject = "", paper = "" } = useParams<Params>();
  const s = (x: string) => x.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const initial: Topic[] = [
    { slug: "algebra",        label: "Algebra",                  cls: "blue" },
    { slug: "number-pattern", label: "Number Pattern",           cls: "purple" },
    { slug: "function",       label: "Function",                 cls: "indigo" },
    { slug: "sequences",      label: "Sequences",                cls: "blue" },
    { slug: "full-exam",      label: "Full Exam Question Paper", cls: "purple" },
  ];

  const [topics, setTopics] = useState<Topic[]>(initial);
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const makeSlug = (str: string) =>
    str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function addTopic() {
    const label = newLabel.trim();
    if (!label) return;
    let slug = makeSlug(label);
    if (!slug) return;

  
    const have = new Set(topics.map((t) => t.slug));
    let unique = slug, i = 2;
    while (have.has(unique)) unique = `${slug}-${i++}`;

    setTopics([...topics, { slug: unique, label, cls: "blue" }]);
    setNewLabel("");
    setIsAdding(false);
  }

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

          {isAdding && (
            <div className="add-card">
              <input
                className="input"
                placeholder="New topic title (e.g., Trigonometry)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <div className="row">
                <button type="button" className="btn primary" onClick={addTopic}>Save</button>
                <button type="button" className="btn ghost" onClick={() => { setIsAdding(false); setNewLabel(""); }}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        
        <button
          type="button"
          className="fab red"
          aria-label="Add Topic"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      </section>
    </>
  );
}
