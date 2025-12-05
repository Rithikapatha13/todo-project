function TodoCard({ todo, toggleStatus, deleteTodo }) {
  return (
    <div className="group backdrop-blur-xl bg-white/25 dark:bg-slate-900/70 border border-white/30 rounded-2xl p-4 shadow-md flex justify-between gap-4 hover:-translate-y-[2px] hover:shadow-lg transition">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">{todo.title}</h3>

          <span
            className={
              "px-2 py-0.5 text-xs rounded-full border " +
              (todo.status === "COMPLETED"
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-400/40"
                : "bg-amber-400/15 text-amber-400 border-amber-300/50")
            }
          >
            {todo.status}
          </span>
        </div>

        {todo.description && (
          <p className="text-sm opacity-80">{todo.description}</p>
        )}

        <div className="text-xs opacity-70">
          {todo.dueDate && <p>📅 {todo.dueDate.slice(0, 10)}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => toggleStatus(todo)}
          className="px-3 py-1 rounded-xl bg-green-500 text-white text-xs"
        >
          {todo.status === "PENDING" ? "Complete" : "Reopen"}
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1 rounded-xl bg-red-500 text-white text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
