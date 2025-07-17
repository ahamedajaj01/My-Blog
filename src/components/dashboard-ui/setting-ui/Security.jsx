import React from 'react'
import {Input, Button} from "../../index"
function Security({loading}) {
  return (
    <>
     {/* Change Your password */}
 <div className="border-2 my-4 p-6 rounded-md shadow-sm">
  <h2 className="text-xl font-semibold mb-6">Change Your password</h2>
  
  <div className="flex flex-col gap-2">
    
    <Input
    label = "Current password"
      type="password"
  
      name="password"
      placeholder="Enter your old password"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
    <Input
    label = "New password"
      type="password"
      id="password"
      name="password"
      placeholder="Enter your new password"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
      {/* {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )} */}
 <Button
        type="submit"
        disabled={loading}
        variant="secondary"
        size="md"
        className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
      >
        {loading ? "Updating..." : "Update"}
      </Button>
  </div>
</div>
{/* Two-Factor Authentication */}
<h3 className="text-lg font-semibold mt-8 mb-4">Two-Factor Authentication</h3>
<p className="text-sm text-gray-600 mb-2 dark:text-white">Add an extra layer of security to your account.</p>
<Button
type= "submit"
variant="secondary"
size="md"
disabled={loading}
className="px-4 py-2 border rounded dark:bg-gray-400 dark:text-black dark:hover:bg-gray-600"
>
     {loading ? "Enable Two-Factor Authentication..." : "Enable Two-Factor Authentication"}
     </Button>

     {/* delete account */}
     <h3 className="text-lg font-semibold mt-8 mb-4 text-red-600">Danger Zone</h3>
<p className="text-sm text-gray-600 mb-2 dark:text-white">This action is irreversible. Your account and blogs will be deleted permanently.</p>
<Button 
type= "submit"
size="md"
variant= "danger"
disabled={loading}
className="px-4 py-2 border bg-red-800 text-white roundedhover:bg-red-100 dark:bg-red-800 dark:hover:bg-red-400">
{loading ? "  Delete My Account..." : "  Delete My Account"}
</Button>

    </>
  )
}

export default Security
