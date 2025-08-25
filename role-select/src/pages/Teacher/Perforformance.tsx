// src/components/Performance.tsx
import { useState } from "react";
import { 
  TrendingUp, TrendingDown, Users, Award, Clock,
  Download, CheckCircle
} from "lucide-react";

import "./Perfomance.css"; // ✅ new CSS file

interface StudentPerformance {
  id: string;
  name: string;
  averageScore: number;
  completedLessons: number;
  totalLessons: number;
  lastActive: string;
  trend: 'up' | 'down' | 'stable';
  quizScores: number[];
}

interface SubjectStats {
  subject: string;
  averageScore: number;
  totalStudents: number;
  completionRate: number;
  trend: number;
}

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const overallStats = {
    averageScore: 78.5,
    scoreTrend: 5.2,
    activeStudents: 45,
    totalStudents: 52,
    completionRate: 82,
    completionTrend: 3.1,
    avgTimeSpent: "2h 15m"
  };

  const subjectStats: SubjectStats[] = [
    { subject: "Mathematics", averageScore: 81.2, totalStudents: 32, completionRate: 85, trend: 4.5 },
    { subject: "Life Sciences", averageScore: 75.8, totalStudents: 28, completionRate: 78, trend: -2.1 }
  ];

  const performanceByWeek = [
    { week: "Week 1", score: 72 },
    { week: "Week 2", score: 75 },
    { week: "Week 3", score: 73 },
    { week: "Week 4", score: 78.5 }
  ];

  return (
    <div className="performance-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Performance Analytics</h1>
          <p>Track student progress & identify areas for improvement</p>
        </div>
        <div className="actions">
          <select value={selectedPeriod} onChange={e=>setSelectedPeriod(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="term">This Term</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn secondary">
            <Download size={16}/> Export
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="stat-grid">
        <StatCard title="Average Score" value={`${overallStats.averageScore}%`} trend={overallStats.scoreTrend} icon={Award} color="blue"/>
        <StatCard title="Active Students" value={`${overallStats.activeStudents}/${overallStats.totalStudents}`} subtitle="86.5% active" icon={Users} color="green"/>
        <StatCard title="Completion Rate" value={`${overallStats.completionRate}%`} trend={overallStats.completionTrend} icon={CheckCircle} color="purple"/>
        <StatCard title="Avg. Time Spent" value={overallStats.avgTimeSpent} subtitle="per student / week" icon={Clock} color="orange"/>
      </div>

      {/* Performance Chart */}
      <div className="card chart-card">
        <h3>Performance Trend</h3>
        <div className="chart">
          {performanceByWeek.map((data,i)=>(
            <div key={i} className="chart-col">
              <div className="chart-bar" style={{height:`${data.score*2}px`}}/>
              <span className="week">{data.week}</span>
              <span className="score">{data.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Stats */}
      <div className="card">
        <h3>Performance by Subject</h3>
        <div className="subject-list">
          {subjectStats.map((s,i)=>(
            <div key={i} className="subject-item">
              <div className="subject-header">
                <span>{s.subject}</span>
                <span>{s.averageScore}%</span>
                {s.trend>0
                  ? <span className="trend up"><TrendingUp size={14}/>{s.trend}%</span>
                  : <span className="trend down"><TrendingDown size={14}/>{Math.abs(s.trend)}%</span>
                }
              </div>
              <div className="progress">
                <div style={{width:`${s.averageScore}%`}}/>
              </div>
              <small>{s.totalStudents} students</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, trend, icon:Icon, color }: any) {
  return (
    <div className="stat-card">
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        {subtitle && <small>{subtitle}</small>}
        {trend && (
          <span className={`trend ${trend>0?'up':'down'}`}>
            {trend>0? <TrendingUp size={14}/> : <TrendingDown size={14}/>} {trend}%
          </span>
        )}
      </div>
      <div className={`icon ${color}`}><Icon/></div>
    </div>
  );
}