import React from 'react';

/**
 * A default checkbox component with a label, checked state, and onChange event.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} label - The label to be displayed alongside the checkbox.
 * @param {boolean} checked - The current checked state of the checkbox.
 * @param {function} onChange - The event handler function to be called when the checkbox value changes.
 * @returns {JSX.Element} - A JSX element representing the default checkbox.
 */
const DefaultCheckbox = ({ label, checked, onChange , className}) => {
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="form-checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={`${className}`}>{label}</span>
    </label>
  );
};

export default DefaultCheckbox;
