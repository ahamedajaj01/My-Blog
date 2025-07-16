import React, { useState } from "react";
import { Input, Button } from "../index";

export default function SignupForm({ onSubmit, loading }) {
       
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Validate form data
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be 6+ characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-md w-full"
    >
      <Input
        label="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        className={errors.name ? "border-red-500" : ""}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        className={errors.email ? "border-red-500" : ""}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
      )}

      <Input
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
        className={errors.password ? "border-red-500" : ""}
      />
       
      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}
     

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="********"
        className={errors.confirmPassword ? "border-red-500" : ""}
      />
     
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
      )}


      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        size="md"
        className="w-full mt-4"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
