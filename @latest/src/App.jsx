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

  // Fetch all todos with token
  const loadTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found → not logged in");
        setTodos([]);
        return;
      }

      const res = await fetch(API_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        console.error("Unauthorized");
        setTodos([]);
        return;
      }

      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []); // IMPORTANT SAFETY FIX
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setTodos([]);
    }
  };

  // Load from cache, then from API
  useEffect(() => {
    loadTodos();
  }, []);

  // Create Todo (with token)
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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

  // Delete + Undo (with token)
  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((t) => t.id === id);
    setUndoTodo(todoToDelete);

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    loadTodos();

    const timer = setTimeout(() => setUndoTodo(null), 5000);
    setUndoTimer(timer);
  };

  const undoDelete = async () => {
    clearTimeout(undoTimer);
    const { id, createdAt, updatedAt, ...rest } = undoTodo;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(rest),
    });

    setUndoTodo(null);
    loadTodos();
  };

  // Toggle status (with token)
  const toggleStatus = async (todo) => {
    const updated = {
      ...todo,
      status: todo.status === "PENDING" ? "COMPLETED" : "PENDING",
    };

    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(updated),
    });

    loadTodos();
  };

  // Mark all completed (with token)
  const markAllCompleted = async () => {
    const pending = todos.filter((t) => t.status !== "COMPLETED");

    await Promise.all(
      pending.map((t) =>
        fetch(`${API_URL}/${t.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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

    if (filterType === "PENDING")
      list = list.filter((t) => t.status === "PENDING");
    if (filterType === "COMPLETED")
      list = list.filter((t) => t.status === "COMPLETED");
    if (filterType === "TODAY")
      list = list.filter((t) => t.dueDate?.slice(0, 10) === today);
    if (filterType === "OVERDUE")
      list = list.filter(
        (t) =>
          t.dueDate && t.dueDate.slice(0, 10) < today && t.status === "PENDING"
      );

    if (sortType === "dueDate")
      list.sort(
        (a, b) =>
          new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity)
      );
    if (sortType === "createdAt")
      list.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );

    setFiltered(list);
  }, [todos, search, filterType, sortType]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-emerald-50"
      } py-10 px-4`}
    >
      <div className="max-w-5xl mx-auto">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div
          className="
  backdrop-blur-xl 
  bg-white/5 dark:bg-white/2
  border border-white/30 dark:border-white/10 
  rounded-3xl 
  shadow-2xl shadow-indigo-300/30 dark:shadow-black/40 
  p-6 
  space-y-6
  
"
        >
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            sortType={sortType}
            setSortType={setSortType}
            markAllCompleted={markAllCompleted}
          />

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
            <TodoForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
            />

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <p className="text-center opacity-70 text-gray-400">No tasks found.</p>
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

      <UndoSnackbar undoTodo={undoTodo} undoDelete={undoDelete} />
    </div>
  );
}

export default App;
