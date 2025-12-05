import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchFilterBar from "./components/SearchFilterBar";
import TodoForm from "./components/TodoForm";
import TodoCard from "./components/TodoCard";
import UndoSnackbar from "./components/UndoSnackBar";
import "./tailwind.css";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [sortType, setSortType] = useState("none");

  const [undoTodo, setUndoTodo] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
    dueDate: "",
  });

  // Fetch all todos
  const loadTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
      localStorage.setItem("todos", JSON.stringify(data));
    } catch {
      console.error("Failed to load todos");
    }
  };

  // Load from cache, then from API
  useEffect(() => {
    const cached = localStorage.getItem("todos");
    if (cached) {
      try {
        setTodos(JSON.parse(cached));
      } catch {}
    }
    loadTodos();
  }, []);

  // Create
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      status: "PENDING",
      dueDate: "",
    });

    loadTodos();
  };

  // Delete + Undo
  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((t) => t.id === id);
    setUndoTodo(todoToDelete);

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTodos();

    const timer = setTimeout(() => setUndoTodo(null), 5000);
    setUndoTimer(timer);
  };

  const undoDelete = async () => {
    clearTimeout(undoTimer);
    const { id, createdAt, updatedAt, ...rest } = undoTodo;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });

    setUndoTodo(null);
    loadTodos();
  };

  // Toggle status
  const toggleStatus = async (todo) => {
    const updated = {
      ...todo,
      status: todo.status === "PENDING" ? "COMPLETED" : "PENDING",
    };

    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    loadTodos();
  };

  // Mark all completed
  const markAllCompleted = async () => {
    const pending = todos.filter((t) => t.status !== "COMPLETED");

    await Promise.all(
      pending.map((t) =>
        fetch(`${API_URL}/${t.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...t, status: "COMPLETED" }),
        })
      )
    );

    loadTodos();
  };

  // Filtering + Sorting + Search
  useEffect(() => {
    let list = [...todos];
    const today = new Date().toISOString().slice(0, 10);

    if (search.trim()) {
      list = list.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterType === "PENDING") list = list.filter((t) => t.status === "PENDING");
    if (filterType === "COMPLETED") list = list.filter((t) => t.status === "COMPLETED");
    if (filterType === "TODAY")
      list = list.filter((t) => t.dueDate?.slice(0, 10) === today);
    if (filterType === "OVERDUE")
      list = list.filter(
        (t) => t.dueDate && t.dueDate.slice(0, 10) < today && t.status === "PENDING"
      );

    if (sortType === "dueDate")
      list.sort(
        (a, b) => new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity)
      );
    if (sortType === "createdAt")
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );

    setFiltered(list);
  }, [todos, search, filterType, sortType]);

  return (

   <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-emerald-50"} py-10 px-4`}>




      <div className="max-w-5xl mx-auto">
        {/* NAVBAR */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* GLASS PANEL */}
       <div className="backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-xl p-6 space-y-6">

          
          {/* SEARCH + FILTER + SORT */}
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            sortType={sortType}
            setSortType={setSortType}
            markAllCompleted={markAllCompleted}
          />

          {/* FORM + LIST */}
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
            <TodoForm form={form} setForm={setForm} handleSubmit={handleSubmit} />

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <p className="text-center opacity-70">No tasks found.</p>
              ) : (
                filtered.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    toggleStatus={toggleStatus}
                    deleteTodo={deleteTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SNACKBAR */}
      <UndoSnackbar undoTodo={undoTodo} undoDelete={undoDelete} />
    </div>
  );
}

export default App;
