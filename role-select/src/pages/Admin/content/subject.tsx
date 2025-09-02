import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./content.css";

type Subject = { slug: string; label: string; cls: "blue" | "purple" | "indigo" };

export default function Subjects() {
  const initial: Subject[] = [
    { slug: "physical-sciences", label: "Physical Sciences", cls: "blue" },
    { slug: "mathematics",       label: "Mathematics",       cls: "purple" },
    { slug: "life-sciences",     label: "Life Sciences",     cls: "indigo" },
  ];

  const [subjects, setSubjects] = useState<Subject[]>(initial);
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const makeSlug = (str: string) =>
    str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function addSubject() {
    const label = newLabel.trim();
    if (!label) return;
    let slug = makeSlug(label);
    if (!slug) return;

    // ensure a unique slug
    const taken = new Set(subjects.map(s => s.slug));
    let unique = slug, i = 2;
    while (taken.has(unique)) unique = `${slug}-${i++}`;

    // rotate colors
    const palette: Subject["cls"][] = ["blue", "purple", "indigo"];
    const cls = palette[subjects.length % palette.length];

    setSubjects([...subjects, { slug: unique, label, cls }]);
    setNewLabel("");
    setIsAdding(false);
  }

  return (
    <>
      <header className="content-header"><h1>Subjects</h1></header>

      <section className="panel">
        <div className="stack">
          {subjects.map(s => (
            <Link
              key={s.slug}
              to={`/admin/content/${s.slug}/papers`}
              className={`big-btn ${s.cls}`}
              role="button"
            >
              {s.label}
            </Link>
          ))}

          {isAdding && (
            <div className="add-card">
              <input
                className="input"
                placeholder="New subject (e.g., Accounting)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addSubject(); }}
              />
              <div className="row">
                <button type="button" className="btn primary" onClick={addSubject}>Save</button>
                <button type="button" className="btn ghost" onClick={() => { setIsAdding(false); setNewLabel(""); }}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* bottom-right + like your screenshot */}
        <button
          type="button"
          className="fab red"
          aria-label="Add Subject"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      </section>
    </>
  );
}
