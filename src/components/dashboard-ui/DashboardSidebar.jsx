import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../appFeatures/authSlice";

export default function DashboardSidebar() {
  const [sidebarOpen , setSidebarOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

const handleToggle = ()=>{
 setSidebarOpen(true)
}
const handleClose = ()=>{
  setSidebarOpen(false)
}

  
  return (
    <>
      {/* Sidebar Toggle Arrow */}
      {!sidebarOpen && (
        <button
          onClick={handleToggle}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-indigo-600 text-white px-2 py-1 rounded-r-lg shadow z-50 md:hidden"
        >
          ➤
        </button>
      )}

      <aside
        className={`
          bg-gradient-to-r from-purple-400 to-indigo-500 text-white w-64 min-h-screen flex flex-col p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
          fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:block
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button (top-right inside sidebar) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl md:hidden"
        >
          ✕
        </button>

        {/* User Info */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 mx-auto bg-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-2 font-semibold text-lg">{userData?.name}</h2>
          <p className="text-sm text-gray-300">{userData?.email}</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3 text-sm">
          <Link to="/dashboard" className="hover:text-pink-400 transition"
            onClick={() => setSidebarOpen(false)}  
          >
            🙍‍♂️ Profile
          </Link>
          <Link to="/dashboard/posts" className="hover:text-pink-400 transition"
            onClick={() => setSidebarOpen(false)}  
          >
            📝 My Posts
          </Link>
          <Link to="/dashboard/create" className="hover:text-pink-400 transition"
            onClick={() => setSidebarOpen(false)}  
          >
            ➕ New Post
          </Link>
          <Link to="/dashboard/setting/account" className="hover:text-pink-400 transition"
            onClick={() => setSidebarOpen(false)}  
          >
            ⚙️ Setting
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-6 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  


  )
}
