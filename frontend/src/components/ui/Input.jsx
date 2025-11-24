import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input Component
 * 
 * A flexible input component with validation states.
 * Supports labels, error messages, and various input types.
 * 
 * @example
 * <Input label="Email" type="email" error="Invalid email" />
 * <Input label="Password" type="password" success="Strong password" />
 */

const Input = React.forwardRef(({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  success,
  helperText,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base input classes
  const baseInputClasses = 'input flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors';
  
  // State-based border classes
  let borderClass = 'border-secondary-300 focus-visible:ring-primary-500';
  if (error) {
    borderClass = 'border-error-500 focus-visible:ring-error-500';
  } else if (success) {
    borderClass = 'border-success-500 focus-visible:ring-success-500';
  }
  
  // Icon padding adjustment
  const iconPaddingClass = icon
    ? iconPosition === 'left'
      ? 'pl-10'
      : 'pr-10'
    : '';
  
  // Combine classes
  const inputClasses = `${baseInputClasses} ${borderClass} ${iconPaddingClass} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label block text-sm font-medium text-secondary-900 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : success ? `${inputId}-success` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="form-error text-error-600 text-sm mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && !error && (
        <p id={`${inputId}-success`} className="form-success text-success-600 text-sm mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
      
      {helperText && !error && !success && (
        <p id={`${inputId}-helper`} className="text-secondary-500 text-sm mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default Input;
