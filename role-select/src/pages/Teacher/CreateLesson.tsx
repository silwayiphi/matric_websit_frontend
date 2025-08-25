// src/components/CreateLesson.tsx
import { useState } from "react";
import { 
  ArrowLeft, Save, Plus, Trash2, Check, HelpCircle,
  Heading1, Heading2, Bold, Italic, List, ListOrdered,
  Code, Quote, Paperclip, Eye, Upload
} from "lucide-react";

import "./CreateLesson.css"; // ✅ Import CSS

interface LessonSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'image' | 'pdf';
  resources?: any[];
}

interface LearningObjective {
  id: string;
  text: string;
}

export default function CreateLesson() {
  const [lessonTitle, setLessonTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [objectives, setObjectives] = useState<LearningObjective[]>([
    { id: "1", text: "" }
  ]);
  const [sections, setSections] = useState<LessonSection[]>([
    { id: "1", title: "Introduction", content: "", type: "text" }
  ]);
  const [activeSection, setActiveSection] = useState("1");
  const [contentType, setContentType] = useState<'write' | 'upload'>("write");

  // ---- Objective Management ----
  const addObjective = () => {
    setObjectives([...objectives, { id: Date.now().toString(), text: "" }]);
  };
  const removeObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };
  const updateObjective = (id: string, text: string) => {
    setObjectives(objectives.map(obj => 
      obj.id === id ? { ...obj, text } : obj
    ));
  };

  // ---- Section Management ----
  const addSection = () => {
    const newSection: LessonSection = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}`,
      content: "",
      type: "text"
    };
    setSections([...sections, newSection]);
    setActiveSection(newSection.id);
  };
  const updateSection = (id: string, updates: Partial<LessonSection>) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    if (activeSection === id && sections.length > 1) {
      setActiveSection(sections[0].id);
    }
  };

  return (
    <div className="lesson-page">

      {/* ---------- HEADER ---------- */}
      <div className="lesson-header">
        <div className="header-left">
          <button className="icon-btn"><ArrowLeft size={20} /></button>
          <h1>Create New Lesson</h1>
        </div>

        <div className="header-actions">
          <button className="btn secondary"><Save size={16}/> Save Draft</button>
          <button className="btn primary"><Check size={16}/> Publish</button>
        </div>
      </div>

      {/* ---------- MAIN ---------- */}
      <div className="lesson-body">
        <div className="editor-panel">

          {/* Basic Info */}
          <div className="lesson-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="form-group">
              <label>Lesson Title</label>
              <input
                type="text"
                placeholder="e.g., Introduction to Financial Mathematics"
                value={lessonTitle}
                onChange={e=>setLessonTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={subject} onChange={e=>setSubject(e.target.value)}>
                <option value="Mathematics">Mathematics Grade 12</option>
                <option value="Life Sciences">Life Sciences Grade 12</option>
              </select>
            </div>
          </div>

          {/* Objectives */}
          <div className="lesson-section">
            <h2 className="section-title flex-title">
              🎯 Learning Objectives <HelpCircle className="icon-muted"/>
            </h2>
            {objectives.map(obj=>(
              <div key={obj.id} className="objective-row">
                <input
                  type="text"
                  placeholder="Students will be able to..."
                  value={obj.text}
                  onChange={(e)=>updateObjective(obj.id, e.target.value)}
                />
                {objectives.length > 1 && (
                  <button className="icon-btn danger" onClick={()=>removeObjective(obj.id)}><Trash2 size={16}/></button>
                )}
              </div>
            ))}
            <button className="btn link" onClick={addObjective}><Plus size={14}/> Add Objective</button>
          </div>

          {/* Content Type Switch */}
          <div className="lesson-section">
            <h2 className="section-title">Content Type</h2>
            <div className="btn-group">
              <button
                className={`btn ${contentType==="write"?"primary":"secondary"}`}
                onClick={()=>setContentType("write")}
              >
                ✍️ Write Content
              </button>
              <button
                className={`btn ${contentType==="upload"?"primary":"secondary"}`}
                onClick={()=>setContentType("upload")}
              >
                ⬆️ Upload PDF
              </button>
            </div>
          </div>

          {/* TEXT MODE */}
          {contentType==="write" && (
            <div className="lesson-section">
              <h2 className="section-title">📄 Lesson Content</h2>

              {/* Section Tabs */}
              <div className="tabs">
                {sections.map(sec=>(
                  <button
                    key={sec.id}
                    className={`tab ${activeSection===sec.id?"active":""}`}
                    onClick={()=>setActiveSection(sec.id)}
                  >
                    {sec.title}
                  </button>
                ))}
                <button className="icon-btn" onClick={addSection}><Plus size={16}/></button>
              </div>

              {/* Editor */}
              {sections.map(sec=>(
                <div key={sec.id} className={activeSection===sec.id?"block":"hidden"}>
                  <input
                    className="section-input"
                    value={sec.title}
                    onChange={e=>updateSection(sec.id,{title:e.target.value})}
                  />

                  <div className="toolbar">
                    <button><Heading1 size={16}/></button>
                    <button><Heading2 size={16}/></button>
                    <button><Bold size={16}/></button>
                    <button><Italic size={16}/></button>
                    <button><List size={16}/></button>
                    <button><ListOrdered size={16}/></button>
                    <button><Code size={16}/></button>
                    <button><Quote size={16}/></button>
                    <button><Paperclip size={16}/></button>
                  </div>

                  <textarea
                    className="editor"
                    rows={10}
                    placeholder="Start writing..."
                    value={sec.content}
                    onChange={(e)=>updateSection(sec.id,{content:e.target.value})}
                  />

                  <button className="btn danger small" onClick={()=>removeSection(sec.id)}>
                    <Trash2 size={14}/> Delete Section
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PDF UPLOAD MODE */}
          {contentType==="upload" && (
            <div className="lesson-section center">
              <Upload size={40} className="icon-muted"/>
              <p>Drop your PDF here or click to upload</p>
              <button className="btn primary"><Paperclip size={16}/> Upload PDF</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}