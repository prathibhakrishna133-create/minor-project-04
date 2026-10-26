import { Check, Circle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/storage";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOverdue = task.dueDate && !task.completed && task.dueDate < new Date().toISOString().slice(0, 10);

  return (
    <article className={`task-item panel ${task.completed ? "task-completed" : ""}`}>
      <button className={`task-check ${task.completed ? "checked" : ""}`} aria-label={task.completed ? "Mark as pending" : "Mark as completed"} onClick={() => onToggle(task.id)}>
        {task.completed ? <Check size={16} /> : <Circle size={20} />}
      </button>
      <div className="task-copy">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`status-pill ${task.completed ? "status-done" : "status-pending"}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
          {task.dueDate && <span className={`due-date ${isOverdue ? "overdue" : ""}`}>{isOverdue ? "Overdue · " : "Due · "}{formatDate(task.dueDate)}</span>}
        </div>
      </div>
      <div className="task-menu-wrap">
        <button className="icon-button" aria-label="Task actions" onClick={() => setMenuOpen((open) => !open)}><MoreHorizontal size={20} /></button>
        {menuOpen && (
          <div className="action-menu">
            <button onClick={() => { onEdit(task); setMenuOpen(false); }}><Pencil size={15} /> Edit</button>
            <button className="delete-action" onClick={() => { onDelete(task.id); setMenuOpen(false); }}><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}