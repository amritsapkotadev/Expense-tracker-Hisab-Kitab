import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 * 
 * A container component for grouping related content.
 * Supports header, content, and footer sections.
 * 
 * @example
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Content here</Card.Content>
 *   <Card.Footer>Footer actions</Card.Footer>
 * </Card>
 */

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'card rounded-lg bg-white shadow-sm transition-shadow';
  
  const variantClasses = {
    default: 'border border-secondary-200',
    elevated: 'shadow-md hover:shadow-lg',
    interactive: 'border border-secondary-200 hover:shadow-lg cursor-pointer',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20',
  };
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Title = ({ children, className = '', as: Component = 'h3', ...props }) => {
  return (
    <Component className={`card-title text-2xl font-semibold leading-none tracking-tight text-secondary-900 ${className}`} {...props}>
      {children}
    </Component>
  );
};

Card.Description = ({ children, className = '', ...props }) => {
  return (
    <p className={`card-description text-sm text-secondary-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

Card.Content = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-content p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'elevated', 'interactive', 'glass']),
};

Card.Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

Card.Description.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
