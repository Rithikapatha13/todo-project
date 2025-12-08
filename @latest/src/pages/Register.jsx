import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration successful!");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-xl transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
