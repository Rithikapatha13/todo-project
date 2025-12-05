function SearchFilterBar({
  search,
  setSearch,
  filterType,
  setFilterType,
  sortType,
  setSortType,
  markAllCompleted,
}) {
  const filters = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "COMPLETED", label: "Completed" },
    { key: "TODAY", label: "Today" },
    { key: "OVERDUE", label: "Overdue" },
  ];

  return (
    <div className="space-y-4">
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-sm opacity-60">🔍</span>
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-indigo-400/70 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="w-full md:w-48 px-3 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-indigo-400/70 shadow-sm"
        >
          <option value="none">Sort: None</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="createdAt">Sort by Created Date</option>
        </select>

        <button
          onClick={markAllCompleted}
          className="w-full md:w-auto px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md hover:shadow-lg"
        >
          ✅ Mark All Completed
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterType(f.key)}
            className={
              "px-3 py-1.5 rounded-full text-xs border shadow-sm " +
              (filterType === f.key
                ? "bg-indigo-500/90 text-white border-indigo-300"
                : "bg-white/20 dark:bg-slate-900/20 border-white/30 hover:bg-white/30")
            }
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilterBar;
