import React from 'react';

/**
 * DefaultButtonComponent is a reusable button component.
 *
 * @param {string} title - The title or label of the button.
 * @param {function} onClick - The click event handler for the button.
 * @param {string} className - Additional CSS classes for styling the button.
 * @param {boolean} isDisabled - Indicates if the button is disabled.
 * @param {JSX.Element} icon - The JSX element representing the icon.
 * @param {boolean} iconBefore - Set to true if the icon should appear before the title.
 */
const DefaultButtonComponent = ({ title, onClick, className, isDisabled, icon, iconBefore }) => {
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      {iconBefore && icon}
      {title}
      {!iconBefore && icon}
    </button>
  );
};

export default DefaultButtonComponent;
