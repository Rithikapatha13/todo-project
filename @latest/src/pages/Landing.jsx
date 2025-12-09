import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1465436152/photo/agile-software-development-or-project-management-using-kanban-or-scrum-methodology-boards-on.jpg?s=612x612&w=0&k=20&c=WAmKHvU_cu5g3Fjj601SieyXCnSg8y7l5UDRDkZdo6k=)",
        }}
      ></div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-l bg-black/40"></div>

      {/* Center Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-3xl text-center text-white">

          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Todo Tasks</span>
          </h1>

          <p className="text-lg mb-6 opacity-90 leading-relaxed">
            Manage your day effortlessly with a clean and modern task manager.
            Stay organized, stay productive, stay ahead.
          </p>

          {/* Illustration */}
          {/* <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/task-management-3d-illustration-download-in-png-blend-fbx-gltf-formats--planning-dashboard-workflow-business-user-interface-pack-design-development-illustrations-7995640.png"
            alt="Task Illustration"
            className="w-64 mx-auto mb-8 drop-shadow-xl"
          /> */}

          {/* CTA Button */}
          <Link
            to="/login"
            className="inline-block px-8 py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-xl shadow-lg hover:bg-yellow-300 transition"
          >
            Get Started →
          </Link>

          <p className="mt-5 text-sm opacity-80">
            New here?{" "}
            <Link to="/register" className="underline text-yellow-300 hover:text-yellow-200">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
