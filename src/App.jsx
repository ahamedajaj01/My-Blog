import { useEffect } from "react";
import { Navbar, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentUser } from "./appFeatures/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ReadPost from "./pages/ReadPost"
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const dispatch = useDispatch();
  const { isLoading} = useSelector((state) => state.auth);

  // To apply toggle effect in website
  const darkMode = useSelector((state)=> state.theme.darkMode)

  useEffect(()=>{
     if (darkMode) {
      document.documentElement.classList.add('dark');
          localStorage.setItem("theme", "dark"); // ✅ Save to localStorage
    } else {
      document.documentElement.classList.remove('dark');
          localStorage.setItem("theme", "light"); // ✅ Save to localStorage
    }
  }, [darkMode])

  //  This keeps auth in sync
  useEffect(() => {
    //  Check current user on app load
    dispatch(checkCurrentUser());
  }, []);
  // ✅ wait until auth check completes
 
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <>
     <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white"> 

     
      {/* Your app content here */}
  
      <Navbar />
      {/* <Routes> */}
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/readPost/:id" element={<ReadPost />} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>

      <Footer />
    </div>
    </>
  );
}

export default App;
