import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070b] disabled:opacity-40 disabled:pointer-events-none cursor-pointer'
  const variantStyles = {
    default: 'bg-[#d4a853]/15 text-[#e8c677] border border-[#d4a853]/20 hover:bg-[#d4a853]/25 hover:border-[#d4a853]/35 hover:shadow-[0_0_20px_rgba(212,168,83,0.1)]',
    outline: 'border border-[rgba(212,168,83,0.12)] text-[#c8c2b4] hover:bg-[rgba(212,168,83,0.06)] hover:text-[#f0ece4] hover:border-[rgba(212,168,83,0.2)]',
    ghost: 'text-[#8a8478] hover:bg-[rgba(212,168,83,0.08)] hover:text-[#c8c2b4]',
  }
  const sizeStyles = {
    default: 'h-10 py-2 px-5',
    sm: 'h-8 px-3 text-xs rounded-lg',
    lg: 'h-12 px-7 rounded-xl text-base',
    icon: 'h-10 w-10',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
