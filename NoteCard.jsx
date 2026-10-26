import { MoreHorizontal, Pencil, Trash2, Clock3 } from "lucide-react";
import { useState } from "react";

function formatTimestamp(value) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function NoteCard({ note, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <article className="note-card panel">
      <div className="note-card-top">
        <span className={`category-tag category-${note.category.toLowerCase()}`}>{note.category}</span>
        <div className="task-menu-wrap">
          <button className="icon-button" aria-label="Note actions" onClick={() => setMenuOpen((open) => !open)}><MoreHorizontal size={20} /></button>
          {menuOpen && <div className="action-menu">
            <button onClick={() => { onEdit(note); setMenuOpen(false); }}><Pencil size={15} /> Edit</button>
            <button className="delete-action" onClick={() => { onDelete(note.id); setMenuOpen(false); }}><Trash2 size={15} /> Delete</button>
          </div>}
        </div>
      </div>
      <button className="note-card-content" onClick={() => onEdit(note)} aria-label={`Open note ${note.title}`}>
        <h3>{note.title}</h3>
        <p>{note.content || "No extra details added."}</p>
      </button>
      <div className="note-card-date"><Clock3 size={13} /><span>Updated {formatTimestamp(note.updatedAt || note.createdAt)}</span></div>
    </article>
  );
}