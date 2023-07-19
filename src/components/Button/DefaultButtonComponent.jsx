import React from 'react';

/**
 * DefaultButtonComponent is a reusable button component.
 *
 * @param {string} title - The title or label of the button.
 * @param {function} onClick - The click event handler for the button.
 * @param {string} className - Additional CSS classes for styling the button.
 * @param {boolean} isDisabled - Indicates if the button is disabled.
 */
const DefaultButtonComponent = ({ title, onClick, className, isDisabled }) => {
  return (
    <button disabled={isDisabled} type="button" className={`btn btn-primary ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default DefaultButtonComponent;
