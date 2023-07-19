import React from 'react';
import LoadingSvg from 'src/assets/svg/LoadingSvg';

/**
 * A reusable component for rendering a labeled input field.
 * @param {string} label - The label text for the input field.
 * @param {string} id - The unique identifier for the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - The callback function triggered on input change.
 * @param {boolean} showPassword - Whether to show the password field.
 * @param {function} onClick - The callback function triggered when the arrow icon is clicked (optional).
 * @param {boolean} loading - Whether to show the loading SVG.
 */
const LoginInput = ({ label, id, placeholder, value, onChange, showPassword, onClick, type, loading, error}) => {
  const hasValue = value !== '';

  return (
    <div className="relative">
      {/* Label for the input field */}
      <label htmlFor={id} className="text-lg">{label}</label>
      {/* Input field */}
      <input
        id={id}
        value={value}
        type={type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'}
        className={`form-input pr-8 text-lg ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {/* Right arrow icon or loading SVG */}
      {!showPassword && (
        <div className={`absolute inset-y-0 right-0 flex items-center pr-3 ${error ? 'pt-4' : 'pt-10' }  ${!hasValue ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {loading ? (
            // Render the loading SVG
            <LoadingSvg />

          ) : (
            // Render the right arrow icon
            <svg
              onClick={() => value && onClick && onClick(value)}
              className={`w-8 h-13 text-gray-600 ${!hasValue ? 'text-gray-400' : 'text-gray-900 hover:text-gray-700'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 0 1 .707.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L11.586 9H3a1 1 0 0 1 0-2h8.586l-1.293-1.293A1 1 0 0 1 10 3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      )}
       {/* Error message */}
       {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default LoginInput;
