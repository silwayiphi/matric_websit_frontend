// src/components/MySubjects.tsx
import { useState } from "react";
import { 
  Plus, Edit2, Trash2, BookOpen, Users, FileText, ChevronRight 
} from "lucide-react";
import "./MySubject.css";   // ✅ add CSS file

interface Subject {
  id: string;
  name: string;
  grade: string;
  studentCount: number;
  lessonCount: number;
  lastUpdated: string;
  color: string;
}

export default function MySubjects() {
  const [subjects] = useState<Subject[]>([
    {
      id: "1",
      name: "Mathematics",
      grade: "Grade 12",
      studentCount: 32,
      lessonCount: 8,
      lastUpdated: "2 days ago",
      color: "blue"
    },
    {
      id: "2",
      name: "Life Sciences",
      grade: "Grade 12",
      studentCount: 28,
      lessonCount: 6,
      lastUpdated: "1 week ago",
      color: "green"
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="subjects-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>My Subjects</h1>
          <p>Manage your teaching subjects and curriculum</p>
        </div>
        <button className="btn primary" onClick={()=>setShowAddModal(true)}>
          <Plus size={18}/> Add Subject
        </button>
      </div>

      {/* Subject Cards */}
      <div className="subjects-grid">
        {subjects.map(subj => <SubjectCard key={subj.id} subject={subj}/>)}
        <button className="subject-card add" onClick={()=>setShowAddModal(true)}>
          <Plus size={32}/>
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <StatCard title="Total Subjects" value={subjects.length} icon={BookOpen} color="blue"/>
        <StatCard title="Total Students" value={subjects.reduce((a,s)=>a+s.studentCount,0)} icon={Users} color="green"/>
        <StatCard title="Total Lessons" value={subjects.reduce((a,s)=>a+s.lessonCount,0)} icon={FileText} color="purple"/>
        <StatCard title="Active Classes" value={subjects.length} icon={BookOpen} color="orange"/>
      </div>

      {showAddModal && <AddSubjectModal onClose={()=>setShowAddModal(false)}/>}
    </div>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <div className="subject-card">
      <div className="card-header">
        <div className="icon-circle" data-color={subject.color}>
          <BookOpen/>
        </div>
        <div className="title">
          <h3>{subject.name}</h3>
          <p>{subject.grade}</p>
        </div>
        <div className="actions">
          <button className="icon-btn"><Edit2 size={16}/></button>
          <button className="icon-btn danger"><Trash2 size={16}/></button>
        </div>
      </div>
      <div className="card-stats">
        <div><Users size={14}/> Students <span>{subject.studentCount}</span></div>
        <div><FileText size={14}/> Lessons <span>{subject.lessonCount}</span></div>
      </div>
      <p className="updated">Last updated {subject.lastUpdated}</p>
      <button className="btn secondary full">View Details <ChevronRight size={14}/></button>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="stat-card">
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
      <div className={`icon-bg ${color}`}><Icon/></div>
    </div>
  );
}

function AddSubjectModal({ onClose }: { onClose: ()=>void }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add New Subject</h2>
        <p>(Form elements will go here)</p>
        <button className="btn secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}