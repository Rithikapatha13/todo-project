// import { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) return alert(data.message || "Registration failed");

//     alert("Account created successfully!");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

//       <div className="bg-white shadow-xl w-full max-w-md p-8 rounded-xl border border-gray-200">

//         {/* LOGO */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="h-14 w-14 bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold rounded-lg">
//             TT
//           </div>
//           <h2 className="text-2xl font-bold mt-3 text-gray-800">Create Account</h2>
//           <p className="text-gray-500 text-sm">Start your productivity journey</p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleRegister} className="space-y-5">
//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input
//               type="email"
//               className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Password</label>
//             <input
//               type="password"
//               className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a strong password"
//             />
//           </div>

//           <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?
//           <a href="/login" className="text-indigo-600 hover:underline ml-1">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message || "Registration failed");

    alert("Account created successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl w-full max-w-md p-8 rounded-xl border border-gray-200">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold rounded-lg">
            TT
          </div>
          <h2 className="text-2xl font-bold mt-3 text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Start your productivity journey</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
            />
          </div>

          {/* PASSWORD FIELD WITH EYE ICON */}
          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <a href="/login" className="text-indigo-600 hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
}
