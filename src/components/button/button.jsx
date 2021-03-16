import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

function Button({
  children,
  className = '',
  type = "button",
  onClick = () => {},
  disabled = false,
  ...attrs
}) {
  const handleClick = (event) => disabled ? event.preventDefault() : onClick();

  const Tag = attrs.href ? Link : 'button';

  return (
    <Tag
      className={`button ${className}`}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      to={attrs.href}
      {...attrs}
    >
      {children}
    </Tag>
  );
}

export default Button;
