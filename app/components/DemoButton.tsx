// Save as components/DemoButton.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface DemoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  pulse?: boolean;
  children: ReactNode;
}

export default function DemoButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  glow = false,
  pulse = false,
  children,
  className = '',
  ...props
}: DemoButtonProps) {
  const baseClasses = 'relative font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25',
    secondary: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600',
    ghost: 'bg-transparent text-gray-400 border border-gray-800 hover:text-white hover:border-gray-600',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/25',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${glow ? 'shadow-lg shadow-current/50' : ''}
        ${pulse ? 'animate-pulse-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon className={`${iconSizes[size]} ${pulse ? 'animate-pulse' : ''}`} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={`${iconSizes[size]} ${pulse ? 'animate-pulse' : ''}`} />
        )}
      </span>

      {/* Gradient animation for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
}
