import { useState } from "react";
import { CheckSquare, NotebookPen } from "lucide-react";
import Sidebar from "./components/Sidebar";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";

export default function App() {
  const [activePage, setActivePage] = useState("tasks");

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <header className="mobile-brand">
          <span className="brand-mark"><CheckSquare size={19} /></span>
          <span>daybook</span>
        </header>
        {activePage === "tasks" ? (
          <TodoApp />
        ) : (
          <NotesApp />
        )}
        <footer className="page-footer">
          <span><CheckSquare size={14} /> Daybook</span>
          <span>Small steps, clear mind.</span>
        </footer>
      </main>
    </div>
  );
}