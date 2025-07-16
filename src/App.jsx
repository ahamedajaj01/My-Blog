import { useEffect } from "react";
import { Navbar, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentUser } from "./appFeatures/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  // 👈 This keeps auth in sync
  useEffect(() => {
    // 👈 Check current user on app load
    dispatch(checkCurrentUser());
  }, []);
  // ✅ wait until auth check completes
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <>
      <Navbar />
      {/* <Routes> */}
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

        <Route path="/about" element={<About />} />
        
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
