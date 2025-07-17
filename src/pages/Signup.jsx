import React,{useState} from "react";
import { SignupForm, Alert } from "../components";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signupUser }  from "../appFeatures/authSlice";
import { useNavigate } from "react-router-dom";



export default function Signup() {
const [alert, setAlert] = useState({type:"", message:""})


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {status, error} = useSelector((state) => state.auth)

  const handleSignup = async (formData) => {
    const { name, email, password } = formData;
  const resultAction = await dispatch(signupUser({ name, email, password }))

   // ✅ Only navigate if the signup was fulfilled
    if (signupUser.fulfilled.match(resultAction)) {
            setAlert({ type: "success", message: "Signup successful!" });
// 👇 Give user a sec to see the alert before navigating
  setTimeout(() => {
    navigate("/dashboard");
  }, 1500);    }
  };

  return (
     <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 to-purple-600 text-white items-center justify-center p-10
       dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-white ">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Join MyBlog</h2>
          <p className="text-lg leading-relaxed">
            Create, share, and explore blogs from amazing writers.
            <br />
            <span className="font-semibold">Sign up to get started!</span>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {alert.message && (
    <Alert type={alert.type} message={alert.message} />
  )}
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
          <SignupForm onSubmit={handleSignup} loading={status === "loading"} />
            {/* ❌ Show error message if signup fails */}
          {status === "failed" && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
      <p className="text-center">Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
