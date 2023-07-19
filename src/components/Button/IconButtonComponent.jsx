import React from 'react';

/**
 * IconButton is a reusable button component that combines an icon and a label.
 *
 * @param {React.ReactNode} icon - The icon element to display.
 * @param {string} label - The label or text associated with the button.
 * @param {function} onClick - The click event handler for the button.
 */
const IconButton = ({ icon, label, onClick }) => {
  return (
    <button type="button" className={`btn btn-primary`} onClick={onClick}>
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default IconButton;