import React, {forwardRef} from 'react'

// Reusable Button component with variants, sizes, disabled state, and forwarded ref
const Button = ({
   children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}, ref) =>{
      // Base styles applied to every button
    const base = "rounded-md font-medium focus:outline-none transition duration-200"

  // Styles per variant type
 const variantStyles = {
    primary: "bg-pink-600 text-white hover:bg-pink-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-pink-500 text-pink-600 hover:bg-pink-50",
  };

    // Ensure variant and size keys exist, fallback to default
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

      // Compose final class string
const finalClass = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle} ${className}`;
return(
<button
ref={ref}
type={type}
className={finalClass}
disabled={disabled}
{...props}
>
    {children}

</button>
)
}

export default forwardRef(Button)
