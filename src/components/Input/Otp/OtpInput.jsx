import React, { useState } from 'react';

/**
 * OtpComponent is a component for entering One Time Password (OTP).
 */
const OtpComponent = ({ onChange, error, setError }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  /**
   * Handles the change event for an OTP digit input.
   *
   * @param {number} index - The index of the changed digit in the OTP array.
   * @param {string} value - The new value of the changed digit.
   */
  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    onChange(updatedOtp.join(''));

    // Check if any input is empty and set an error if so
    if (updatedOtp.some(digit => !digit)) {
      setError({ otp: "Please enter OTP" });
    } else {
      setError({}); // Clear the error if all inputs have values
    }

    // Move focus to the next input box
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput.focus();
      nextInput.select();
    }
  };

  /**
   * Handles the key press event for an OTP digit input.
   *
   * @param {number} index - The index of the pressed digit in the OTP array.
   * @param {object} event - The key press event object.
   */
  const handleOtpKeyPress = (index, event) => {
    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      !otp[index] &&
      index > 0
    ) {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      onChange(updatedOtp.join(''));

      const previousInput = document.getElementById(`otp-${index - 1}`);
      previousInput.focus();
      previousInput.select();
    } else if (event.target.value.length === 1 && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength={1}
          className={`w-12 h-12 text-3xl text-center border ${error && !digit ? 'border-red-400' : 'border-gray-400'} rounded-md mx-1`}
          value={digit}
          onChange={(event) => handleOtpChange(index, event.target.value)}
          onKeyDown={(event) => handleOtpKeyPress(index, event)}
        />
      ))}
    </div>
  );
};

export default OtpComponent;
