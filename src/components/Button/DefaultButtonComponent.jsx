import React from 'react';

/**
 * DefaultButtonComponent
 *
 * @param {Object} props - Component props
 * @param {string} title - The text to be displayed on the button.
 * @param {Function} onClick - The function to be called when the button is clicked.
 * @param {string} className - Additional CSS classes to be applied to the button.
 * @param {boolean} isDisabled - A boolean indicating whether the button should be disabled.
 * @param {React.ReactNode} icon - The icon to be displayed on the button.
 * @param {boolean} iconBefore - A boolean indicating whether the icon should appear before the title.
 * @param {string} color - The color variant of the button (e.g., "btn-primary", "btn-secondary").
 * @returns {React.ReactElement} - A button component with the specified properties.
 */
const DefaultButtonComponent = ({ title, onClick, className, isDisabled, icon, iconBefore, color, }) => {
  return (
    // Button with dynamic classes based on provided props
    <button
      disabled={isDisabled}
      type="button"
      className={` ${color ? "" : "btn btn-primary"}  ${className} rounded-2xl`}
      onClick={onClick}
    >
      {/* Render the icon before or after the title based on iconBefore prop */}
      {iconBefore && icon}
      {title}
      {!iconBefore && icon}
    </button>
  );
};

export default DefaultButtonComponent;
