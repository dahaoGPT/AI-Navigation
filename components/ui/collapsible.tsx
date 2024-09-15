import React, { useState, ReactElement, cloneElement } from 'react'

interface CollapsibleProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CollapsibleContextType {
  isOpen: boolean
  toggle: () => void
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(undefined)

export const Collapsible: React.FC<CollapsibleProps> = ({ children, open, onOpenChange }) => {
  const [stateOpen, setStateOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : stateOpen

  const toggle = () => {
    if (isControlled) {
      onOpenChange?.(!isOpen)
    } else {
      setStateOpen(!isOpen)
    }
  }

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </CollapsibleContext.Provider>
  )
}

interface CollapsibleTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ children, asChild }) => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error('CollapsibleTrigger must be used within a Collapsible')
  }

  const { toggle } = context

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        toggle()
      },
    })
  }

  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  )
}

interface CollapsibleContentProps {
  children: React.ReactNode
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ children }) => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error('CollapsibleContent must be used within a Collapsible')
  }

  const { isOpen } = context

  if (!isOpen) {
    return null
  }

  return <div>{children}</div>
}