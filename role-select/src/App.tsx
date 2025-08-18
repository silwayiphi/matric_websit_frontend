import { Routes, Route, Navigate } from 'react-router-dom'
import RoleSelect from './pages/RoleSelect.tsx'
import Admin from './pages/Admin.tsx'
import Teacher from './pages/Teacher.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/teacher" element={<Teacher />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

