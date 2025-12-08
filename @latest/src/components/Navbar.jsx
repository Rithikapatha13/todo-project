function Navbar({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login";  // redirect to login
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
        TODO TASKS
      </h1>

      <div className="flex items-center gap-3">
        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-indigo-100 font-medium shadow hover:bg-indigo-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
