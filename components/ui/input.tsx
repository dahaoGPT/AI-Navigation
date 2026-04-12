import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-lg border border-white/10 bg-dark-900/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus-visible:outline-none focus-visible:border-neon-blue/40 focus-visible:ring-1 focus-visible:ring-neon-blue/20 focus-visible:shadow-[0_0_20px_rgba(0,212,255,0.08)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
      {...props}
    />
  )
}
