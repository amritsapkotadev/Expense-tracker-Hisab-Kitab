import React from 'prop-types';
import PropTypes from 'prop-types';

/**
 * Badge Component
 * 
 * A small label component for categorization and status indication.
 * 
 * @example
 * <Badge variant="default">New</Badge>
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="error">Failed</Badge>
 */

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'badge inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'badge-default border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200',
    secondary: 'badge-secondary border-transparent bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
    success: 'border-transparent bg-success-100 text-success-800 hover:bg-success-200',
    error: 'badge-destructive border-transparent bg-error-100 text-error-800 hover:bg-error-200',
    warning: 'border-transparent bg-warning-100 text-warning-800 hover:bg-warning-200',
    info: 'border-transparent bg-info-100 text-info-800 hover:bg-info-200',
    outline: 'badge-outline border text-secondary-900',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };
  
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'secondary', 'success', 'error', 'warning', 'info', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;
