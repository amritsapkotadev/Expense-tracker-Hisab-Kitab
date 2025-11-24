import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component
 * 
 * A flexible button component with multiple variants and sizes.
 * Follows the design system guidelines.
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" size="lg" icon={<PlusIcon />}>Add Item</Button>
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  // Base button classes
  const baseClasses = 'btn inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'btn-secondary bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
    outline: 'btn-outline border border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'btn-ghost text-secondary-600 hover:bg-secondary-100',
    success: 'bg-success-600 text-white hover:bg-success-700',
    error: 'bg-error-600 text-white hover:bg-error-700',
    warning: 'bg-warning-600 text-white hover:bg-warning-700',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm h-8 px-3 text-xs',
    md: 'btn-md h-10 px-4 py-2 text-sm',
    lg: 'btn-lg h-12 px-8 text-base',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'success', 'error', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
