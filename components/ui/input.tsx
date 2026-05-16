import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-xl border border-[rgba(212,168,83,0.12)] bg-[rgba(21,20,28,0.8)] px-4 py-2 text-sm text-[#f0ece4] placeholder:text-[#5a5650] focus-visible:outline-none focus-visible:border-[#d4a853] focus-visible:ring-[3px] focus-visible:ring-[rgba(212,168,83,0.12)] focus-visible:shadow-[0_0_24px_rgba(212,168,83,0.06)] disabled:cursor-not-allowed disabled:opacity-40 transition-all duration-300 backdrop-blur-sm ${className}`}
      {...props}
    />
  )
}
