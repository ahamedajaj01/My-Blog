import React,{useState, useEffect} from 'react'
import {Input, Button} from "../../index"
import { useDispatch, useSelector } from "react-redux";
import {updatePassword} from "../../../appFeatures/authSlice"
import {Alert} from "../../index"



function Security() {
const [currentPassword, setCurrentPassword] = useState("")
const [newPassword, setNewPassword] = useState("");
  const [alert,setAlert] = useState({type:"", message:""})

const dispatch = useDispatch()

const {updatePasswordLoading, error, status,isLoading} = useSelector((state)=> state.auth)

const handleUpdatePassword =async (e)=>{
  e.preventDefault();
 
  if(!currentPassword || ! newPassword){
      setAlert({type:"error", message:"Both field required"});
  }
  try {
    await dispatch(updatePassword({currentPassword,newPassword})).unwrap()
        setAlert({type:"success", message:"Password updated successfully!"});
setNewPassword("")
setCurrentPassword("")
  } catch (error) {
        setAlert({type:"error",message:"update failed,try again"});
  }
}
// Effect to auto-hide alert after some seconds
useEffect(()=>{
  if(alert){
    const timer = setTimeout(()=>{
      setAlert("")
    
    },2200)
        return () => clearTimeout(timer);

  }
},[alert])

  return (
    <>
     {/* Change Your password */}
 <div className="border-2 my-4 p-6 rounded-md shadow-sm">
  <h2 className="text-xl font-semibold mb-6">Change Your password</h2>
  
  <div className="flex flex-col gap-2">

    <form onSubmit={handleUpdatePassword} className='space-y-4'>
      {alert.message && <Alert type={alert.type} message={alert.message} />}
    <Input
    label = "Current password"
    type="password"
    value={currentPassword}
    onChange={(e)=>setCurrentPassword(e.target.value)}
    name="password"
    placeholder="Enter your old password"
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
    <Input
    label = "New password"
      type="password"
      value={newPassword}
      onChange={(e)=>setNewPassword(e.target.value)}
      name="password"
      placeholder="Enter your new password"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
    />
      
 <Button
        type="submit"
        disabled={updatePasswordLoading|| !currentPassword || !newPassword}
        variant="secondary"
        size="md"
        className="w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-400 dark:text-white"
        >
        {updatePasswordLoading ? "Updating..." : "Update Password"}
      </Button>
        {error && <p className="text-red-500">{error}</p>}
        </form>
  </div>
</div>
{/* Two-Factor Authentication */}
<h3 className="text-lg font-semibold mt-8 mb-4">Two-Factor Authentication</h3>
<p className="text-sm text-gray-600 mb-2 dark:text-white">Add an extra layer of security to your account.</p>
<Button
type= "submit"
variant="secondary"
size="md"
disabled={isLoading}
className="px-4 py-2 border rounded dark:bg-gray-400 dark:text-black dark:hover:bg-gray-600"
>
     {isLoading ? "Enable Two-Factor Authentication..." : "Enable Two-Factor Authentication"}
     </Button>

     {/* delete account */}
     <h3 className="text-lg font-semibold mt-8 mb-4 text-red-600">Danger Zone</h3>
<p className="text-sm text-gray-600 mb-2 dark:text-white">This action is irreversible. Your account and blogs will be deleted permanently.</p>
<Button 
type= "submit"
size="md"
variant= "danger"
disabled={isLoading}
className="px-4 py-2 border bg-red-800 text-white roundedhover:bg-red-100 dark:bg-red-800 dark:hover:bg-red-400">
{isLoading ? "  Delete My Account..." : "  Delete My Account"}
</Button>

    </>
  )
}

export default Security
