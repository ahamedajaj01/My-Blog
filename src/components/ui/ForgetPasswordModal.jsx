import React, { useEffect, useState } from "react";
import { Input, Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../appFeatures/authSlice";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const { resetPasswordLoading, error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
    }
  }, [isOpen]);

  const handleResetButton = (e) => {
    e.preventDefault()
    if (!email) return;
    dispatch(forgetPassword(email));
    setEmail("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800 dark:text-white">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

       
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`w-full ${error ? "border-red-500" : ""}`}
          />

          <Button
          onClick={handleResetButton}
            type="submit"
            variant="secondary"
            size="md"
            className="w-full mt-4 hover:bg-pink-100"
            disabled={resetPasswordLoading || !email}
          >
            {resetPasswordLoading ? "Sending..." : "Send Reset Link"}
          </Button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {status && status !== "idle" &&(<p className="text-green-500 mt-2 text-center">{status}</p>)}
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
