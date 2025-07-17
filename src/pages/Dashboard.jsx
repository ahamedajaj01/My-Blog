import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {
     DashboardProfile, DashboardSidebar,CreatePost, MyPost, Setting, Blog, EditPost,Account,Security,Preferences
} from '../components/index'

function Dashboard() {
   

  return (
   

     <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

        {/* Main Content (changes based on inner route) */}
  {/* content */}
       <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardProfile/>} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<MyPost />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="blog/:id/edit" element={<EditPost />} />
          {/* dashboard setting */}
          <Route path="setting/" element={<Setting />}>
          {/* Setting components route */}
              <Route path="account" element={<Account />} />
              <Route path="security" element={<Security />} />
              <Route path="preferences" element={<Preferences />} />

          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
