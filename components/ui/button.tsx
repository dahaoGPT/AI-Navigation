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
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:opacity-50 disabled:pointer-events-none'
  const variantStyles = {
    default: 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/30 hover:shadow-neon-blue',
    outline: 'border border-white/10 text-slate-300 hover:bg-white/5 hover:text-slate-100 hover:border-white/20',
    ghost: 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
  }
  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-xs rounded-md',
    lg: 'h-11 px-6 rounded-lg',
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
