// src/components/auth/TeacherLogin.tsx
import { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './TeacherLogin.css';

export default function TeacherLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    // simple validation → later connect with backend
    if (email.includes("@")) {
      nav("/teacher/dashboard", { replace: true }); // go to teacher dashboard
    } else {
      setErr("Please enter a valid email (must contain '@').");
    }
  };

  return (
    <div className="login-bg">
      <main className="login-wrap">
        <section className="glass-card" aria-label="Teacher login card">
          <div className="avatar">
            <UserIcon />
          </div>

          <h1 className="ribbon">Teacher Login</h1>

          <form className="login-form" onSubmit={onSubmit}>
            <label className="input-row">
              <span className="icon"><MailIcon /></span>
              <input
                type="email"
                placeholder="Email ID"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </label>

            <label className="input-row">
              <span className="icon"><LockIcon /></span>
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </label>

            {/* Remember + Forgot */}
            <div className="row between">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            {err && <div className="error mt">{err}</div>}

            <button className="btn primary mt" type="submit">LOGIN</button>
          </form>

          {/* Register Link */}
          <div className="mt">
            <p className="text-sm text-center">
              New Teacher?{" "}
              <Link to="/teacher/register" className="link">
                Register here
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4l-8 5L4 8V6l8 5l8-5z"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M17 8h-1V6a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM9 6a3 3 0 0 1 6 0v2H9Zm8 12H7v-8h10Z"/>
    </svg>
  );
}