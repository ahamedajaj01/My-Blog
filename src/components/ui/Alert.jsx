import React from "react";

const alertStyles = {
  success: "bg-green-100 border-green-400 text-green-700",
  error: "bg-red-100 border-red-400 text-red-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
};

export default function Alert({ type = "info", message, onClose }) {
  if (!message) return null; // Don't render if no message

  return (
    <div
      className={`border px-4 py-3 rounded relative mb-4 ${alertStyles[type]}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Close alert"
        >
          <svg
            className="fill-current h-6 w-6 text-current"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238A1 1 0 105.652 5.652L8.586 8.586 5.652 11.52a1 1 0 101.414 1.414L10 9.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z" />
          </svg>
        </button>
      )}
    </div>
  );
}
