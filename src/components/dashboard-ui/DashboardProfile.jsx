import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getUserBlogs} from "../../appFeatures/blogSlice" 
import {Link} from "react-router-dom"

export default function DashboardProfile() {
  const { userData } = useSelector((state) => state.auth);
const {blogs} = useSelector((state)=> state.blog)

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getUserBlogs()); // This should trigger Appwrite blog fetch
}, []);
const userPostCount = blogs?.filter(blog => blog.userId === userData?.$id).length;
const userDraftCount = blogs?.filter(blog => blog.status === "draft").length;



// 📦 Convert UNIX timestamp to readable date
const formatJoinedDate = (isoString) => {
  if (!isoString) return "N/A";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};



  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white">Welcome, {userData?.name || "User"} 👋</h1>

      {/* Profile Overview */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center dark:bg-gray-700">
        <img
          src={`https://ui-avatars.com/api/?name=${userData?.name || "User"}&background=random&bold=true`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{userData?.name || "User Name"}</h2>
          <p className="text-gray-600 dark:text-white">{userData?.email || "email@example.com"}</p>
          <p className="text-sm text-gray-400 mt-1 dark:text-white"> Joined: {userData?.registration ? formatJoinedDate(userData.registration) : "N/A"}</p>
        </div>
      </div>

{/* Dashboard Overview Section */}
<section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Create New Post */}
  <Link to= "/dashboard/create">
  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition cursor-pointer
  dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white">
    <div className="flex items-center gap-4">
      <div className="bg-white text-indigo-600 p-3 rounded-full dark:bg-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Create New Post</h3>
        <p className="text-sm text-indigo-100">Start sharing your ideas!</p>
      </div>
    </div>
  </div>
               </Link>

  {/* My Posts */}
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium  dark:text-white">Total Posts</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1  dark:text-white">{userPostCount > 0 ? userPostCount : "No Posts"}</p>
        <p className="text-sm text-gray-400 mt-1  dark:text-white">Published & Drafts</p>
      </div>
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v14a2 2 0 01-2 2z"/>
        </svg>
      </div>
    </div>
  </div>

  {/* Account Settings */}
  <Link to= "/dashboard/setting/account">
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium  dark:text-white">Account Settings</h3>
        <p className="text-base font-semibold text-gray-800 mt-1  dark:text-white">Manage profile & password</p>
      </div>
      <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full dark:bg-gray-700 dark:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 7.292m0 0a4 4 0 100 7.292M12 4v16"/>
        </svg>
      </div>
    </div>
  </div>
</Link>
  {/* Bookmarked Posts */}
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium  dark:text-white">Bookmarked</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1  dark:text-white">0</p>
        <p className="text-sm text-gray-400 mt-1  dark:text-white">Saved for later</p>
      </div>
      <div className="bg-green-100 text-green-600 p-3 rounded-full dark:bg-gray-800">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"/>
        </svg>
      </div>
    </div>
  </div>

  {/* Draft Posts */}
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium  dark:text-white">Drafts</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1 v  dark:text-white">{userDraftCount > 0 ? userDraftCount : "No Posts"}</p>
        <p className="text-sm text-gray-400 mt-1  dark:text-white">Unpublished posts</p>
      </div>
      <div className="bg-pink-100 text-pink-600 p-3 rounded-full dark:bg-gray-800">
        <svg className="w-6 h-6 dark:bg-pink-100" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 10l4.553-2.276a1 1 0 010 1.553L15 12l-6-3 6-3z"/>
        </svg>
      </div>
    </div>
  </div>

  {/* Help & Support */}
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium  dark:text-white">Support</h3>
        <p className="text-base font-semibold text-gray-800 mt-1  dark:text-white">Get help or contact us</p>
      </div>
      <div className="bg-red-100 text-red-600 p-3 rounded-full dark:bg-gray-100">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"/>
        </svg>
      </div>
    </div>
  </div>

</section>




    </main>
  )
}
