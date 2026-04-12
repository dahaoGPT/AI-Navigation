import React, { useState, useEffect, ReactElement, ReactNode } from 'react'
import './sheet.css';

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  onClick?: () => void
}

interface SheetContentProps {
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  isOpen?: boolean
  onClose?: () => void
}
export const Sheet: React.FC<SheetProps> = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SheetTrigger) {
            return React.cloneElement(child as ReactElement<SheetTriggerProps>, {
              onClick: () => handleOpenChange(true)
            })
          }
          if (child.type === SheetContent) {
            return React.cloneElement(child as ReactElement<SheetContentProps>, {
              isOpen,
              onClose: () => handleOpenChange(false)
            })
          }
        }
        return child
      })}
    </>
  )
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild, onClick }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement, { onClick })
  }
  return (<button onClick={onClick}>{children}</button>);
}

export const SheetContent: React.FC<SheetContentProps> = ({ children, side = 'left', isOpen, onClose }) => {
  const sideStyles = {
    top: 'top-0 left-0 right-0',
    right: 'top-0 right-0 bottom-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 left-0 bottom-0'
  }

  const translateStyles = {
    top: 'translate-y-[-100%]',
    right: 'translate-x-full',
    bottom: 'translate-y-full',
    left: 'translate-x-[-100%]'
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10" onClick={onClose} />
      <div className={`fixed ${sideStyles[side]} w-3/4 sm:max-w-sm bg-dark-950/95 backdrop-blur-xl z-20 shadow-glass transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : translateStyles[side]} ${side === 'left' ? 'border-r border-neon-blue/10' : side === 'right' ? 'border-l border-neon-blue/10' : ''}`}>
        <div className="h-full overflow-y-auto p-6">
          <button
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={onClose}
            aria-label="Close sheet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export const SheetHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>
}

export const SheetTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <h3 className={`text-lg font-semibold text-slate-200 ${className}`}>{children}</h3>;
};

export const SheetDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>
}
