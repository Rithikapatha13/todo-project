function TodoForm({ form, setForm, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/20 dark:bg-slate-900/50 border border-white/30 dark:border-slate-800 rounded-2xl p-4 shadow-lg space-y-3"
    >
      <h2 className="font-semibold text-lg">Add a new task</h2>

      <input
        type="text"
        placeholder="Title *"
        className="w-full px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border"
        value={form.title}
        required
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description (optional)"
        className="w-full px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          className="px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <input
          type="date"
          className="px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <button className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md">
        + Add Task
      </button>
    </form>
  );
}

export default TodoForm;
