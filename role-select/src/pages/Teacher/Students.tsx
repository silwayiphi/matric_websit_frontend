// src/components/Students.tsx
import { useState } from "react";
import { 
  UserPlus, Search, Filter, Copy, Download,
  Users, CheckCircle, Clock, AlertCircle, Trash2
} from "lucide-react";

import "./Students.css";   // ✅ new CSS file

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  subjects: string[];
  dateAdded: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([
    { id:"1", name:"John Doe", email:"john.doe@school.com", studentId:"STU001", subjects:["Mathematics","Life Sciences"], dateAdded:"2024-01-15", lastActive:"2 hours ago", status:"active" },
    { id:"2", name:"Jane Smith", email:"jane.smith@school.com", studentId:"STU002", subjects:["Mathematics"], dateAdded:"2024-01-20", lastActive:"1 day ago", status:"active" },
    { id:"3", name:"Mike Johnson", email:"mike.j@school.com", studentId:"STU003", subjects:["Life Sciences"], dateAdded:"2024-02-01", lastActive:"3 days ago", status:"inactive" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all'|'active'|'pending'>("all");

  const classCode = "A4B-7X9-C2D";

  const filteredStudents = students.filter(s=>{
    const matches = s.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                || s.email.toLowerCase().includes(searchTerm.toLowerCase()) 
                || s.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab==="all" || s.status===activeTab;
    return matches && matchesTab;
  });

  const handleSelectAll = () => {
    if (selectedStudents.length===filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s=>s.id));
    }
  };

  return (
    <div className="students-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage your enrolled students</p>
        </div>
        <div className="actions">
          <button className="btn secondary"><Download size={16}/> Export</button>
          <button className="btn primary"><UserPlus size={16}/> Add Students</button>
        </div>
      </div>

      {/* Class Join Code */}
      <div className="class-code">
        <div>
          <h3>Class Join Code</h3>
          <p>Share this code with students to let them join your class</p>
        </div>
        <div className="code-box">
          <span>{classCode}</span>
          <button onClick={()=>navigator.clipboard.writeText(classCode)}><Copy size={16}/></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab==="all"?"active":""} onClick={()=>setActiveTab("all")}>
          All Students ({students.length})
        </button>
        <button className={activeTab==="active"?"active":""} onClick={()=>setActiveTab("active")}>
          Active ({students.filter(s=>s.status==="active").length})
        </button>
        <button className={activeTab==="pending"?"active":""} onClick={()=>setActiveTab("pending")}>
          Pending ({students.filter(s=>s.status==="pending").length})
        </button>
      </div>

      {/* Search + Filter */}
      <div className="toolbar">
        <div className="search-box">
          <Search className="icon"/>
          <input placeholder="Search by name, email, or Student ID..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
        </div>
        <button className="btn secondary"><Filter size={16}/> Filter</button>
      </div>

      {/* Students Table */}
      <div className="card table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectedStudents.length===filteredStudents.length && filteredStudents.length>0} onChange={handleSelectAll}/></th>
              <th>Student</th><th>ID</th><th>Subjects</th><th>Status</th><th>Last Active</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(stu=>(
              <StudentRow key={stu.id} student={stu} isSelected={selectedStudents.includes(stu.id)}
                onSelect={(id:string)=> setSelectedStudents(
                  selectedStudents.includes(id)
                    ? selectedStudents.filter(s=>s!==id)
                    : [...selectedStudents,id]
                )}
              />
            ))}
          </tbody>
        </table>
        {filteredStudents.length===0 && (
          <div className="empty"><Users size={40}/><p>No students found</p></div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length>0 && (
        <div className="bulk-bar">
          <span>{selectedStudents.length} students selected</span>
          <div className="actions">
            <button className="btn secondary sm">Send Message</button>
            <button className="btn danger sm">Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentRow({ student, isSelected, onSelect }: any) {
  const statusClasses:any = {
    active: "badge green",
    inactive: "badge gray",
    pending: "badge yellow"
  };
  const icons:any = {
    active: CheckCircle,
    inactive: Clock,
    pending: AlertCircle
  };
  const Icon = icons[student.status];

  return (
    <tr>
      <td><input type="checkbox" checked={isSelected} onChange={()=>onSelect(student.id)}/></td>
      <td>
        <div className="student-info">
          <div className="avatar">{student.name.slice(0,2).toUpperCase()}</div>
          <div>
            <strong>{student.name}</strong>
            <p>{student.email}</p>
          </div>
        </div>
      </td>
      <td>{student.studentId}</td>
      <td>
        {student.subjects.map((s:string,i:number)=><span key={i} className="subject-tag">{s}</span>)}
      </td>
      <td><span className={statusClasses[student.status]}><Icon size={12}/> {student.status}</span></td>
      <td>{student.lastActive}</td>
      <td><button className="icon-btn danger"><Trash2 size={14}/></button></td>
    </tr>
  )
}