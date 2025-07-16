import React, { forwardRef } from "react";

const Spinner = forwardRef(({ size = "6", color = "pink-600", className = "", ...props }, ref) => {
  // size: Tailwind spacing scale number (e.g., 4, 6, 8)
  // color: Tailwind color suffix (e.g., pink-600, blue-500)
  // className: extra classes if you want to customize further

  const sizeClass = `w-${size} h-${size}`;
  const colorClass = `text-${color}`;

  return (
    <svg
      ref={ref}
      className={`${sizeClass} ${colorClass} animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
});

export default Spinner;
