import React, { useState } from 'react';
import PasswordOffSbg from 'src/assets/svg/PasswordOffSbg';
import PasswordOnSvg from 'src/assets/svg/PasswordOnSvg';

/**
 * PasswordInput is a component for entering passwords with an option to toggle visibility.
 *
 * @param {string} value - The current value of the password input.
 * @param {string} placeholder - The placeholder text for the password input.
 * @param {function} onChange - The event handler for the password input's change event.
 */
const PasswordInput = ({ value, placeholder, onChange,icon }) => {
  const [hidePassword, setHidePassword] = useState(false);

  /**
   * Toggles the visibility of the password.
   */
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className="relative">
     {
        icon && (
            <div
              className={`absolute inset-y-0 left-2 flex items-center pr-3 `}
            >
              {icon}
            </div>
        )
      }
      <input
        value={value}
        type={hidePassword ? 'text' : 'password'}
        className={`form-input pr-8 pl-10 text-lg`}
        placeholder={placeholder}
        onChange={onChange}
      />
       {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <span
        className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {hidePassword ? <PasswordOnSvg /> : <PasswordOffSbg />}
      </span>
    </div>
  );
};

export default PasswordInput;
