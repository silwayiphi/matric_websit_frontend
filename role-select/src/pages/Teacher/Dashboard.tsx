// src/pages/Teacher/Dashboard.tsx
import { BookOpen, Users, FileText, Plus, Eye, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";  // ✅ import navigate hook
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ initialize

  const stats = {
    totalSubjects: 2,
    totalStudents: 45,
    totalLessons: 12,
    pendingAssignments: 3,
  };

  const recentActivity = [
    { id: 1, action: "Created lesson", subject: "Mathematics: Algebra", time: "2 hours ago" },
    { id: 2, action: "Graded assignment", subject: "Mathematics: Number Pattern", time: "5 hours ago" },
    { id: 3, action: "Added students", count: 5, time: "1 day ago" },
  ];

  return (
    <div className="content">
      <div className="header">
        <h1>Welcome back, Mr Mathonsi!</h1>
        <p>Here’s what’s happening in your classroom today.</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button 
          className="quick-btn blue"
          onClick={() => navigate("/teacher/lessons/create")} // ✅ go to CreateLesson
        >
          <Plus /> <h3>Create Lesson</h3>
          <p>Build new content for your students</p>
        </button>
        <button 
          className="quick-btn green"
          onClick={() => navigate("/teacher/students")} // example: Add Students
        >
          <Users /> <h3>Add Students</h3>
          <p>Invite students to your class</p>
        </button>
        <button 
          className="quick-btn purple"
          onClick={() => navigate("/teacher/performance")} // example: Reports page
        >
          <Eye /> <h3>View Reports</h3>
          <p>Check student performance</p>
        </button>
      </div>

      {/* Stats */}
      <div className="stats">
        <StatCard icon={<BookOpen />} value={stats.totalSubjects} label="Active Subjects" trend="+12%" />
        <StatCard icon={<Users />} value={stats.totalStudents} label="Total Students" trend="+5%" />
        <StatCard icon={<FileText />} value={stats.totalLessons} label="Published Lessons" />
        <StatCard icon={<Clock />} value={stats.pendingAssignments} label="Pending Reviews" warning />
      </div>

      {/* Two Col: Recent + Tasks */}
      <div className="two-col">
        <div className="card">
          <h3>Recent Activity</h3>
          {recentActivity.map(a => (
            <div key={a.id} className="activity-item">
              <Clock />
              <div>
                <p>
                  {a.action} {a.subject && <span>in {a.subject}</span>}
                  {a.count && <span> ({a.count} students)</span>}
                </p>
                <small>{a.time}</small>
              </div>
            </div>
          ))}
          <button className="link-btn">View all activity →</button>
        </div>

        <div className="card">
          <h3>Upcoming Tasks</h3>
          <TaskItem title="Grade Quiz Submissions" due="Due tomorrow" />
          <TaskItem title="Prepare mock exam" due="In 3 days" />
          <TaskItem title="Lesson plan update: Algebra" due="Next week" />
          <button className="link-btn">View all tasks →</button>
        </div>
      </div>
    </div>
  );
}

// Cards
function StatCard({ icon, value, label, trend, warning }: any) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>
        {trend && !warning && <span className="trend">{trend}</span>}
        {warning && <AlertCircle className="warning" />}
      </div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function TaskItem({ title, due }: { title: string; due: string }) {
  return (
    <div className="task-item">
      <div>
        <p className="task-title">{title}</p>
        <small>{due}</small>
      </div>
      <button className="task-btn">Open</button>
    </div>
  );
}