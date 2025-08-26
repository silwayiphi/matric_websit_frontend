import { Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/RoleSelect";
import AdminLogin from "./pages/Admin/Login";
import TeacherLogin from "./pages/Teacher/TeacherLogin";
import ForgotPassword from "./pages/Admin/forgotPassword";
import AdminLayout from "./pages/Admin/layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/dashboard";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import Teachers from "./pages/Admin/Teacher";
import Students from "./pages/Admin/Students";
import Content from "./pages/Admin/Content";
import Packages from "./pages/Admin/Packages";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";
import TeacherLayout from "./pages/Teacher/layouts/TeacherLayout";
import MySubjects from "./pages/Teacher/MySybjects";
import TeacherStudents from "./pages/Teacher/Students";
import MyLessons from "./pages/Teacher/MyLessons";
import Performance from "./pages/Teacher/Perforformance";
import TeacherSettings from "./pages/Teacher/Settings";
import CreateLesson from "./pages/Teacher/CreateLesson";
import TeachersForgotPassword from "./pages/Teacher/TeachersForgotPassword";

export default function App() {
  return (
    <Routes>
      {/* Public entry points */}
      <Route path="/" element={<RoleSelect />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="ForgotPassword" element={<ForgotPassword/>}/>
      <Route path="TeacherLogin" element={<TeacherLogin/>}/>
      <Route path="TeachersForgotPassword" element={<TeachersForgotPassword/>}/>
      

      {/* TEACHER AREA: all routes that inherit TeacherLayout */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />   {/* This means /teacher */}
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="subjects" element={<MySubjects />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="lessons" element={<MyLessons />} />
        <Route path="lessons/create" element={<CreateLesson />} />
        <Route path="performance" element={<Performance />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* ADMIN AREA: all routes that inherit AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="students" element={<Students />} />
        <Route path="content" element={<Content />} />
        <Route path="packages" element={<Packages />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<div className="page"><h2>Not found</h2></div>}
      />
    </Routes>
  );
}