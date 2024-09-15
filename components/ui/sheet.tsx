import React, { useState } from 'react'

export const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const SheetTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => {
  return <>{children}</>
}

export const SheetContent: React.FC<{ children: React.ReactNode; side?: 'left' | 'right' | 'top' | 'bottom' }> = ({ children }) => {
  return <div className="fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-xs bg-background p-6 shadow-lg">{children}</div>
}

export const SheetHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>
}

export const SheetTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export const SheetDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>
}