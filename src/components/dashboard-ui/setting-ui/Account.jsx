import React, { useEffect, useState } from "react";
import { Input, Button } from "../../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logout,
  updateEmail,
  updateName,
} from "../../../appFeatures/authSlice";
import {Alert} from "../../index"

function Account() {
  const [newName, setnewName] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAlert,setNameAlert] = useState({type:"", message:""})
  const [emailAlert,setEmailAlert] = useState({type:"", message:""})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    updateEmailLoading,
    updateNameLoading,
    errorNameUpdate,
    errorEmailUpdate,
  } = useSelector((state) => state.auth);

  // function to update name
  const handleUpdateName = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateName(newName)).unwrap();
      setNameAlert({type:"success", message:"Name updated successfully"});
      setnewName("");
    } catch (error) {
setNameAlert({ type: "error", message: "Failed to update name" });
    }
  };
// Effect to auto-hide alert after  seconds
useEffect(()=>{
  if(nameAlert.message || emailAlert.message){
    const timer = setTimeout(()=>{
setNameAlert({ type: "", message: "" });
setEmailAlert({ type: "", message: "" });
    },2200)
        return () => clearTimeout(timer);

  }
},[nameAlert.message, emailAlert.message])

  // functon to update email
  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    if (!newEmail || !password) {
      return setEmailAlert({type:"error",message:"Both fields are required"});
    }

    try {
      await dispatch(updateEmail({ newEmail, password })).unwrap();

      setEmailAlert({type:"success",message:"Email updated successfully! Please login again."});
setTimeout(async ()=>{
    await dispatch(logout());
      navigate("/login");
},2200)
  

      setPassword("");
      setnewEmail("");
    } catch (error) {
      console.log("Caught error:", error);
      setEmailAlert({type:"error",messsage:"failed to update"});
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-2">Profile Overview</h2>
        <p className="text-gray-600 dark:text-white">
          Manage your account setting from here.
        </p>
      </div>
      {/* Name update */}
      <div className="border-2 my-4 p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Update your Username</h2>

        <div className="flex flex-col gap-2">
          {/* name update form */}
          <form onSubmit={handleUpdateName}>
            {nameAlert.message && <Alert type={nameAlert.type} message={nameAlert.message} />}
            <Input
              label="Name"
              type="text"
              value={newName}
              onChange={(e) => setnewName(e.target.value)}
              name="name"
              placeholder="Your name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />

            <Button
              type="submit"
              disabled={updateNameLoading}
              variant="secondary"
              size="md"
              className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
            >
              {updateNameLoading ? "Update..." : "Update"}
            </Button>
            {errorNameUpdate && (
              <p className="text-red-500">{errorNameUpdate}</p>
            )}
          </form>
        </div>
      </div>

      {/* Email update */}
      <div className="border-2 my-4 p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Update your Email</h2>

        <div className="flex flex-col gap-2">
          {/* email update form */}
          <form onSubmit={handleUpdateEmail}>
             {emailAlert.message && <Alert type={emailAlert.type} message={emailAlert.message} />}
            <Input
              label="Enter your new Email"
              type="email"
              name="email"
              value={newEmail}
              onChange={(e) => setnewEmail(e.target.value)}
              placeholder="Enter your new email@example.com"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />
            <Input
              label="Current password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your old password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            />

            <Button
              type="submit"
              disabled={updateEmailLoading}
              variant="secondary"
              size="md"
              className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
            >
              {updateEmailLoading ? "Update..." : "Update"}
            </Button>
            {errorEmailUpdate && (
              <p className="text-red-500">{errorEmailUpdate}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Account;
