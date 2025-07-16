import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
     DashboardProfile, DashboardSidebar,CreatePost, MyPost, Setting, Blog, EditPost
} from '../components/index'

function Dashboard() {
   

  return (
   
     <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

        {/* Main Content (changes based on inner route) */}

       <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardProfile/>} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<MyPost />} />
          <Route path="setting" element={<Setting />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="blog/:id/edit" element={<EditPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
