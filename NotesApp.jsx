import { useEffect, useMemo, useState } from "react";
import { FileText, Plus, Search, StickyNote } from "lucide-react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import { readStorage, writeStorage } from "../utils/storage";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => readStorage("daybook-notes", []));
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All notes");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    writeStorage("daybook-notes", notes);
  }, [notes]);

  const editingNote = notes.find((note) => note.id === editingId);
  const categories = ["All notes", ...new Set(notes.map((note) => note.category).filter(Boolean))];

  const visibleNotes = useMemo(() => notes.filter((note) => {
    const searchText = `${note.title} ${note.content} ${note.category}`.toLowerCase();
    return searchText.includes(search.toLowerCase()) &&
      (categoryFilter === "All notes" || note.category === categoryFilter);
  }), [notes, search, categoryFilter]);

  function saveNote(details) {
    const now = new Date().toISOString();
    if (editingId) {
      setNotes((currentNotes) => currentNotes.map((note) =>
        note.id === editingId ? { ...note, ...details, updatedAt: now } : note
      ));
    } else {
      setNotes((currentNotes) => [
        { id: crypto.randomUUID(), ...details, createdAt: now, updatedAt: now },
        ...currentNotes,
      ]);
    }
    setShowForm(false);
    setEditingId(null);
  }

  function editNote(note) {
    setEditingId(note.id);
    setShowForm(true);
  }

  function deleteNote(noteId) {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));
    if (editingId === noteId) closeForm();
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">THOUGHTS, SAVED GENTLY</p>
          <h1>My notes<span className="heading-dot">.</span></h1>
          <p className="page-subtitle">A place for the little things you want to remember.</p>
        </div>
        <button className="primary-button" onClick={() => { setEditingId(null); setShowForm(true); }}><Plus size={18} /> New note</button>
      </div>

      <div className="notes-overview">
        <div className="notes-overview-icon"><StickyNote size={22} /></div>
        <div><strong>{notes.length} {notes.length === 1 ? "note" : "notes"} saved</strong><p>Your ideas stay here, even after you refresh.</p></div>
        <span className="overview-decoration"><FileText size={35} /></span>
      </div>

      {showForm && <NoteForm initialNote={editingNote} onSave={saveNote} onCancel={closeForm} />}

      <div className="section-toolbar notes-toolbar">
        <div><h2>Your notebook</h2><p>Collect ideas, reminders, and passing thoughts.</p></div>
        <div className="search-box"><Search size={17} /><input aria-label="Search notes" placeholder="Search your notes..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      </div>

      <div className="category-row">
        {categories.map((category) => (
          <button key={category} className={`filter-button ${categoryFilter === category ? "selected" : ""}`} onClick={() => setCategoryFilter(category)}>{category}</button>
        ))}
        <span className="results-count">{visibleNotes.length} shown</span>
      </div>

      {visibleNotes.length ? (
        <div className="notes-grid">
          {visibleNotes.map((note) => <NoteCard key={note.id} note={note} onEdit={editNote} onDelete={deleteNote} />)}
        </div>
      ) : (
        <div className="empty-state panel">
          <span className="empty-icon"><StickyNote size={25} /></span>
          <h3>{search ? "No notes found" : "Your notebook is waiting"}</h3>
          <p>{search ? "Try another search word or category." : "Create your first note and keep a thought close by."}</p>
        </div>
      )}
    </section>
  );
}