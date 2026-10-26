import { useEffect, useState } from "react";
import { X } from "lucide-react";

const NOTE_CATEGORIES = ["Personal", "Study", "Ideas", "Work", "Reminder"];

export default function NoteForm({ initialNote, onSave, onCancel }) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [category, setCategory] = useState(initialNote?.category ?? "Personal");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialNote?.title ?? "");
    setContent(initialNote?.content ?? "");
    setCategory(initialNote?.category ?? "Personal");
    setError("");
  }, [initialNote]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() && !content.trim()) {
      setError("Add a title or write something in your note.");
      return;
    }
    onSave({ title: title.trim() || "Untitled note", content: content.trim(), category });
  }

  return (
    <form className="note-form panel" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>{initialNote ? "Edit your note" : "A new thought"}</h3>
        <button type="button" className="icon-button" aria-label="Close form" onClick={onCancel}><X size={18} /></button>
      </div>
      <label htmlFor="note-title">Title</label>
      <input id="note-title" autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give this note a name..." maxLength={100} />
      <label htmlFor="note-category">Category</label>
      <select id="note-category" value={category} onChange={(event) => setCategory(event.target.value)}>
        {NOTE_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <label htmlFor="note-content">Your note</label>
      <textarea id="note-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write it down before it slips away..." rows={5} maxLength={5000} />
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-button">{initialNote ? "Save changes" : "Save note"}</button>
      </div>
    </form>
  );
}