import React, { useState } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {Button, Input} from "../components/index"
import { resetPassword } from '../appFeatures/authSlice';


function ResetPasswordPage() {
      const [newPassword, setNewPassword] = useState('');
const dispatch = useDispatch()
const navigate = useNavigate()
const {status, error,resetPasswordLoading} = useSelector((state)=>state.auth)
  const [searchParams] = useSearchParams();

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  


const handleSubmit =async (e)=>{
    e.preventDefault();
if(!userId || !secret || !newPassword) return;

await dispatch(resetPassword({userId,secret,newPassword})).unwrap();

 setTimeout(() => {
  navigate("/login");
}, 2000);
}

  return (
<>
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Enter new password"
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        <Button
  type="submit"
  variant="secondary"
  size="md"
  className="w-full"
  disabled={resetPasswordLoading}
>
  {resetPasswordLoading ? "Resetting..." : "Reset Password"}
</Button>
        </form>
        {status && status !== "idle" && ( <p className="text-center text-green-500 mt-4">{status}</p>)}
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      </div>
    </div>

</>
  )
}

export default ResetPasswordPage
