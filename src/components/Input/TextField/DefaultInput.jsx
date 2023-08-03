import React from 'react';
import LoadingSvg from 'src/assets/svg/LoadingSvg';

/**
 * A reusable component for rendering an input field.
 * @param {string} label - The label text for the input field.
 * @param {string} id - The unique identifier for the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - The callback function triggered on input change.
 * @param {boolean} showPassword - Whether to show the password field.
 * @param {boolean} icon - Whether to show the icon or not
 * @param {boolean} secondIcon - Whether to show the second icon or not
 * @param {function} onClick - The callback function triggered when the arrow icon is clicked (optional).
 * @param {boolean} loading - Whether to show the loading SVG.
 * @param {string} type - The type of input field (password, email, text).
 * @param {string} error - The error message to display.
 */
const DefaultInput = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  loading = false,
  type = 'text',
  error,
  icon,
  secondIcon,
  onClickSecondIcon
}) => {

  return (
    <div className="relative">
      {/* Label for the input field */}
      {label && <label htmlFor={id} className="text-lg">{label}</label>}
      {/* Input field */}
      {
        icon && (
          !loading && ( // Added condition to check if loading is false
            <div
              className={`absolute inset-y-0 left-2 flex items-center pr-3 ${error ? 'pt-4' : 'pt-10'
                } `}
            >
              {icon}
            </div>
          )
        )
      }
      {
        secondIcon && (
            <div
              className={`absolute inset-y-0 right-2 flex items-center pr-3 ${error ? 'pt-4' : 'pt-10'
                } `}
            >
             <button onClick={() => onClickSecondIcon && onClickSecondIcon()} > {secondIcon}</button>
            </div>
        )
      }
      <input
        id={id}
        value={value}
        type={type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'}
        className={`form-input pr-8 pl-10 text-lg ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {/* Right arrow icon or loading SVG */}
    

      {/* Render the loading SVG if loading is true */}
      {loading && <LoadingSvg />}
      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DefaultInput;
