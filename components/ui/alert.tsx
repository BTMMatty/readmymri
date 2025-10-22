// components/ui/alert.tsx
import React from 'react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

export function Alert({ children, variant = 'default', className = "" }: AlertProps) {
  const variantClasses = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800"
  }

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

interface AlertDescriptionProps {
  children: React.ReactNode
}

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <div className="text-sm">{children}</div>
}