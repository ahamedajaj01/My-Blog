import React,{useState} from 'react'
import {Input, Button} from "../../index"

function Account({onSubmit, loading}) {
    const [errors, setError] = useState()

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
    
    <Input
    label = "Name"
      type="text"
     
      name="name"
      placeholder="Your name"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
      {/* {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
      )} */}
 <Button
        type="submit"
        disabled={loading}
        variant="secondary"
        size="md"
        className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
      >
        {loading ? "Update..." : "Update"}
      </Button>
  </div>
</div>
{/* Email update */}
 <div className="border-2 my-4 p-6 rounded-md shadow-sm">
  <h2 className="text-xl font-semibold mb-6">Update your Email</h2>
  
  <div className="flex flex-col gap-2">
    
    <Input
     label="Email"
        type="email"
        name="email"
              placeholder="you@example.com"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
      {/* {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
      )} */}
 <Button
        type="submit"
        disabled={loading}
        variant="secondary"
        size="md"
        className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
      >
        {loading ? "Update..." : "Update"}
      </Button>
  </div>
</div>
   
    </>
  )
}

export default Account
