import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
          flex 
          w-full
          rounded-md 
          bg-[#1f1f1f]
          border
          border-transparent
          px-3 
          py-3 
          text-sm 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium 
          placeholder:text-neutral-400 
          disabled:cursor-not-allowed 
          disabled:opacity-50
          focus:outline-none
          -mt-5
          hover:bg-[#353433]
        `,
          disabled && "opacity-75",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
