import React from 'react';

/**
 * IconButton is a reusable button component that combines an icon and a label.
 *
 * @param {React.ReactNode} icon - The icon element to display.
 * @param {string} label - The label or text associated with the button.
 * @param {function} onClick - The click event handler for the button.
 */
const IconButton = ({ icon, label, onClick, className }) => {
  return (
    <button type="button" className={`btn  ${className ? className : "bg-primary text-white"} `} onClick={onClick}>
      <span className="text-xl">{icon}</span>
      <span className='ml-2'>{label}</span>
    </button>
  );
};

export default IconButton;
