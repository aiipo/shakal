import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

function Button({
  children,
  className,
  onClick = () => {},
  disabled = false,
  ...attrs
}) {
  const handleClick = (event) => disabled ? event.preventDefault() : onClick();

  const Tag = attrs.href ? Link : 'button';

  return (
    <Tag
      className="button"
      onClick={handleClick}
      disabled={disabled}
      to={attrs.href}
      {...attrs}
    >
      {children}
    </Tag>
  );
}

export default Button;
