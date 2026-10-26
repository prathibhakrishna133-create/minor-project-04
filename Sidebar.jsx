import { CheckSquare, NotebookPen, Sparkles } from "lucide-react";

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark"><CheckSquare size={21} /></span>
        <span>daybook<span className="brand-period">.</span></span>
      </div>

      <p className="nav-label">WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        <button
          className={`nav-item ${activePage === "tasks" ? "active" : ""}`}
          onClick={() => onNavigate("tasks")}
        >
          <CheckSquare size={18} />
          <span>My tasks</span>
        </button>
        <button
          className={`nav-item ${activePage === "notes" ? "active" : ""}`}
          onClick={() => onNavigate("notes")}
        >
          <NotebookPen size={18} />
          <span>My notes</span>
        </button>
      </nav>

      <div className="sidebar-tip">
        <span className="tip-icon"><Sparkles size={17} /></span>
        <h3>A little reminder</h3>
        <p>You don't have to do everything today. Just start with one thing.</p>
      </div>
      <div className="sidebar-bottom">
        <span className="avatar">D</span>
        <div><strong>My workspace</strong><small>Personal space</small></div>
      </div>
    </aside>
  );
}