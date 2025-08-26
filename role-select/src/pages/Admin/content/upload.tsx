import { useParams } from "react-router-dom";
import "./content.css";

type Params = { subject?: string; paper?: string; topic?: string };

export default function Upload() {
  const { subject = "", paper = "", topic = "" } = useParams<Params>();

  const fmt = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());


  return (
    <>
      <header className="content-header">
        <h1>Upload — {fmt(topic)}</h1>
        <div className="breadcrumbs">{fmt(subject)} / {fmt(paper)} / {fmt(topic)}</div>
      </header>

      {/* Static form (wire to API later) */}
      <form className="upload" onSubmit={(e)=>e.preventDefault()}>
        <div>
          <label>Title</label>
          <input className="input" placeholder="e.g., Algebra – Linear Functions lesson 1" />
        </div>
        <div>
          <label>File</label>
          <input className="file" type="file" />
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn primary" type="button">Upload (stub)</button>
          <button className="btn ghost" type="reset">Reset</button>
        </div>
      </form>

      {/* Static class progress table */}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th><th>File</th><th>Uploaded</th><th>Views</th><th>Progress</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lesson 1 – Linear</td>
            <td>lesson1.pdf</td>
            <td>2025-08-26 09:40</td>
            <td>12</td>
            <td><div className="progress"><span style={{width:"40%"}} /></div></td>
            <td>
              <button className="btn ghost" type="button">Preview</button>
              <button className="btn ghost" type="button">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Practice Video</td>
            <td>video1.mp4</td>
            <td>2025-08-26 10:10</td>
            <td>5</td>
            <td><div className="progress"><span style={{width:"17%"}} /></div></td>
            <td>
              <button className="btn ghost" type="button">Preview</button>
              <button className="btn ghost" type="button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
