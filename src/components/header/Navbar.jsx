import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { logoutUser as logoutSession } from "../../appFeatures/authSlice"
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector((state) => state.auth)
  const handleLoginToggleClick = ()=>{
    setMenuOpen(false)
    navigate("/login")
  }
  
  // handle logout
  const handleLogout = async ()=>{
    try {
      await authService.logoutUser()
      dispatch(logoutSession())
      navigate("/login")
      window.location.reload(); // force full UI refresh
    } catch (error) {
       console.error("Logout failed:", error);
    }

  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold tracking-tight">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
            MyBlog
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {isAuthenticated ? (
<Link to="/dashboard" className="hover:underline hover:text-pink-300">
    Dashboard
  </Link>
            ) : (
  <Link to="/" className="hover:underline hover:text-pink-300">
              Home
            </Link>
            )}
          
            <Link to="/posts" className="hover:underline hover:text-pink-300">
              Posts
            </Link>
            <Link to="/about" className="hover:underline hover:text-pink-300">
              About
            </Link>
            {/* when user logged in */}
            {isAuthenticated ? (
              <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
            ):( 
            // when user not logged in
            <button className="ml-4 px-4 py-2 bg-pink-500 rounded-md hover:bg-pink-400 transition">
             <Link to="/login">
              Login
             </Link>
            </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 pt-2 pb-4 space-y-2">
          {isAuthenticated ? (
             <Link
            to="/dashboard"
            className="block text-white hover:bg-indigo-600 rounded-md px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          ):(
<Link
            to="/"
            className="block text-white hover:bg-indigo-600 rounded-md px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          )}
          
          <Link
            to="/posts"
            className="block text-white hover:bg-indigo-600 rounded-md px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Posts
          </Link>
          <Link
            to="/about"
            className="block text-white hover:bg-indigo-600 rounded-md px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 bg-red-500 rounded-md hover:bg-red-400 transition"
            >
              Logout
            </button>
          ) : (
          <button
            className="w-full text-left px-3 py-2 bg-pink-500 rounded-md hover:bg-pink-400 transition"
  onClick={handleLoginToggleClick}
          >
            Login
          </button>
          )}
        </div>
      )}
    </nav>
  );
}
