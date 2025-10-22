
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  glass?: boolean
  animated?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ 
  children, 
  className = "", 
  onClick,
  hover = true,
  glass = false,
  animated = false,
  padding = 'md'
}: CardProps) {
  // Padding sizes
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  // Base card styles
  const baseClasses = `
    ${glass ? 'glass' : 'bg-white/95 backdrop-blur-sm'}
    rounded-xl 
    shadow-lg 
    border border-gray-200/50
    transition-all duration-300
    relative
    overflow-hidden
    ${hover && !onClick ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg' : ''}
    ${animated ? 'animate-fade-in' : ''}
    ${paddingClasses[padding]}
  `
  
  return (
    <div 
      className={`${baseClasses} ${className}`.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
    >
      {/* Optional gradient overlay for extra visual interest */}
      {glass && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}