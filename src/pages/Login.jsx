import React,{useState} from "react";
import {Link} from "react-router-dom"
import {LoginForm,Alert} from "../components"
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from '../appFeatures/authSlice';
import { useNavigate} from "react-router-dom";


function Login() {
  const [alert, setAlert]= useState({type:"", message:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()


const {status, error} = useSelector((state) => state.auth)


     const handleLogin = async (formData) => {
        setAlert({ type: "", message: "" }); // clear previous alerts

   const resultAction = await dispatch(loginUser(formData))

   if (loginUser.fulfilled.match(resultAction)) {
      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => navigate("/dashboard"), 1000);
    }else if (loginUser.rejected.match(resultAction)) {
    // Login failed
    setAlert({ type: "error", message: resultAction.payload || "Login failed" });
  }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center p-10">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">
            Create, share, and explore blogs from amazing writers.
            <br /><br/>
            <span className="font-semibold">Don't have an account?</span><br/>
            <Link to="/signup">
            <span className="font-semibold" style={{color:"#0000FF", textDecoration:"underline"}}>Sign up to get started.</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel (Login Form) */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
           {alert.message && <Alert type={alert.type} message={alert.message} />}
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <LoginForm onSubmit={handleLogin} loading={status === "loading"} />
         {status === "failed" && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login
