import React, { useState } from "react";
import { Input, Button, ForgetPasswordModal } from "../index";

function LoginForm({ onSubmit, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  //  Validate input field
  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Invalid email";
    }
    if (!form.password) {
      errs.password = "Password is required";
    }
    setError(errs);
    return Object.keys(errs).length === 0;
  };
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  p-6 rounded shadow-md dark:bg-gray-800 dark:border"
    >
      <Input
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        className={error.email ? "border-red-500" : ""}
      />
      {error.email && (
        <p className="text-red-500 text-sm mb-2">{error.email}</p>
      )}

      <Input
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
        className={error.password ? "border-red-500" : ""}
      />

      {/* forget password modal */}
      <div
        onClick={() => setShowModal(true)}
        className="container text-sm text-blue-600 hover:underline cursor-pointer dark:text-white"
      >
        Forget Password
      </div>
      <ForgetPasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {error.password && (
        <p className="text-red-500 text-sm mb-2">{error.password}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        size="md"
        className="w-full mt-2"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
