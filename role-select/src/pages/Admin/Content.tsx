import { Outlet } from "react-router-dom";
import "./Content.css"; // optional

export default function Content() {
  return (
    <>
      <header className="content-header">
        <h1>Content Management</h1>
      </header>
      <Outlet />  {/* Subjects / Papers / Content / Upload render here */}
    </>
  );
}
