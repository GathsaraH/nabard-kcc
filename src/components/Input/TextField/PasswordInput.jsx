import React, { useState } from 'react';
import PasswordOffSbg from 'src/assets/svg/PasswordOffSbg';
import PasswordOnSvg from 'src/assets/svg/PasswordOnSvg';

const PasswordInput = ({ value, placeholder, onChange }) => {
  const [hidePassword, sethidePassword] = useState(false)
  return (
    <div className="relative">
      <input
        value={value}
        type={hidePassword ? 'text' : 'password'}
        className="form-input pr-16 text-lg"
        placeholder={placeholder}
        onChange={onChange}
      />
      <span
        className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 cursor-pointer"
        onClick={() => sethidePassword(!hidePassword)}
      >
        {hidePassword ? <PasswordOnSvg /> : <PasswordOffSbg />}
      </span>
    </div>
  );
};

export default PasswordInput;
