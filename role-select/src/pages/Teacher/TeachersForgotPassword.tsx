import { useState } from "react";
import './TeachersForgotPassword.css';


function TeachersForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMessage("Please enter your email.");
    } else {
      setMessage("The link for resetting password is sent to your emails");
      setEmail("");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot password?</h2>
        <p>
          Enter the email used for your account and we’ll send you a link to
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email <span className="required">*</span></label>
          <div className="input-wrapper">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">Reset password</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default TeachersForgotPassword;