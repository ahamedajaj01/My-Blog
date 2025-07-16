    import React,{forwardRef, useState} from "react";

    const Input = ({ label, type = "text", name, value, onChange, placeholder, className, options=[], ...props }, ref) => {
       const [showPassword, setShowPassword] = useState(false);
        // Determine type of input to render
  const isSelect = type === "select";
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    return (
        <div className="mb-4 relative">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        {isSelect ? (
            <select
             ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
          {...props}
          >
           <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
        ):(
          <>
        <input
         ref={ref}
         type={inputType}
         name={name}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
         {...props}
         />
         {/* Password eye toggle */}
          {isPassword && (
            <i
            className={`fa-solid ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } absolute top-9 right-3 text-gray-500 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
            />
             )}
            </>
        )}
        </div>
    );
    };

    // This component is a reusable input field that can be used throughout the blog website.
export default forwardRef(Input);