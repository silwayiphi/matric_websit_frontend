// src/components/MyLessons.tsx
import { useState } from "react";
import { 
  Plus, Search, FileText, CheckCircle, BookOpen,
  AlertCircle, Clock
} from "lucide-react";
import "./MyLessons.css";   // ✅ new CSS file

interface Lesson {
  id: string;
  title: string;
  subject: string;
  type: 'lesson' | 'quiz' | 'assignment' | 'exam';
  status: 'published' | 'draft' | 'scheduled';
  createdDate: string;
  lastModified: string;
  duration: string;
  studentsAccessed: number;
  totalStudents: number;
  topics: string[];
  attachments: number;
}

export default function MyLessons() {
  const [lessons] = useState<Lesson[]>([
    { id:"1", title:"Introduction to Financial Mathematics", subject:"Mathematics",
      type:"lesson", status:"published", createdDate:"2024-10-20", lastModified:"2 days ago",
      duration:"45 min", studentsAccessed:28, totalStudents:32, topics:["Interest","Annuities","Loans"], attachments:3 },
    { id:"2", title:"Quadratic Equations Quiz", subject:"Mathematics", type:"quiz", status:"published",
      createdDate:"2024-10-18", lastModified:"4 days ago", duration:"30 min", studentsAccessed:30, totalStudents:32,
      topics:["Algebra","Equations"], attachments:0 },
    { id:"3", title:"Cell Division and Mitosis", subject:"Life Sciences", type:"lesson", status:"draft",
      createdDate:"2024-10-25", lastModified:"1 hour ago", duration:"60 min", studentsAccessed:0, totalStudents:28,
      topics:["Biology","Cells","Reproduction"], attachments:5 },
    { id:"4", title:"Genetics Assignment", subject:"Life Sciences", type:"assignment", status:"scheduled",
      createdDate:"2024-10-24", lastModified:"1 day ago", duration:"7 days", studentsAccessed:0, totalStudents:28,
      topics:["Genetics","DNA","Heredity"], attachments:2 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid");

  const filteredLessons = lessons.filter(l => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType==="all" || l.type===filterType;
    const matchesStatus = filterStatus==="all" || l.status===filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="lessons-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>My Lessons</h1>
          <p>Create and manage your teaching content</p>
        </div>
        <button className="btn primary"><Plus size={18}/> Create New</button>
      </div>

      {/* Stats Overview */}
      <div className="stats-row">
        <div className="stat-card">
          <p>Total Content</p>
          <h3>{lessons.length}</h3>
          <FileText className="icon-muted"/>
        </div>
        <div className="stat-card">
          <p>Published</p>
          <h3 className="text-green">
            {lessons.filter(l=>l.status==="published").length}
          </h3>
          <CheckCircle className="icon-green"/>
        </div>
        <div className="stat-card">
          <p>Drafts</p>
          <h3 className="text-gray">
            {lessons.filter(l=>l.status==="draft").length}
          </h3>
          <Clock className="icon-muted"/>
        </div>
        <div className="stat-card">
          <p>Avg. Completion</p>
          <h3 className="text-blue">87%</h3>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <Search className="search-icon"/>
          <input
            type="text"
            placeholder="Search lessons, topics..."
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="lesson">Lessons</option>
          <option value="quiz">Quizzes</option>
          <option value="assignment">Assignments</option>
          <option value="exam">Exams</option>
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <div className="view-toggle">
          <button className={viewMode==="grid"?"active":""} onClick={()=>setViewMode("grid")}>▦</button>
          <button className={viewMode==="list"?"active":""} onClick={()=>setViewMode("list")}>☰</button>
        </div>
      </div>

      {/* Lessons Grid */}
      {viewMode==="grid" ? (
        <div className="lessons-grid">
          {filteredLessons.map(lesson=>(
            <div key={lesson.id} className="lesson-card">
              <h3>{lesson.title}</h3>
              <p className="meta">{lesson.subject} • {lesson.duration}</p>
              <p className={`badge ${lesson.status}`}>{lesson.status}</p>
              <div className="topics">
                {lesson.topics.map((t,i)=><span key={i}>{t}</span>)}
              </div>
              <p className="meta">Last Modified: {lesson.lastModified}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="lesson-list">
          {filteredLessons.map(lesson=>(
            <div key={lesson.id} className="lesson-row">
              <div className="info">
                <h3>{lesson.title}</h3>
                <span className="meta">{lesson.subject} • {lesson.type}</span>
              </div>
              <p className={`badge ${lesson.status}`}>{lesson.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}