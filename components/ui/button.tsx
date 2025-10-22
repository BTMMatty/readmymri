import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit'
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export function Button({ 
  children, 
  onClick, 
  disabled = false, 
  className = "",
  variant = 'primary',
  type = 'button',
  onMouseEnter,
  onMouseLeave,
  size = 'md',
  fullWidth = false
}: ButtonProps) {
  // Base classes with enhanced centering and animations
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold text-center
    rounded-xl
    transition-all duration-300 ease-out
    transform-gpu
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
    whitespace-nowrap
    ${fullWidth ? 'w-full' : ''}
  `
  
  // Size variants for better consistency
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm min-w-[120px]',
    md: 'px-8 py-4 text-base min-w-[160px]',
    lg: 'px-10 py-5 text-lg min-w-[200px]'
  }
  
  // Enhanced variant classes with better hover states
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 
      text-white 
      shadow-lg
      hover:from-blue-700 hover:to-purple-700 
      hover:shadow-xl hover:-translate-y-0.5
      active:translate-y-0
      focus:ring-blue-500 focus:ring-offset-blue-100
      disabled:hover:translate-y-0
    `,
    secondary: `
      bg-white 
      text-gray-700 
      border-2 border-gray-200 
      shadow-md
      hover:bg-gray-50 hover:border-gray-300 
      hover:shadow-lg hover:-translate-y-0.5
      active:bg-gray-100 active:translate-y-0
      focus:ring-gray-400 focus:ring-offset-gray-100
      disabled:hover:translate-y-0
    `,
    outline: `
      bg-transparent hover:bg-gray-50
      text-gray-700 hover:text-gray-900
      border-2 border-gray-300 
      hover:border-gray-400 
      hover:shadow-md hover:-translate-y-0.5
      active:bg-gray-100 active:translate-y-0
      focus:ring-gray-400 focus:ring-offset-white
      disabled:hover:translate-y-0
    `
  }

  // Ripple effect for better interactivity
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      // Create ripple effect
      const button = e.currentTarget
      const ripple = document.createElement('span')
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      ripple.classList.add('ripple')
      
      button.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 600)
      
      onClick()
    }
  }

  return (
    <>
      <style jsx global>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms ease-out;
          background-color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          ${baseClasses} 
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    </>
  )
}