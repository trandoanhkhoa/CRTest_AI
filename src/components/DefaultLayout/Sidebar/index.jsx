function Sidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col p-4 shadow-xl">
      <h1 className="text-xl font-bold mb-6 tracking-wide">📖 CRTest</h1>

      <nav className="flex flex-col gap-3 text-slate-300">
        <button
          onClick={() => handleLogout()}
          className="text-left hover:text-white transition flex items-center gap-2"
        >
          ⬅️ Logout
        </button>
      </nav>

      <div className="mt-auto text-slate-500 text-sm">© 2025 AI Platform</div>
    </div>
  );
}

export default Sidebar;
