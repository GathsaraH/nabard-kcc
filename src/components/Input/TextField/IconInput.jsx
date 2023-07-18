import React from 'react';

const IconInput = ({ value, type, placeholder, onChange, icon, width }) => {
  return (
    <div className="relative">
      <input
        value={value}
        type={type === 'password' ? 'password' : type === 'email' ? 'email' : 'text'}
        className={`form-input pr-8 text-lg ${width && width}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  );
};

export default IconInput;
