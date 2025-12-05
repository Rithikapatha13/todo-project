

// import { useState } from "react";
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



  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
        TODO TASKS
      </h1>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-xl bg-indigo-500 text-indigo-300 font-medium shadow hover:bg-indigo-600"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Navbar;


// function Navbar() {
//   const [darkMode, setDarkMode] = useState(
//     document.documentElement.classList.contains("dark")
//   );

//   const toggleTheme = () => {
//     const html = document.documentElement;

//     if (html.classList.contains("dark")) {
//       html.classList.remove("dark");
//       setDarkMode(false);
//     } else {
//       html.classList.add("dark");
//       setDarkMode(true);
//     }
//   };

//   return (
//     <button onClick={toggleTheme}>
//       {darkMode ? "Light Mode" : "Dark Mode"}
//     </button>
//   );
// }
// export default Navbar;