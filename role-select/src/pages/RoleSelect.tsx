import { Link } from 'react-router-dom';


function ShieldGearIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2l7 3v6c0 5-3.8 9.4-7 10c-3.2-.6-7-5-7-10V5l7-3zm0 5a5 5 0 100 10a5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6a2.8 2.8 0 010-5.6z"/>
    </svg>
  )
}

function BlackboardIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 5h18a1 1 0 011 1v10H2V6a1 1 0 011-1zm0 13h18v2H3zM6 8h10v2H6zM6 11h6v2H6z"/>
    </svg>
  )
}

export default function RoleSelect() {
  return (
    <main className="center">
      <h1 className="title">Select Your Role</h1>

      <div className="grid">
        <Link to="/admin/login" className="card" role="button" aria-label="Continue as Admin">
          <div className="icon"><ShieldGearIcon /></div>
          <div className="label">Admin</div>
        </Link>


        <Link to="/TeacherLogin" className="card" role="button" aria-label="Continue as Teacher">
          <div className="icon"><BlackboardIcon /></div>
          <div className="label">Teacher</div>
        </Link>
      </div>
    </main>
  )
}
