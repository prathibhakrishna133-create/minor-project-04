import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, ListTodo, Plus, Search, SlidersHorizontal } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { readStorage, writeStorage } from "../utils/storage";

const FILTERS = ["All", "Pending", "Completed"];

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => readStorage("daybook-tasks", []));
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    writeStorage("daybook-tasks", tasks);
  }, [tasks]);

  const editingTask = tasks.find((task) => task.id === editingId);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  function saveTask(taskDetails) {
    if (editingId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId ? { ...task, ...taskDetails } : task
        )
      );
    } else {
      setTasks((currentTasks) => [
        { id: crypto.randomUUID(), ...taskDetails, completed: false, createdAt: new Date().toISOString() },
        ...currentTasks,
      ]);
    }
    setShowForm(false);
    setEditingId(null);
  }

  function editTask(task) {
    setEditingId(task.id);
    setShowForm(true);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    if (editingId === taskId) {
      setEditingId(null);
      setShowForm(false);
    }
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR DAY, YOUR PACE</p>
          <h1>My tasks<span className="heading-dot">.</span></h1>
          <p className="page-subtitle">Make room for what matters today.</p>
        </div>
        <button className="primary-button" onClick={() => { setEditingId(null); setShowForm(true); }}>
          <Plus size={18} /> Add a task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon lilac"><ListTodo size={19} /></span>
          <div><p>Total tasks</p><strong>{tasks.length}</strong></div>
          <span className="stat-caption">on your list</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon peach"><Circle size={19} /></span>
          <div><p>Pending</p><strong>{pendingCount}</strong></div>
          <span className="stat-caption">left to do</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon mint"><CheckCircle2 size={19} /></span>
          <div><p>Completed</p><strong>{completedCount}</strong></div>
          <span className="stat-caption">nicely done</span>
        </div>
      </div>

      <div className="section-toolbar">
        <div><h2>Today's list</h2><p>Keep it simple, one task at a time.</p></div>
        <div className="search-box">
          <Search size={17} />
          <input aria-label="Search tasks" placeholder="Find a task..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label"><SlidersHorizontal size={15} /> Show</span>
        {FILTERS.map((item) => (
          <button key={item} className={`filter-button ${filter === item ? "selected" : ""}`} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
        <span className="results-count">{visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}</span>
      </div>

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onSave={saveTask}
          onCancel={closeForm}
        />
      )}

      <TaskList tasks={visibleTasks} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
    </section>
  );
}