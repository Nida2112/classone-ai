import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h1>ClassOne</h1>
          <span>AI Learning</span>
        </div>
      </div>

      <nav className="navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/ai-tutor"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>🤖</span>
          AI Tutor
        </NavLink>

        <NavLink
          to="/study-plan"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>📅</span>
          Study Plan
        </NavLink>

        <NavLink
          to="/learn"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>📚</span>
          Learn
        </NavLink>

        <NavLink
          to="/tests"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>📝</span>
          Tests
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>📊</span>
          Progress
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="student-avatar">A</div>

        <div>
          <strong>Ayesha</strong>
          <span>Class 9 • FBISE</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;