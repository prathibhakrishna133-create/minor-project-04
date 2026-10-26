import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

export default function TaskForm({ initialTask, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialTask?.title ?? "");
    setDueDate(initialTask?.dueDate ?? "");
    setError("");
  }, [initialTask]);

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Please enter a task name.");
      return;
    }
    onSave({ title: cleanTitle, dueDate });
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>{initialTask ? "Edit task" : "What needs doing?"}</h3>
        <button type="button" className="icon-button" aria-label="Close form" onClick={onCancel}><X size={18} /></button>
      </div>
      <label htmlFor="task-title">Task name</label>
      <input id="task-title" autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Finish my assignment" maxLength={120} />
      <label htmlFor="task-date"><CalendarDays size={15} /> Due date <span className="optional-label">(optional)</span></label>
      <input id="task-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-button">{initialTask ? "Save changes" : "Add task"}</button>
      </div>
    </form>
  );
}